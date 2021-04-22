import { wordIsBillLs, wordIsBillXq } from "./word2token";
import { TokenType } from "../../interface/lib/token";
import { ParsedResult, ParseStatus, Scenario } from "../../interface/lib/parse";
import { OcrItem } from "../../interface/lib/ocr";

export const decideLSOrXQ = (items: OcrItem[]): boolean => {
  for (let item of items) {
    if (wordIsBillLs(item.words)) return true;
    if (wordIsBillXq(item.words)) return false;
  }
  throw new Error("无法识别交易分类");
};

export const initParseResult = (): ParsedResult => ({
  time: new Date(),
  confidence: 0,
  scenario: Scenario.UNKNOWN,
  tokens: [],
  items: [],
  status: ParseStatus.todo,
});

// todo: token type of zfb status token
export const tokenTypeIsZFBStatus = (tokenType: TokenType): boolean => {
  return true;
};
