/**
 * token即从ocr结果的文本、位置、上下文等基于一定的词法分析以解析出的数据结构
 */

export const NameTokenType = "NameTokenType";
export type NameTokenType = string;

export const AmountTokenType = "AmountTokenType";
export type AmountTokenType = number;

export const TimeTokenType = "TimeTokenType";
export type TimeTokenType = Date;

export const ZFBCategoryTokenType = "ZFBCategoryTokenType";
export type ZFBCategoryTokenType = string;

export const UnknownTokenType = "UnknownTokenType";
export type UnknownTokenType = typeof UnknownTokenType;

export enum SignToken {
  LS = "LS", // 流水，根据前面的"账单"判断
  XQ = "XQ", // 详情，根据前面的"账单详情"判断
  ZFB = "ZFB", // 支付宝，根据支付宝交易状态判断
  WX = "WX", // 微信（暂无较好的判断方法，可以根据关键字）
  Unknown = "Unknown", //分不出来
}

export enum ZFBStatusTokenType {
  ZfbStatusOfWaitingPay = "等待付款",
  ZfbStatusOfWaitingYouPay = "等待对方付款",
  ZfbStatusOfTradeSuccess = "交易成功",
  ZfbStatusOfTradeClose = "交易关闭",
  ZfbStatusOfHandling = "处理中",
  ZfbStatusOfRefund = "退款成功",
  ZfbStatusOfClosed = "已关闭",
}

export type TokenType =
  | SignToken
  | NameTokenType
  | AmountTokenType
  | TimeTokenType
  | ZFBStatusTokenType
  | ZFBCategoryTokenType
  | UnknownTokenType;

export interface Token {
  value: any;
  type: TokenType;
}
