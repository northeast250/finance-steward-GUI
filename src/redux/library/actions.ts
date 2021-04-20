import { Dispatch } from "redux";
import { ipcRenderer } from "electron";
import { FILTER_LIBRARY, SET_LIBRARY, SWITCH_ROOT } from "./types";
import { Img } from "../../renderer/common/interface/img";
import { loadImgsFromResourceRoot } from "../../renderer/common/utils/loadImgs";
import { dumpJsonFile } from "../../renderer/common/utils/io_base";
import { LIBRARY_PATH, MARKS_DICT_PATH } from "../../settings/path";

// export const BRAND_ALL = "BRAND_ALL";
// export type BRAND_ALL = typeof BRAND_ALL;
// export const BRAND_WX = "BRAND_WX";
// export type BRAND_WX = typeof BRAND_WX;
// export const BRAND_ZFB = "BRAND_ZFB";
// export type BRAND_ZFB = typeof BRAND_ZFB;
// export type BrandFilter = BRAND_ALL | BRAND_ZFB | BRAND_WX;
//
// export const CAT_ALL = "CAT_ALL";
// export type CAT_ALL = typeof CAT_ALL;
// export const CAT_LS = "CAT_LS";
// export type CAT_LS = typeof CAT_LS;
// export const CAT_XQ = "CAT_XQ";
// export type CAT_XQ = typeof CAT_XQ;
// export type CatFilter = CAT_ALL | CAT_LS | CAT_XQ;
//
// export const STATUS_ALL = "STATUS_ALL";
// export type STATUS_ALL = typeof STATUS_ALL;
// export const STATUS_SUCCESS = "STATUS_SUCCESS";
// export type STATUS_SUCCESS = typeof STATUS_SUCCESS;
// export const STATUS_FAIL = "STATUS_FAIL";
// export type STATUS_FAIL = typeof STATUS_FAIL;
// export type StatusFilter = STATUS_ALL | STATUS_SUCCESS | STATUS_FAIL;

export enum BrandFilter {
  BRAND_ALL = "BRAND_ADD",
  BRAND_WX = "BRAND_WX",
  BRAND_ZFB = "BRAND_ZFB",
}

export enum CatFilter {
  CAT_ALL = "CAT_ALL",
  CAT_LS = "CAT_LS",
  CAT_XQ = "CAT_XQ",
}

export enum StatusFilter {
  STATUS_ALL = "STATUS_ALL",
  STATUS_SUCCESS = "STATUS_SUCCESS",
  STATUS_FAIL = "STATUS_FAIL",
}

export interface FilterLibrary {
  brand: BrandFilter;
  cat: CatFilter;
  status: StatusFilter;
}

export const setLibrary = (root: string, imgs: Img[]) => ({
  type: SET_LIBRARY,
  payload: { root, imgs },
});

export const switchRoot = () => (dispatch: Dispatch) => {
  ipcRenderer.invoke(SWITCH_ROOT).then((root: string) => {
    if (!root) return;
    const imgs: Img[] = loadImgsFromResourceRoot(root);
    dumpJsonFile(LIBRARY_PATH, { root, imgs });
    dispatch(setLibrary(root, imgs));
  });
};

export const filterLibrary = (filters: FilterLibrary) => ({
  type: FILTER_LIBRARY,
  payload: filters,
});
