import { OCR_API_TYPE } from "../../../main/db/lib_ocr";

export interface FileItem {
  dir: string;
  name: string;
}

export enum Brand {
  WX = "WX",
  ZFB = "ZFB",
}

export enum Category {
  LS = "LS",
  XQ = "XQ",
}

export type ImgPath = string;

export interface ImgSize {
  width: number;
  height: number;
}

export interface ImgBenchmark {
  brand: Brand;
  category: Category;
}

export interface ImgOcrItem {
  _id?: string;
  location: number[][];
  confidence: number;
  words: string;
}

export interface ImgOcrResult {
  result: {
    words_block_count: number;
    words_block_list: ImgOcrItem[];
  };
}

export interface ImgParseItem {
  name: string;
  amount: number;
  date: Date;
  type?: string;
  status?: string;
  confidence: number;
}

export enum ImgScenario {
  WX_XQ = "WX_XQ",
  WX_LS = "WX_LS",
  ZFB_XQ = "ZFB_XQ",
  ZFB_LS = "ZFB_LS",
  UNKNOWN = "UNKNOWN",
}

export interface ImgBase {
  path: ImgPath;
  size: ImgSize;
  benchmark?: ImgBenchmark;
}

export interface ImgOcr {
  imgID: string;
  api: OCR_API_TYPE;
  items: ImgOcrItem[];
}

export interface ImgOcrItem extends ImgBase, ImgOcr {}

export interface ImgParse {
  imgId: string;
  scenario: ImgScenario;
  confidence: number;
  result: ImgParseItem[];
}

export interface ImgItem {
  base: ImgBase;
  ocr: ImgOcr;
  parse?: ImgParse;
}

export interface LibState {
  imgs: ImgItem[];
  visibleImgs: ImgItem[];
}
