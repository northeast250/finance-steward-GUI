import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import { libReducer } from "./lib/reducer";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { isDev } from "../../general/dev";

const rootReducer = combineReducers({
  lib: libReducer,
});

const enhancer = isDev()
  ? applyMiddleware(thunkMiddleware, loggerMiddleware)
  : applyMiddleware(thunkMiddleware);

const store = createStore(rootReducer, enhancer);

export default store;

export type AppState = ReturnType<typeof rootReducer>;
