import {
  TradeItem,
  TradeAmount,
  TradeDate,
  TradeZfbStatus,
} from "../ocr/trade";
import { Scenario } from "./scenario";

// >>> 单个token的接口
export interface TokenLSBase {
  name: string;
  amount: TradeAmount;
  date: TradeDate;
}

export interface TokenLSWX extends TokenLSBase {}

export interface TokenLSZFB extends TokenLSBase {
  type?: string;
  status?: TradeZfbStatus;
}

export interface TokenLSUnion extends TokenLSWX, TokenLSZFB {}

// <<<

export interface TokenDataBase {
  items: TradeItem[];
  scenario: Scenario;
  confidence: number;
  baseConfidence: number;
}

export interface TokenLS extends TokenDataBase {
  tokens: TokenLSUnion[];
  cntWxTokens: number;
  cntZfbTokens: number;
}

export interface TokenXQ extends TokenDataBase {
  token: TokenLSUnion;
}

export const initTokenLS = (): TokenLS => ({
  items: [],
  tokens: [],
  scenario: Scenario.unknown,
  cntWxTokens: 0,
  cntZfbTokens: 0,
  confidence: 0,
  baseConfidence: 1,
});

export const initTokenXQ = (): TokenXQ => ({
  items: [],
  scenario: Scenario.unknown,
  confidence: 0,
  baseConfidence: 1,
  token: {
    amount: 0,
    date: new Date(),
    name: "",
  },
});
