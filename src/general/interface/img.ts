import { OcrItems } from "./ocr/ocrItem";
import { TokenLS, TokenXQ } from "./serialize/token";
import { Scenario } from "./serialize/scenario";

export interface ImgPath {
  dir: string;
  name: string;
}

export interface ImgSize {
  width: number;
  height: number;
}

export type MarkType = string;

export interface Img {
  id: string;
  path: ImgPath;
  size: ImgSize;
  ocrItems: OcrItems;

  isLS: boolean;
  scenario: Scenario;
  tokenLS: TokenLS;
  tokenXQ: TokenXQ;
  confidence: number;
  baseConfidence: number;

  markType: MarkType;
}
