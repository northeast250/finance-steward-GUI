export enum Brand {
  WX = "WX",
  ZFB = "ZFB",
}

export enum Category {
  LS = "LS",
  XQ = "XQ",
}

export type Path = string;

export interface Size {
  width: number;
  height: number;
}

export interface Benchmark {
  brand: Brand;
  category: Category;
}

export interface Basic {
  time: Date;
  path: Path;
  size: Size;
  benchmark?: Benchmark;
}
