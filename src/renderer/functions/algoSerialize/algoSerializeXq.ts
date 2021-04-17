import { ITokenDataXq, ScenarioTypes } from "../../ds/trade/token";
import { IOcrItems } from "../../ds/trade/ocr";
import { TradeAmount, TradeItemTypes, TradeName } from "../../ds/trade/item";
import {
  word2date,
  wordIsAmount,
  wordIsBillXq,
  wordIsDate,
  wordIsZfbTradeStatus,
} from "./algoHandleWord";

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

export const algoSerializeXq = (items: IOcrItems): ITokenDataXq => {
  const data: ITokenDataXq = {
    items: [],
    token: {
      name: "",
      amount: 0,
      date: new Date(),
    },
    scenario: ScenarioTypes.Unknown,
    confidence: 0,
  };

  data.items = items.map((item) => ({
    value: item.words,
    type: handleWordOfXq(item.words),
  }));
  const types = data.items.map((item) => item.type);

  for (let id = 0; id < items.length; id++) {
    if (types[id] === TradeItemTypes.TradeAmount) {
      // 基于交易金额进行上下文检查
      if (types[id - 2] === TradeItemTypes.TradeSignOfDetail) {
        // 账单详情与金额之间的剧烈为2 //todo: 寻找第一行（交易对象名）很长的样本（可能出现两行，从而破坏这个规则）
        data.token.name = data.items[id - 1].value as TradeName;
        data.token.amount = Number.parseFloat(
          data.items[id].value
        ) as TradeAmount;
        //  确定支付宝或微信
        data.scenario =
          types[id + 1] === TradeItemTypes.TradeZfbStatus
            ? ScenarioTypes.XqZfb
            : ScenarioTypes.XqWx;
        data.confidence = 1;
      } else {
        console.error("不能识别详情页");
        return data;
      }
    } else if (types[id] === TradeItemTypes.TradeTime) {
      // 每次遇到时间都要更新
      data.token.date = word2date(data.items[id].value);
    }
  }

  return data;
};

export default algoSerializeXq;
