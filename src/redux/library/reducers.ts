import { AnyAction } from "redux";
import { FILTER_LIBRARY, LibraryActionType, SET_LIBRARY } from "./types";
import { BrandFilter, CatFilter, FilterLibrary, StatusFilter } from "./actions";
import { Img } from "../../renderer/common/interface/img";
import { loadJsonFile } from "../../renderer/common/utils/io_base";
import { LIBRARY_PATH } from "../../settings/path";

export interface ImgsState {
  root: string;
  imgs: Img[];
  visibleImgs: Img[];
  filter: FilterLibrary;
}

const initFilter: FilterLibrary = {
  brand: BrandFilter.BRAND_ALL,
  cat: CatFilter.CAT_ALL,
  status: StatusFilter.STATUS_FAIL,
};

const { root, imgs } = loadJsonFile(LIBRARY_PATH, { root: "", imgs: [] });
const visibleImgs = filterImgs(imgs, initFilter);
const initImgsState: ImgsState = {
  imgs,
  root,
  filter: initFilter,
  visibleImgs,
};

console.log({ initImgsState });

export const libraryReducers = (
  state = initImgsState,
  action: AnyAction
): ImgsState => {
  let visibleImgs: Img[];
  let filter: FilterLibrary;
  switch (action.type as LibraryActionType) {
    case SET_LIBRARY:
      filter = state.filter;
      let { imgs, root } = action.payload;
      visibleImgs = filterImgs(imgs, state.filter);
      return { root, imgs, filter, visibleImgs };
    case FILTER_LIBRARY:
      filter = action.payload;
      visibleImgs = filterImgs(state.imgs, filter);
      return { ...state, filter, visibleImgs };
    default:
      return state;
  }
};

function filterImgs(imgs: Img[], filter: FilterLibrary) {
  return imgs.filter((img) => funcFilter(filter, img));
}

function funcFilter(filter: FilterLibrary, img: Img) {
  if (filter.brand === BrandFilter.BRAND_WX) {
    if (img.path.dir.match(/\/支付宝/)) return false;
  }
  if (filter.brand === BrandFilter.BRAND_ZFB) {
    if (img.path.dir.match(/\/微信/)) return false;
  }
  if (filter.cat === CatFilter.CAT_LS) {
    if (img.path.name.match(/^xq/)) return false;
  }
  if (filter.cat === CatFilter.CAT_XQ) {
    if (img.path.name.match(/^ls/)) return false;
  }
  if (filter.status === StatusFilter.STATUS_FAIL) {
    if (img.confidence === 1) return false;
  }
  if (filter.status === StatusFilter.STATUS_SUCCESS) {
    if (img.confidence !== 1) return false;
  }
  return true;
}
