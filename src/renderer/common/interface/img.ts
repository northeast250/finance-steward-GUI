import { OcrItems } from "./ocr/ocrItem";
import { SerializeLSResult, SerializeXQResult } from "./serialize/token";
import { Scenario } from "./serialize/scenario";

export interface ImgLocation {
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
  path: ImgLocation;
  size: ImgSize;
  ocrItems: OcrItems;

  isLS: boolean;
  scenario: Scenario;
  tokenLS: SerializeLSResult;
  tokenXQ: SerializeXQResult;
  confidence: number;
  baseConfidence: number;

  markType: MarkType;
}
