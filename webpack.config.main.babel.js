import { merge } from "webpack-merge";
import basicConfig from "./webpack.config.base.js";

export const mainConfig = merge(basicConfig, {
  target: "node",
  entry: "./src/main/index.ts",
  output: {
    filename: "main.js",
  },
});

export default mainConfig;
