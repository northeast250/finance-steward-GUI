import { IOcrItems } from "../../ds/trade/ocr";
import { TradeSign } from "../../ds/trade/item";
import { wordIsBillLs, wordIsBillXq } from "./algoHandleWord";

export const decideLsOrXq = (items: IOcrItems): TradeSign => {
  for (let item of items) {
    if (wordIsBillLs(item.words)) return TradeSign.TradeIsLs;
    if (wordIsBillXq(item.words)) return TradeSign.TradeIsXq;
  }
  return TradeSign.TradeError;
};

export default decideLsOrXq;
