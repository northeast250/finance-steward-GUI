import { TradeItemTypes, TradeZfbStatus } from "../../ds/trade/item";
import {
  ITokenLsWx,
  ITokenLsZfb,
  ITokenDataLs,
  ScenarioTypes,
} from "../../ds/trade/token";
import {
  word2date,
  wordIsAmount,
  wordIsDate,
  wordIsZfbTradeStatus,
} from "./algoHandleWord";

export const handleWordOfLs = (word: string): TradeItemTypes => {
  // 判断是否是时间
  if (wordIsDate(word)) return TradeItemTypes.TradeTime;

  // 判断是否是金额
  if (wordIsAmount(word)) return TradeItemTypes.TradeAmount;

  // 判断是否是支付宝交易状态
  if (wordIsZfbTradeStatus(word)) return TradeItemTypes.TradeZfbStatus;

  return TradeItemTypes.TradeUnknown;
};

export const algoSerializeLs = (words: string[]): ITokenDataLs => {
  let cntLsZfb = 0;
  let cntLsWx = 0;
  let wxTokens: ITokenLsWx[] = [];
  let zfbTokens: ITokenLsZfb[] = [];

  const items = words.map((word) => {
    return {
      value: word,
      type: handleWordOfLs(word),
    };
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
        console.debug("===== 微信 ======");
      }

      // 支付宝流水，时间与金额距离为2
      if (items[id - 2].type === TradeItemTypes.TradeAmount) {
        cntLsZfb++;
        zfbTokens.push({
          name: items[id - 3].value,
          amount: Number.parseFloat(items[id - 2].value),
          type: items[id - 1].value,
          date: word2date(items[id].value),
        });
        console.debug("===== 支付宝 1 ======");
      }

      // 支付宝流水，多了交易状态时流水与金额距离为3
      if (
        items[id - 1].type === TradeItemTypes.TradeZfbStatus &&
        items[id - 3].type === TradeItemTypes.TradeAmount
      ) {
        cntLsZfb++;
        zfbTokens.push({
          name: items[id - 4].value,
          amount: Number.parseFloat(items[id - 3].value),
          type: items[id - 2].value,
          status: items[id - 1].value as TradeZfbStatus,
          date: word2date(items[id].value),
        });
        console.debug("===== 支付宝 2 ======");
      }
      //  todo: 还可以通过交易类型判断
    }
  }

  console.log({ cntLsWx, cntLsZfb });

  const data: ITokenDataLs = {
    cntWxTokens: cntLsWx,
    cntZfbTokens: cntLsZfb,
    items: items,
    tokens: [],
    scenario: ScenarioTypes.Unknown,
    confidence: 0,
  };
  // console.log("tokens", tokens);
  if (cntLsZfb > cntLsWx) {
    console.log("支付宝流水");
    data.tokens = zfbTokens;
    data.scenario = ScenarioTypes.LsZfb;
    data.confidence = cntLsZfb / (cntLsZfb + cntLsWx);
  } else if (cntLsWx > cntLsZfb) {
    console.log("微信流水");
    data.tokens = wxTokens;
    data.scenario = ScenarioTypes.LsWx;
    data.confidence = cntLsWx / (cntLsWx + cntLsZfb);
  }
  console.warn("不确定流水类型");
  return data;
};
