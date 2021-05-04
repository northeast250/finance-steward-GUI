import { AnyAction } from "redux";
import { INIT_LIB, LibActionTypes } from "./types";
import { BasicLibDoc } from "../../../db/lib_basic";
import { OcrLibDoc } from "../../../db/lib_ocr";
import { ParsedLibDoc } from "../../../db/lib_parsed";

interface FrontOcr extends OcrLibDoc {
  parses: ParsedLibDoc[];
}

export interface FrontImg extends BasicLibDoc {
  ocrs: FrontOcr[];
}

export interface LibState {
  imgs: FrontImg[];
  visible: FrontImg[];
}

export const initLibState = (): LibState => {
  return { imgs: [], visible: [] };
};
export const libReducer = (
  state = initLibState(),
  action: AnyAction
): LibState => {
  switch (action.type as LibActionTypes) {
    case INIT_LIB:
      const imgs: FrontImg[] = action.payload;
      console.log({ imgs });
      return { ...state, imgs, visible: imgs.slice(0, 20) };
    default:
      return state;
  }
};
