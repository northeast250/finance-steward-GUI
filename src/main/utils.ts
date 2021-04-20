import { Env } from "../renderer/common/interface/const";
import path from "path";
import { BrowserWindow } from "electron";

export function handleEnv(mainWindow: BrowserWindow, isDevelopment: boolean) {
  console.log(
    "当前运行环境：",
    isDevelopment ? Env.Development : Env.Production
  );

  if (isDevelopment) {
    // mainWindow.maximize();
    mainWindow.webContents.openDevTools();
  }

  const loadSuccess = (indexPath: string) => {
    console.log("从 " + indexPath + " 加载页面成功");
  };
  const loadFail = (indexPath: string, e: Error) => {
    console.error("从 " + indexPath + " 加载页面失败", e);
  };

  let p: string;
  if (isDevelopment) {
    p = "http://localhost:8080";
    mainWindow
      .loadURL(p)
      .then(() => loadSuccess(p))
      .catch((e) => loadFail(p, e));
  } else {
    p = path.join(__dirname, "../../index.html");
    mainWindow
      .loadFile(p)
      .then(() => loadSuccess(p))
      .catch((e) => loadFail(p, e));
  }
}
