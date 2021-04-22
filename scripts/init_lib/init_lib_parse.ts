import { parseImg } from "../../src/algo/core";
import { dbFetchAllOcrLib, OcrLibDoc } from "../../src/db/lib_ocr";
import { dbAddLibParse } from "../../src/db/lib_parsed";
import { BasicLibDoc, basicLibModel } from "../../src/db/lib_basic";
import { ImgOcrItems } from "../../src/interface/lib/basic";
import assert from "assert";
import { ParsedResult } from "../../src/interface/lib/parse";

const initLibParse = async () => {
  const docs: OcrLibDoc[] = await dbFetchAllOcrLib();
  docs.map(async (ocrDoc) => {
    const ocrItems: ImgOcrItems = ocrDoc.items;
    const baseDoc = await basicLibModel.findById(ocrDoc.baseId);
    assert(baseDoc); // type: LibBaseDoc
    const parsedResult: ParsedResult = parseImg(ocrItems, baseDoc);
    dbAddLibParse(ocrDoc._id, parsedResult);
  });
};

initLibParse();
