export type Location = number[][];

export interface OcrItem {
  words: string;
  confidence: number;
  location: Location;
}

export type OcrItems = OcrItem[];

export interface OcrResult {
  result: {
    words_block_count: number;
    words_block_list: OcrItems;
  };
  extractedData: object;
}
