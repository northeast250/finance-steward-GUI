import {
  word2amount,
  word2time,
  wordIsAmount,
  wordIsBillXq,
  wordIsDate,
} from "./word2token";
import {
  AmountTokenType,
  NameTokenType,
  SignToken,
  TimeTokenType,
  TokenType,
  UnknownTokenType,
} from "../../interface/lib/token";
import { initParseResult, tokenTypeIsZFBStatus } from "./utils";
import { TOKEN_DEFAULT_NAME } from "../config";
import {
  ParsedResult,
  ParseItemBase,
  ParseStatus,
  Scenario,
} from "../../interface/lib/parse";
import { OcrItem } from "../../interface/lib/ocr";
import { Basic } from "../../interface/lib/basic";

export const handleWordOfXq = (word: string): TokenType => {
  // 本程序不考虑账单与详情的分类

  // 详情，是必要的，要和后面的对象、金额配合检查
  if (wordIsBillXq(word)) return SignToken.XQ;

  // 判断金额，保留第一个（之后直接报错）
  if (wordIsAmount(word)) return AmountTokenType;

  // 判断状态，保留第一个（支付宝）// todo: status
  // if (wordIsZfbTradeStatus(word)) return word as ZFBStatusTokenType;

  //  判断时间，保留最后一个（根据支付宝）
  if (wordIsDate(word)) return TimeTokenType;

  return UnknownTokenType;
};

export const parseXQ = (ocrItems: OcrItem[], imgBase: Basic): ParsedResult => {
  // console.log("serializing XQ");

  const result = initParseResult();

  result.tokens = ocrItems.map((item) => ({
    value: item.words,
    type: handleWordOfXq(item.words),
  }));
  const types = result.tokens.map((item) => item.type);
  const word_list = result.tokens.map((item) => item.value);
  const word_str = word_list.join(" ");

  const parsedItem: ParseItemBase = { name: "", time: new Date(), amount: 0 };
  for (let id = 0; id < ocrItems.length; id++) {
    if (types[id] === AmountTokenType) {
      if (types[id - 1] === SignToken.XQ) {
        // 1. 可能是提现类型：微信/零钱/提现/当前状态：到账/xq1-2.jpg
        // 2. 可能是截图不全：支付宝/手机充值/支出/交易名称：手机充值/当前状态：交易成功/xq2a-2.jpg

        // 因为mongoose不允许为空（填了required）
        parsedItem.name = TOKEN_DEFAULT_NAME;
        parsedItem.amount = word2amount(result.tokens[id].value);
        //  确定支付宝或微信
        result.scenario = tokenTypeIsZFBStatus(types[id + 1])
          ? Scenario.ZFB_XQ
          : Scenario.WX_XQ;
        return { ...result, status: ParseStatus.failForParseName };
      } else if (types[id - 2] === SignToken.XQ) {
        // 账单详情与金额之间的剧烈为2
        parsedItem.name = result.tokens[id - 1].value as NameTokenType;
        parsedItem.amount = word2amount(result.tokens[id].value);
        //  确定支付宝或微信
        result.scenario = tokenTypeIsZFBStatus(types[id + 1])
          ? Scenario.ZFB_XQ
          : Scenario.WX_XQ;
      } else if (types[id - 3] === SignToken.XQ) {
        if (
          result.tokens[id - 2].value.length >=
          result.tokens[id - 1].value.length
        ) {
          // 微信/商家活动/收入/当前状态：已存入零钱/xq1.jpg
          parsedItem.name =
            result.tokens[id - 2].value + result.tokens[id - 1].value;
        } else if (result.tokens[id - 2].value.length < 5) {
          // 微信/商户消费/详情页内容齐全/付款码、乘车码、微信小程序、第三方APP、手机充值、公众号打赏/无优惠/退款/当前状态：已退款（¥金额）/xq1.jpg
          parsedItem.name = result.tokens[id - 1].value as NameTokenType;
        } else {
          throw new Error("");
        }

        parsedItem.amount = word2amount(result.tokens[id].value);
        //  确定支付宝或微信
        result.scenario = tokenTypeIsZFBStatus(types[id + 1])
          ? Scenario.ZFB_XQ
          : Scenario.WX_XQ;
        result.confidence = 1;
      } else {
        // todo: new Error("不能识别详情页");
        return { ...result, status: ParseStatus.failForDetail };
      }
    } else if (types[id] === TimeTokenType) {
      // 每次遇到时间都要更新
      parsedItem.time = word2time(result.tokens[id].value);
    }
  }

  result.status = ParseStatus.success;
  result.confidence = 1;
  result.items.push(parsedItem);
  return result;
};

export default parseXQ;
