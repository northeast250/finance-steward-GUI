import { combineReducers } from "redux";
import { tokenReducer } from "./token/reducers";
import { imgsReducers } from "./imgs/reducers";

const rootReducer = combineReducers({
  token: tokenReducer,
  imgs: imgsReducers,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
