import {
  TradeItem,
  TradeItemTypes,
  TradeZfbStatus,
} from "../renderer/common/interface/ocr/trade";
import {
  initTokenLS,
  SerializeLSResult,
  TokenLSWX,
  TokenLSZFB,
} from "../renderer/common/interface/serialize/token";
import {
  word2amount,
  word2date,
  wordIsAmount,
  wordIsDate,
  wordIsZfbTradeStatus,
} from "./handleWord";
import { OcrItems } from "../renderer/common/interface/ocr/ocrItem";
import { LS_LEFT_ICON_THRESHOLD } from "../settings/controlRenderer";
import { Scenario } from "../renderer/common/interface/serialize/scenario";

export const handleWordOfLs = (word: string): TradeItemTypes => {
  // 判断是否是时间
  if (wordIsDate(word)) return TradeItemTypes.TradeTime;

  // 判断是否是金额
  if (wordIsAmount(word)) return TradeItemTypes.TradeAmount;

  // 判断是否是支付宝交易状态
  if (wordIsZfbTradeStatus(word)) return TradeItemTypes.TradeZfbStatus;

  return TradeItemTypes.TradeUnknown;
};

export const serializeLS = (
  ocrItems: OcrItems,
  width: number
): SerializeLSResult => {
  // console.log("serializing LS");

  let cntLsZfb = 0;
  let cntLsWx = 0;
  let wxTokens: TokenLSWX[] = [];
  let zfbTokens: TokenLSZFB[] = [];

  const items: TradeItem[] = [];
  ocrItems.forEach((item) => {
    // 去除最左边的图标
    if (item.location[0][0] / width < LS_LEFT_ICON_THRESHOLD) return;
    // 解决名字过长与金额连在一起的问题：..宝/理财产品/卖出/交易名称：商品说明/当前状态：交易成功/ls2.jpg
    else if (
      (item.location[1][0] - item.location[0][0]) / width > 0.7 &&
      item.words.match(/\.{3}.*\d+\.\d\d$/)
    ) {
      const [name, amount] = item.words.split("...");
      items.push({ value: name, type: TradeItemTypes.TradeName });
      items.push({ value: amount, type: TradeItemTypes.TradeAmount });
    } else {
      items.push({ value: item.words, type: handleWordOfLs(item.words) });
    }
  });

  for (let id = 0; id < items.length; id++) {
    // console.log(tokens[id].value, tokens[id].type);
    if (items[id].type === TradeItemTypes.TradeTime) {
      // 微信流水，时间紧跟在金额之后
      if (items[id - 1].type === TradeItemTypes.TradeAmount) {
        cntLsWx++;
        wxTokens.push({
          name: items[id - 2].value,
          amount: Number.parseFloat(items[id - 1].value),
          date: word2date(items[id].value),
        });
        // console.debug("===== 微信 ======");
      }

      // 支付宝流水，时间与金额距离为2
      if (items[id - 2].type === TradeItemTypes.TradeAmount) {
        cntLsZfb++;
        zfbTokens.push({
          name: items[id - 3].value,
          amount: word2amount(items[id - 2].value),
          type: items[id - 1].value,
          date: word2date(items[id].value),
        });
        // console.debug("===== 支付宝 1 ======");
      }

      // 支付宝流水，多了交易状态时流水与金额距离为3
      if (
        items[id - 1].type === TradeItemTypes.TradeZfbStatus &&
        items[id - 3].type === TradeItemTypes.TradeAmount
      ) {
        cntLsZfb++;
        zfbTokens.push({
          name: items[id - 4].value,
          amount: word2amount(items[id - 3].value),
          type: items[id - 2].value,
          status: items[id - 1].value as TradeZfbStatus,
          date: word2date(items[id].value),
        });
        // console.debug("===== 支付宝 2 ======");
      }
      //  todo: 还可以通过交易类型判断
    }
  }

  // console.log({ cntLsWx, cntLsZfb });

  const data: SerializeLSResult = initTokenLS();
  data.items = items;
  // console.log("tokens", tokens);
  if (cntLsZfb > cntLsWx) {
    // console.log("支付宝流水");
    data.scenario = Scenario.ZFB_LS;
    data.baseConfidence = cntLsZfb / (cntLsZfb + cntLsWx);

    /**
     * 支付宝因为"其他"未匹配出来，而进行修复
     */
    // data.tokens = zfbTokens;
    data.tokens = [...zfbTokens, ...wxTokens];
    data.confidence = 1;
  } else if (cntLsWx > cntLsZfb) {
    if (cntLsZfb > 0) {
      console.log({ zfbTokens, wxTokens });
      throw new Error("支付宝匹配竟然不为0？");
    }
    // console.log("微信流水");
    data.tokens = wxTokens;
    data.scenario = Scenario.WX_LS;
    data.baseConfidence = cntLsWx / (cntLsWx + cntLsZfb);

    // 优化后
    data.confidence = 1;
  }
  // console.warn("不确定流水类型");
  return data;
};
