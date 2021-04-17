export type ILocation = number[][];

export interface IOcrItem {
  words: string;
  confidence: number;
  location: ILocation;
}

export type IOcrItems = IOcrItem[];

export interface IOcrResult {
  result: {
    words_block_count: number;
    words_block_list: IOcrItems;
  };
  extractedData: object;
}
