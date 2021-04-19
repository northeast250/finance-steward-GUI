import { MenuType } from "./reducers";
import { SWITCH_MENU } from "./types";

export const switchMenu = (menuType: MenuType) => ({
  type: SWITCH_MENU,
  payload: menuType,
});
