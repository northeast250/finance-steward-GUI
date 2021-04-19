import { combineReducers } from "redux";
import { tokenReducer } from "./token/reducers";
import { libraryReducers } from "./library/reducers";
import { marksReducer } from "./mark/reducers";
import { menusReducer } from "./menus/reducers";

export const rootReducer = combineReducers({
  token: tokenReducer,
  imgs: libraryReducers,
  marks: marksReducer,
  menus: menusReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
