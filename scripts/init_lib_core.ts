import { dbFindAllLibOcr, LibOcrDoc } from "../src/main/db/lib_ocr";
import { dbAddLibCore } from "../src/main/db/lib_core";

(async () => {
  const docs: LibOcrDoc[] = await dbFindAllLibOcr();
  docs.forEach((doc) => {
    // @ts-ignore
    dbAddLibCore(doc.imgID._id, doc._id);
  });
})();
