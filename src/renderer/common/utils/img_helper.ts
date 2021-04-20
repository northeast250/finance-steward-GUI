import { Img } from "../interface/img";
import { SKIP_IMGS_MARKED } from "../../../settings/controlRenderer";
import imageSize from "image-size";
import assert from "assert";
import { OcrItems, OcrResult } from "../interface/ocr/ocrItem";
import { loadJsonFile } from "./io_base";
import decideLSOrXQ from "../../../algos/decideLSOrXQ";
import { Scenario } from "../interface/serialize/scenario";
import {
  initTokenLS,
  initTokenXQ,
  SerializeLSResult,
  SerializeXQResult,
} from "../interface/serialize/token";
import { serializeLS } from "../../../algos/serializeLS";
import serializeXQ from "../../../algos/serializeXQ";

export const getPath = (img: Img) => [img.path.dir, img.path.name].join("/");
export const getShortPath = (img: Img, length: number = 40) => {
  const path = getPath(img);
  const realLength = path.length;
  if (realLength <= length) return path;
  else return "..." + path.substr(realLength - length + 3, length);
};
export const getUrl = (img: Img) => "file://" + getPath(img);
export const getScale = (img: Img, width: number) => width / img.size.width;
export const addImg = (
  dir: string,
  name: string,
  marksDict: { [key: string]: string }
): Img | null => {
  const path = [dir, name].join("/");
  console.log("adding: ", path);
  const id = path;
  const markType = marksDict[id];

  // 跳过设置了标签的图
  if (SKIP_IMGS_MARKED && markType && markType !== "延后处理") return null;

  const ocrResultPath = path.replace(".jpg", "_ocr_web-image.json");

  const { width, height } = imageSize(path);
  assert(width && height);

  const ocrResult: OcrResult = loadJsonFile(ocrResultPath, {});
  const ocrItems: OcrItems = ocrResult.result.words_block_list;

  let isLS: boolean;
  try {
    isLS = decideLSOrXQ(ocrItems);
  } catch (e) {
    marksDict[id] = "未分类成功（跳过）";
    return null;
  }

  let scenario: Scenario;
  let confidence: number;
  // 默认为1
  let baseConfidence: number;
  let tokenLS: SerializeLSResult = initTokenLS();
  let tokenXQ: SerializeXQResult = initTokenXQ();

  if (isLS) {
    // console.log("handling LS");
    tokenLS = serializeLS(ocrItems, width);
    confidence = tokenLS.confidence;
    baseConfidence = tokenLS.baseConfidence;
    scenario = tokenLS.scenario;
  } else {
    // console.log("handling XQ");
    tokenXQ = serializeXQ(ocrItems);
    confidence = tokenXQ.confidence;
    baseConfidence = tokenXQ.baseConfidence;
    scenario = tokenXQ.scenario;
  }

  return {
    id,
    path: {
      dir,
      name,
    },
    size: {
      width,
      height,
    },
    isLS,
    scenario,
    ocrItems,
    tokenLS,
    tokenXQ,
    confidence,
    baseConfidence,
    markType,
  };
};
