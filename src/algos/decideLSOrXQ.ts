import { OcrItems } from "../renderer/common/interface/ocr/ocrItem";
import { wordIsBillLs, wordIsBillXq } from "./handleWord";

export const decideLSOrXQ = (items: OcrItems): boolean => {
  for (let item of items) {
    if (wordIsBillLs(item.words)) return true;
    if (wordIsBillXq(item.words)) return false;
  }
  throw new Error("无法识别交易分类");
};

export default decideLSOrXQ;
