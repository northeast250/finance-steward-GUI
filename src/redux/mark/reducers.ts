import { AnyAction } from "redux";
import { MarkActionType } from "./types";
import {
  dumpJsonFile,
  loadJsonFile,
} from "../../renderer/common/utils/io_base";
import { MARK_TYPES_PATH, MARKS_DICT_PATH } from "../../settings/path";
import { PRESET_MARK_TYPES } from "../../settings/controlRenderer";

export type MarkType = string;
export type MarksDict = { [key: string]: MarkType } | {};

export interface MarkState {
  types: MarkType[];
  dict: MarksDict; // 用一个字典存储所有的marks信息
}

const markTypes: MarkType[] = loadJsonFile(MARK_TYPES_PATH, PRESET_MARK_TYPES);
const marksDict: MarksDict = loadJsonFile(MARKS_DICT_PATH, {});
const initMarkState: MarkState = { types: markTypes, dict: marksDict };
console.log({ initMarkState });

export const marksReducer = (
  state = initMarkState,
  action: AnyAction
): MarkState => {
  switch (action.type as MarkActionType) {
    // 设置mark和新增mark本质上
    case "SET_MARK": {
      const item = { [action.payload.fileId]: action.payload.markType };
      const dict = { ...state.dict, ...item };
      dumpJsonFile(MARKS_DICT_PATH, dict);
      return { types: state.types, dict };
    }
    case "ADD_MARK": {
      const item = { [action.payload.fileId]: action.payload.markType };
      const types = [...state.types, action.payload.markType];
      const dict = { ...state.dict, ...item };
      const newState: MarkState = { types, dict };
      dumpJsonFile(MARKS_DICT_PATH, dict);
      dumpJsonFile(MARK_TYPES_PATH, types);
      return newState;
    }
    default:
      return state;
  }
};
