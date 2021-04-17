import axios from "axios";
import * as fs from "fs";
import { API_OCR, HuaweiCloud } from "../../renderer/config";
import {IOcrItem, IOcrItems, IOcrResult} from "../../renderer/ds/trade/ocr";
import {
  OcrApiHwwTestFileSuffix,
  OcrBenchmarkFileSuffix,
} from "../../renderer/settings";
import assert from "assert";
import {getOcrWebImgFilePath} from "../../renderer/functions/path";
import {ImgState} from "../../renderer/ds/img";

export const getOcrPathFromFile = (imgPath: string, api: API_OCR): string => {
  return imgPath.replace(".jpg", api.replace(/\//g, "_") + ".json");
};

export const getImgOcrResultViaAPI = async (
  api: API_OCR,
  token: string,
  imgPath: string,
  imgUrl: string = ""
): Promise<IOcrItem[]> => {
  // 先从本地读取
  const ocrPath = getOcrPathFromFile(imgPath, api);
  if (imgPath && fs.existsSync(ocrPath)) {
    console.debug("[existed] api", api);
    return JSON.parse(fs.readFileSync(ocrPath, { encoding: "utf-8" })).result
      .words_block_list;
  }

  // 再从云端更新
  const data = imgUrl
    ? { url: imgUrl }
    : { image: fs.readFileSync(imgPath, { encoding: "base64" }) };
  console.log("[not existed] api, uploading...");

  const res = await axios.post(HuaweiCloud.getAPI(api), data, {
    headers: { "X-Auth-Token": token },
    params: { project_id: HuaweiCloud.ProjectId },
  });

  // 写回本地
  fs.writeFile(ocrPath, JSON.stringify(res.data), (err) => {
    if (err) {
      console.error("dump error: ", err);
    } else {
      console.log("dump success, path: ", ocrPath);
    }
  });
  // console.log("dump success");
  return res.data.result.words_block_list;
};

const loadOcrResultFromFile = (filePath: string): string[] => {
  const ocrResultText = fs.readFileSync(filePath, { encoding: "utf-8" });
  const ocrResultJson = JSON.parse(ocrResultText);
  return ocrResultJson.word || ocrResultJson.words;
};

export const loadOcrResultFormer = (imgPath: string): string[] => {
  return loadOcrResultFromFile(
    imgPath.replace(".jpg", OcrApiHwwTestFileSuffix)
  );
};

export const loadOcrResultBenchmark = (imgPath: string): string[] => {
  return loadOcrResultFromFile(imgPath.replace(".jpg", OcrBenchmarkFileSuffix));
};



export const readOcrDataFromPath = (path: string): IOcrItems => {
  const content = fs.readFileSync(path, "utf-8");
  assert(content !== undefined, "not existed path: " + path);
  return (JSON.parse(content) as IOcrResult).result.words_block_list;
};

export const fetchOcrDataFromPath = async (
  img: ImgState,
  token: string
): Promise<IOcrItems> => {
  const imgPath = [img.dir, img.name].join("/");
  const res = await axios.post(
    HuaweiCloud.getAPI(API_OCR.API_OCR_WEB_IMAGE),
    { image: fs.readFileSync(imgPath, { encoding: "base64" }) },
    {
      headers: { "X-Auth-Token": token },
      params: { project_id: HuaweiCloud.ProjectId },
    }
  );
  const ocrPath = getOcrWebImgFilePath(img);
  fs.writeFile(ocrPath, JSON.stringify(res.data), (err) => {
    assert(err === null, String(err));
  });
  return (res.data as IOcrResult).result.words_block_list;
};

export const getImgOcrData = async (
  img: ImgState,
  token: string
): Promise<IOcrItems> => {
  const ocrPath = getOcrWebImgFilePath(img);
  if (fs.existsSync(ocrPath)) {
    console.log("load ocr data from local: ", ocrPath);
    return readOcrDataFromPath(ocrPath);
  } else {
    console.log("fetch ocr data from online into path: ", ocrPath);
    return fetchOcrDataFromPath(img, token);
  }
};
