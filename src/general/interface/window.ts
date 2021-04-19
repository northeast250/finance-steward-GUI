import { Img, MarkType } from "./img";

export interface EWindow {
  fetchRoot: () => string;
  fetchImgs: () => Img[];
  fetchMarkTypes: () => MarkType[];
}
