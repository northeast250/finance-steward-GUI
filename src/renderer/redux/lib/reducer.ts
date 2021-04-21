import { AnyAction } from "redux";
import { ImgBase, ImgItem, LibState } from "./interface";
import { INIT_LIB, LibActionTypes } from "./types";

export const initLibState = (): LibState => {
  return { imgs: [], visibleImgs: [] };
};
export const libReducer = (
  state = initLibState(),
  action: AnyAction
): LibState => {
  switch (action.type as LibActionTypes) {
    case INIT_LIB:
      const imgs: ImgItem[] = action.payload;
      return { ...state, imgs, visibleImgs: imgs.slice(0, 20) };
    default:
      return state;
  }
};
