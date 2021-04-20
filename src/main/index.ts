import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import { applicationLatest } from "../settings/controlMain";
import { handleEnv } from "./utils";
import { handleSwitchRoot } from "./communications";

// 开发模式使用electron热重载，它会自动构建依赖图
// 一定要小心这里要监测的范围，由于我们修改electron主要是一些程序部分，所以千万不要把需要不断覆写的数据文件也加进来，不然会一直重载
// 这里的启示是要把数据文件独立出去，比如放在与`main`同级的`data`文件夹下，然后只监控`main`文件夹
try {
  require("electron-reloader")(__dirname);
} catch {}

// 注册事件
ipcMain.handle("SWITCH_ROOT", handleSwitchRoot);

// 创建窗口
let mainWindow: BrowserWindow = (null as unknown) as BrowserWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: applicationLatest.title,
    width: 1400,
    height: 800,

    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
      // 需要进行预编译
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });
  handleEnv(mainWindow, process.env.NODE_ENV === "development");
  return mainWindow;
}

// App开始监听系统级别事件
app.on("ready", () => {
  mainWindow = createMainWindow();
});
app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});
