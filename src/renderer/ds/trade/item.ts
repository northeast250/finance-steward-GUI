export type TradeName = string;
export type TradeAmount = number;
export type TradeDate = Date;

export enum TradeZfbStatus {
  WaitingPay = "等待付款",
  WaitingYouPay = "等待对方付款",
  TradeSuccess = "交易成功",
  TradeClose = "交易关闭",
  Handling = "处理中",
  Receiving = "领取中",
  Refund = "退款成功",
  Closed = "已关闭",
}
export type ZfbTradeCategory = string;

export enum TradeSign {
  TradeIsLs, // 流水，根据前面的"账单"判断
  TradeIsXq, // 详情，根据前面的"账单详情"判断
  TradeIsZfb, // 支付宝，根据支付宝交易状态判断
  TradeIsWx, // 微信（暂无较好的判断方法，可以根据关键字）
  TradeError, //分不出来
}

export type TradeUnknown = TradeName | ZfbTradeCategory;
export type TradeItemType =
  | TradeUnknown
  | TradeDate
  | TradeZfbStatus
  | TradeAmount
  | TradeSign;

export enum TradeItemTypes {
  TradeName = "TradeName",
  TradeAmount = "TradeAmount",
  TradeType = "TradeType",
  TradeTime = "TradeTime",
  TradeUnknown = "TradeUnknown",
  TradeZfbStatus = "TradeZfbStatus",
  TradeSignOfDetail = "TradeSignOfDetail",
  TradeSignOfList = "TradeSIgnOfList",
}

export interface ITradeItem {
  value: string;
  type: TradeItemTypes;
}
