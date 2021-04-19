import { AnyAction } from "redux";
import { MenusActionType } from "./types";

export enum MenuType {
  Serialize,
  OCR,
}

export interface MenusState {
  curMenu: MenuType;
}

const initMenusState: MenusState = {
  curMenu: MenuType.Serialize,
};

export const menusReducer = (
  state = initMenusState,
  action: AnyAction
): MenusState => {
  switch (action.type as MenusActionType) {
    case "SWITCH_MENU":
      return { ...state, curMenu: action.payload };
    default:
      return state;
  }
};
