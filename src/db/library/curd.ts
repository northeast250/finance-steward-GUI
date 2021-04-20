import LibraryModel, { OcrImg } from "./model";
import imageSize from "image-size";
import assert from "assert";
import {
  OcrItems,
  OcrResult,
} from "../../renderer/common/interface/ocr/ocrItem";
import { loadJsonFile } from "../../renderer/common/utils/io_base";
import {
  Brand,
  Category,
} from "../../renderer/common/interface/serialize/scenario";

const createOcrImg = (dir: string, name: string): OcrImg => {
  const path = [dir, name].join("/");
  console.log("adding: ", path);

  const ocrResultPath = path.replace(".jpg", "_ocr_web-image.json");
  const { width, height } = imageSize(path);
  assert(width && height);
  const ocrResult: OcrResult = loadJsonFile(ocrResultPath, {});
  const ocrItems: OcrItems = ocrResult.result.words_block_list;

  const category = (name.match(/xq/) ? Category.XQ : Category.LS) as Category;
  const brand = (dir.match(/支付宝/) ? Brand.ZFB : Brand.WX) as Brand;

  return {
    location: { dir, name },
    size: { width, height },
    benchmark: { brand, category },
    ocrItems,
  };
};

export const addOneOcrImg = async (dir: string, name: string) => {
  const ocrItem: OcrImg = createOcrImg(dir, name);
  const item = await LibraryModel.create(ocrItem);
  console.debug("added img: " + item.path);
};

export const findOcrImgs = async (...args: any) => {
  return LibraryModel.find(args);
};

export default {
  addOne: addOneOcrImg,
  find: findOcrImgs,
};
