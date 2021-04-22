import { INIT_LIB } from "./types";
import { FrontImg } from "./reducer";

export const setLibrary = (imgs: FrontImg[]) => ({
  type: INIT_LIB,
  payload: imgs,
});
