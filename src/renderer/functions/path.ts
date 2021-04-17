import { OcrApiHwwWebImgSuffix } from "../settings";
import {ImgState} from "../ds/img";

const getOcrWebImgFileName = (fileName: string) => {
  return fileName.replace(".jpg", OcrApiHwwWebImgSuffix);
};

const getFileUri = (dir: string, name: string) => {
  return [dir, name].join("/");
};

const getFilePath = (dir: string, name: string) => {
  return [dir, name].join("/");
};

export const getOcrImgUri = (img: ImgState) => {
  return [img.dir, img.name].join("/");
};

export const getOcrImgPath = (img: ImgState) => {
  return [img.dir, img.name].join("/");
};

export const getOcrWebImgFileUri = (img: ImgState) => {
  return getFileUri(img.dir, getOcrWebImgFileName(img.name));
};

export const getOcrWebImgFilePath = (img: ImgState) => {
  return getFilePath(img.dir, getOcrWebImgFileName(img.name));
};
