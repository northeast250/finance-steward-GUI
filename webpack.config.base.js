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
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },
};

export default basicConfig;
