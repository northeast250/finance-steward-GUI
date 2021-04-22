import { word2amount, word2time, wordIsAmount, wordIsDate } from "./word2token";
import { LS_LEFT_ICON_THRESHOLD, TOO_LONG_NAME_THRESHOLD } from "../config";
import {
  AmountTokenType,
  NameTokenType,
  TimeTokenType,
  Token,
  TokenType,
  UnknownTokenType,
  ZFBStatusTokenType,
} from "../../interface/lib/token";
import { initParseResult } from "./utils";
import {
  ParsedResult,
  ParseItemBase,
  ParseItemOfZfb,
  ParseStatus,
  Scenario,
} from "../../interface/lib/parse";
import { OcrItems } from "../../interface/lib/ocr";
import { Basic } from "../../interface/lib/basic";

export const handleWordOfLs = (word: string): TokenType => {
  // 判断是否是时间
  if (wordIsDate(word)) return TimeTokenType;

  // 判断是否是金额
  if (wordIsAmount(word)) return AmountTokenType;

  return UnknownTokenType;
};

export const parseLS = (ocrItems: OcrItems, basic: Basic): ParsedResult => {
  // console.log("serializing LS");

  let cntLsZfb = 0;
  let cntLsWx = 0;
  let itemsWX: ParseItemBase[] = [];
  let itemsZFB: ParseItemOfZfb[] = [];

  const tokens: Token[] = [];
  ocrItems.forEach((item) => {
    // 去除最左边的图标
    if (item.location[0][0] / basic.size.width < LS_LEFT_ICON_THRESHOLD) return;
    // 解决名字过长与金额连在一起的问题：..宝/理财产品/卖出/交易名称：商品说明/当前状态：交易成功/ls2.jpg
    else if (
      (item.location[1][0] - item.location[0][0]) / basic.size.width >
        TOO_LONG_NAME_THRESHOLD &&
      item.words.match(/\.{3}.*\d+\.\d\d$/)
    ) {
      const [name, amount] = item.words.split("...");
      tokens.push({ value: name, type: NameTokenType });
      tokens.push({ value: amount, type: AmountTokenType });
    } else {
      tokens.push({ value: item.words, type: handleWordOfLs(item.words) });
    }
  });

  for (let id = 0; id < tokens.length; id++) {
    // console.log(tokens[id].value, tokens[id].type);
    if (tokens[id].type === TimeTokenType) {
      // 微信流水，时间紧跟在金额之后
      if (tokens[id - 1].type === AmountTokenType) {
        cntLsWx++;
        itemsWX.push({
          name: tokens[id - 2].value,
          amount: Number.parseFloat(tokens[id - 1].value),
          time: word2time(tokens[id].value),
        });
        // console.debug("===== 微信 ======");
      }

      // 支付宝流水，时间与金额距离为2
      if (tokens[id - 2].type === AmountTokenType) {
        cntLsZfb++;
        itemsZFB.push({
          name: tokens[id - 3].value,
          amount: word2amount(tokens[id - 2].value),
          category: tokens[id - 1].value,
          time: word2time(tokens[id].value),
          status: ZFBStatusTokenType.ZfbStatusOfTradeSuccess,
        });
        // console.debug("===== 支付宝 1 ======");
      }

      // 支付宝流水，多了交易状态时流水与金额距离为3
      if (
        // items[id = 2].type ===       // todo: 加入支付宝交易状态
        tokens[id - 3].type === AmountTokenType
      ) {
        cntLsZfb++;
        itemsZFB.push({
          name: tokens[id - 4].value,
          amount: word2amount(tokens[id - 3].value),
          category: tokens[id - 2].value,
          status: tokens[id - 1].value as ZFBStatusTokenType,
          time: word2time(tokens[id].value),
        });
        // console.debug("===== 支付宝 2 ======");
      }
      //  todo: 还可以通过交易类型判断
    }
  }
  // console.log({ cntLsWx, cntLsZfb });

  const result = initParseResult();
  result.tokens = tokens;
  if (cntLsZfb > cntLsWx) {
    // 支付宝因为"其他"未匹配出来，而进行修复
    result.items = [...itemsZFB, ...itemsWX];
    result.scenario = Scenario.ZFB_LS;
  } else if (cntLsWx > cntLsZfb) {
    if (cntLsZfb > 0) {
      // console.log({ itemsZFB: itemsZFB, itemsWX: itemsWX });
      // todo:  支付宝匹配竟然不为0？
      return { ...result, status: ParseStatus.failForZFBLess };
    }
    // console.log("微信流水");
    result.items = itemsWX;
    result.scenario = Scenario.WX_LS;
  }

  result.confidence = 1;
  result.status = ParseStatus.success;
  return result;
};
