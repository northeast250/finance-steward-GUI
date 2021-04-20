import { addImg } from "./library/funcs";
import LibraryModel from "./library/model";
import SerializeModel from "./serialize/model";
import { createSerialize } from "./serialize/curd";

const dir =
  "/Users/mark/projects/finance-steward/resource-demo/微信/红包/收入/当前状态：已存入零钱";
const name = "ls1.jpg";

(async () => {
  const imgItem = addImg(dir, name);
  const imgDoc = await LibraryModel.create(imgItem);

  const serializeItem = createSerialize(imgItem.ocrItems, imgDoc._id, imgItem);
  const serializeDoc = await SerializeModel.create(serializeItem);
  console.log({ imgDoc, serializeDoc, path: imgDoc.path });
})();
