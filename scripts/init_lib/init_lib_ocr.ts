import { OcrApiType, OcrResponse } from "../../src/interface/lib/ocr";

console.log("cnm");

import fs from "fs";
import { dbAddOcrLib } from "../../src/db/lib_ocr";
import { dbFetchBasicLib } from "../../src/db/lib_basic";

console.log("cnm2");
/**
 * load from database - lib_base
 */

const initOcrFromLibBase = async () => {
  console.log("start init lib_ocr");
  const docs = await dbFetchBasicLib();
  docs.forEach((doc) => {
    const path = doc.path;
    const imgOcrPath = path.replace(".jpg", "_ocr_web-image.json");
    fs.readFile(imgOcrPath, "utf-8", (err, content) => {
      if (err) throw err;
      const ocrResult = JSON.parse(content) as OcrResponse;
      const ocrItems = ocrResult.result.words_block_list;
      dbAddOcrLib(doc._id, ocrItems, OcrApiType.HUAWEI_WEB_IMAGE);
    });
  });
};

/**
 * load from local
 */
// (async () => {
//   const paths = await fsWalk(RESOURCE_ABS_PATH);
//   paths.forEach((path) => {
//     if (!path.endsWith(".jpg")) return;
//     const imgOcrPath = path.replace(".jpg", "_ocr_web-image.json");
//     fs.readFile(imgOcrPath, "utf-8", (err, content) => {
//       if (err) throw err;
//       const ocrResult = JSON.parse(content) as ImgOcrResult;
//       const ocrItems = ocrResult.result.words_block_list;
//       dbAddLibOcr(path, ocrItems, OCR_API_TYPE.HUAWEI_WEB_IMAGE);
//     });
//   });
// })();

initOcrFromLibBase();
