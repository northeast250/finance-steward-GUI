import fs from "fs";
import path from "path";
import { Img } from "../interface/img";
import imageSize from "image-size";
import decideLSOrXQ from "../algos/decideLSOrXQ";
import { dumpJsonFile, loadJsonFile } from "./io_base";
import {
  initTokenLS,
  initTokenXQ,
  TokenLS,
  TokenXQ,
} from "../interface/serialize/token";
import { Scenario } from "../interface/serialize/scenario";
import assert from "assert";
import { OcrItems, OcrResult } from "../interface/ocr/ocrItem";
import { serializeLS } from "../algos/serializeLS";
import serializeXQ from "../algos/serializeXQ";
import { MARKS_DICT_PATH } from "../config/path";
import { SKIP_IMGS_MARKED } from "../../renderer/settings/control";

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
  let tokenLS: TokenLS = initTokenLS();
  let tokenXQ: TokenXQ = initTokenXQ();

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

const loadImgsFromDirectory = (
  dir: string,
  dict: { [key: string]: string }
): Img[] => {
  const ExcludedFiles = [".DS_Store"];

  let data: Img[] = [];
  const res = fs.readdirSync(dir);
  res.forEach((fileName) => {
    if (ExcludedFiles.includes(fileName)) return;

    const filePath = path.join(dir, fileName);
    const isDir = fs.statSync(filePath).isDirectory();
    if (isDir) {
      data = [...data, ...loadImgsFromDirectory(filePath, dict)];
    } else if (fileName.endsWith(".jpg")) {
      const img = addImg(dir, fileName, dict);
      if (img) {
        data.push(img);
      }
    } else return; // do nothing
  });
  // console.log(data);
  return data;
};

export const loadImgsFromResourceRoot = (root: string): Img[] => {
  const marksDict = loadJsonFile(MARKS_DICT_PATH, {});
  const data = loadImgsFromDirectory(root, marksDict);
  dumpJsonFile(MARKS_DICT_PATH, marksDict);
  return data;
};
