import fs from "fs";
import { dbAddLibOcr, OCR_API_TYPE } from "../src/main/db/lib_ocr";
import { ImgOcrResult } from "../src/renderer/redux/lib/interface";
import { dbFetchLibBase } from "../src/main/db/lib_base";

/**
 * load from database - lib_base
 */
(async () => {
  const docs = await dbFetchLibBase();
  docs.forEach((doc) => {
    const path = doc.path;
    const imgOcrPath = path.replace(".jpg", "_ocr_web-image.json");
    fs.readFile(imgOcrPath, "utf-8", (err, content) => {
      if (err) throw err;
      const ocrResult = JSON.parse(content) as ImgOcrResult;
      const ocrItems = ocrResult.result.words_block_list;
      dbAddLibOcr(doc._id, ocrItems, OCR_API_TYPE.HUAWEI_WEB_IMAGE);
    });
  });
})();

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
