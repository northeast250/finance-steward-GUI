import path from "path";
const distPath = path.resolve("./dist");

export const basicConfig = {
  output: {
    path: distPath,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre", // todo: 我也不知道这个到底有啥用
      },
    ],
  },
};

export default basicConfig;
