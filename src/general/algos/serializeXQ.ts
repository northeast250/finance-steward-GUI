import { initTokenXQ, TokenXQ } from "../interface/serialize/token";
import { OcrItems } from "../interface/ocr/ocrItem";
import { TradeAmount, TradeItemTypes, TradeName } from "../interface/ocr/trade";
import {
  word2amount,
  word2date,
  wordIsAmount,
  wordIsBillXq,
  wordIsDate,
  wordIsZfbTradeStatus,
} from "./handleWord";
import { Scenario } from "../interface/serialize/scenario";

// 本程序不考虑账单与详情的分类
export const handleWordOfXq = (word: string): TradeItemTypes => {
  // 详情，是必要的，要和后面的对象、金额配合检查
  if (wordIsBillXq(word)) return TradeItemTypes.TradeSignOfDetail;

  // 判断金额，保留第一个（之后直接报错）
  if (wordIsAmount(word)) return TradeItemTypes.TradeAmount;

  //  判断状态，保留第一个（支付宝）
  if (wordIsZfbTradeStatus(word)) return TradeItemTypes.TradeZfbStatus;

  //  判断时间，保留最后一个（根据支付宝）
  if (wordIsDate(word)) return TradeItemTypes.TradeTime;

  return TradeItemTypes.TradeUnknown;
};

export const serializeXQ = (ocrItems: OcrItems): TokenXQ => {
  // console.log("serializing XQ");

  const data = initTokenXQ();

  data.items = ocrItems.map((item) => ({
    value: item.words,
    type: handleWordOfXq(item.words),
  }));
  const types = data.items.map((item) => item.type);
  const word_list = data.items.map((item) => item.value);
  const word_str = word_list.join(" ");

  for (let id = 0; id < ocrItems.length; id++) {
    if (types[id] === TradeItemTypes.TradeAmount) {
      if (types[id - 1] === TradeItemTypes.TradeSignOfDetail) {
        // 1. 可能是提现类型：微信/零钱/提现/当前状态：到账/xq1-2.jpg
        // 2. 可能是截图不全：支付宝/手机充值/支出/交易名称：手机充值/当前状态：交易成功/xq2a-2.jpg

        data.token.name = "";
        data.token.amount = word2amount(data.items[id].value) as TradeAmount;
        //  确定支付宝或微信
        data.scenario =
          types[id + 1] === TradeItemTypes.TradeZfbStatus
            ? Scenario.ZFB_XQ
            : Scenario.WX_XQ;
        data.confidence = 1;
      } else if (types[id - 2] === TradeItemTypes.TradeSignOfDetail) {
        // 账单详情与金额之间的剧烈为2
        data.token.name = data.items[id - 1].value as TradeName;
        data.token.amount = word2amount(data.items[id].value) as TradeAmount;
        //  确定支付宝或微信
        data.scenario =
          types[id + 1] === TradeItemTypes.TradeZfbStatus
            ? Scenario.ZFB_XQ
            : Scenario.WX_XQ;
        data.confidence = 1;
      } else if (types[id - 3] === TradeItemTypes.TradeSignOfDetail) {
        if (
          data.items[id - 2].value.length >= data.items[id - 1].value.length
        ) {
          // 微信/商家活动/收入/当前状态：已存入零钱/xq1.jpg
          data.token.name = (data.items[id - 2].value +
            data.items[id - 1].value) as TradeName;
        } else if (data.items[id - 2].value.length < 5) {
          // 微信/商户消费/详情页内容齐全/付款码、乘车码、微信小程序、第三方APP、手机充值、公众号打赏/无优惠/退款/当前状态：已退款（¥金额）/xq1.jpg
          data.token.name = data.items[id - 1].value as TradeName;
        } else {
          throw new Error("");
        }

        data.token.amount = word2amount(data.items[id].value) as TradeAmount;
        //  确定支付宝或微信
        data.scenario =
          types[id + 1] === TradeItemTypes.TradeZfbStatus
            ? Scenario.ZFB_XQ
            : Scenario.WX_XQ;
        data.confidence = 1;
      } else {
        console.log("不能识别详情页");
        return data;
      }
    } else if (types[id] === TradeItemTypes.TradeTime) {
      // 每次遇到时间都要更新
      data.token.date = word2date(data.items[id].value);
    }
  }

  return data;
};

export default serializeXQ;
