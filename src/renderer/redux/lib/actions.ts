import { ImgBase, ImgItem } from "./interface";
import { Dispatch } from "redux";
import { INIT_LIB } from "./types";
import { ipcRenderer } from "electron";
import { SIGNAL } from "../../../general/communications";
import { LibCoreDoc } from "../../../main/db/lib_core";

export const setLibrary = (imgs: ImgItem[]) => ({
  type: INIT_LIB,
  payload: imgs,
});

export const initLibrary = (...args: any) => async (
  dispatch: Dispatch
): Promise<void> => {
  console.log("init library...");
  const libString: string = await ipcRenderer.invoke(SIGNAL.INIT_LIB, ...args);
  const lib = JSON.parse(libString) as ImgItem[];
  console.log("inited ");
  dispatch({ type: INIT_LIB, payload: lib });
};

export const filterLibrary = (s: string) => (dispatch: Dispatch) => {
  ipcRenderer.invoke(SIGNAL.FILTER_LIB, s).then((e) => {
    const lib = JSON.parse(e) as ImgItem[];
    dispatch({ type: INIT_LIB, payload: lib });
  });
};
