import { ITradeItem, TradeAmount, TradeZfbStatus, TradeDate } from "./item";

// >>> 单个token的接口
export interface ITokenLsBase {
  name: string;
  amount: TradeAmount;
  date: TradeDate;
}

export interface ITokenLsWx extends ITokenLsBase {}

export interface ITokenLsZfb extends ITokenLsBase {
  type?: string;
  status?: TradeZfbStatus;
}

export interface ITokenLsUnion extends ITokenLsWx, ITokenLsZfb {}

// <<<

// >>> 一张图里一个（详情）或多个（流水）token的接口
export enum ScenarioTypes {
  LsWx = "微信流水",
  LsZfb = "支付宝流水",
  XqWx = "微信详情",
  XqZfb = "支付宝详情",
  Unknown = "不确定",
}

export interface ITokenDataBase {
  items: ITradeItem[];
  scenario: ScenarioTypes;
  confidence: number;
}

export interface ITokenDataLs extends ITokenDataBase {
  tokens: ITokenLsUnion[];
  cntWxTokens: number;
  cntZfbTokens: number;
}

export interface ITokenDataXq extends ITokenDataBase {
  token: ITokenLsUnion;
}

export type ITokenDataUnion = ITokenDataBase | ITokenDataLs | ITokenDataXq;

// <<<
