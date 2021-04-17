import { applyMiddleware, createStore, StoreEnhancer } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

let enhancer: StoreEnhancer;
// 如果运行在浏览器端（react），就用window.origin匹配是否是开发环境（localhost）
// 如果运行在服务端（electron），就用process.env判断是否是开发环境
if (window && window.origin.match(/localhost/) || process && !process.env.production) {
  const logger = require("redux-logger").default;
  enhancer = applyMiddleware(thunk, logger);
} else {
  enhancer = applyMiddleware(thunk);
}

const store = createStore(rootReducer, enhancer);
export default store;
