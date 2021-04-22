import { decideLSOrXQ, initParseResult } from "./parse/utils";
import { parseLS } from "./parse/parseLS";
import parseXQ from "./parse/parseXQ";
import { BasicLibDoc } from "../db/lib_basic";
import { ParsedResult, ParseStatus } from "../interface/lib/parse";
import { OcrItems } from "../interface/lib/ocr";

export const parseImg = (
  ocrItems: OcrItems,
  imgBase: BasicLibDoc
): ParsedResult => {
  // 预解析
  let isLS: boolean;
  try {
    isLS = decideLSOrXQ(ocrItems);
  } catch (e) {
    // console.error("error: ", e.message);
    return {
      ...initParseResult(),
      status: ParseStatus.failForPreParse,
    };
  }

  // 解析
  if (isLS) {
    return parseLS(ocrItems, imgBase);
  } else {
    return parseXQ(ocrItems, imgBase);
  }
};
