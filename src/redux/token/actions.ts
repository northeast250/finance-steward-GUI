import { AnyAction } from "redux";
import { TokenState } from "./reducers";

export const FETCH_TOKEN = "FETCH_TOKEN";
export type FETCH_TOKEN = typeof FETCH_TOKEN;

export const DUMP_TOKEN = "DUMP_TOKEN";
export type DUMP_TOKEN = typeof DUMP_TOKEN;

export type TokenActionType = FETCH_TOKEN | DUMP_TOKEN;

export interface TokenAction extends AnyAction {
  type: TokenActionType;
  payload?: object;
}

export function fetchToken() {
  return {
    type: FETCH_TOKEN,
  };
}

export function dumpToken(token: TokenState) {
  return {
    type: DUMP_TOKEN,
    payload: token,
  };
}
