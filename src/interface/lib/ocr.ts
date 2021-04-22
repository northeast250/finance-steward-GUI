export enum OcrApiType {
  HUAWEI_WEB_IMAGE = "HUAWEI_WEB_IMAGE",
}

export interface OcrItem {
  location: number[][];
  confidence: number;
  words: string;
}

export type OcrItems = OcrItem[];

export interface OcrResponse {
  result: {
    words_block_count: number;
    words_block_list: OcrItems;
  };
}

export interface OcrResult {
  api: OcrApiType;
  time: Date;
  items: OcrItems;
}
