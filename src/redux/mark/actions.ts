import { ADD_MARK, SET_MARK } from "./types";

export const addMark = (fileId: string, markType: string) => ({
  type: ADD_MARK,
  payload: { fileId, markType },
});

export const setMark = (fileId: string, markType: string) => ({
  type: SET_MARK,
  payload: { fileId, markType },
});
