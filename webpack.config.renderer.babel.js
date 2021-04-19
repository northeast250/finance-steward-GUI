import { merge } from "webpack-merge";
import basicConfig from "./webpack.config.base.js";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { spawn } from "child_process";

export const rendererConfig = merge(basicConfig, {
  target: "electron-renderer",
  entry: "./src/renderer/index.tsx",
  output: {
    filename: "renderer.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/renderer/index.html",
      title: "已启用HMR热更新",
    }),
  ],
  devServer: {
    // 加上这条后，就可以在electron的network栏里点击相应文件并且不会有访问提示了，很有意思
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // devServer内部的所有中间件执行之前的自定义执行函数，这里用于启动electron
    before: (app, server, compiler) => {
      console.log("=== 正在启动Electron主进程 ===");
      spawn("npm", ["run", "start:main"], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("error", (spawnError) => console.error(spawnError))
        .on("close", (code) => process.exit(code)); // 当配置了electron热重载时这个选项需要关掉
    },
  },
});

export default rendererConfig;
