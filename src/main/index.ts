import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import { APP_TITLE, ENV } from "../general/config";
import { Msg, MsgStatus, SIGNAL } from "../general/communications";
import { dbFetchLibBase, LibBaseDoc } from "./db/lib_base";
import { dbFindOneLibOcrByImgID } from "./db/lib_ocr";
import { dbQueryAllLibCore, dbFilterLibCore } from "./db/lib_core";

// 开发模式使用electron热重载，它会自动构建依赖图
// 一定要小心这里要监测的范围，由于我们修改electron主要是一些程序部分，所以千万不要把需要不断覆写的数据文件也加进来，不然会一直重载
// 这里的启示是要把数据文件独立出去，比如放在与`main`同级的`data`文件夹下，然后只监控`main`文件夹
try {
  require("electron-reloader")(__dirname);
} catch {}

// 创建窗口
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: APP_TITLE,
    width: 1400,
    height: 800,

    webPreferences: {
      nodeIntegration: true, // 使用node 1
      contextIsolation: false, // 使用node 2
      webSecurity: false, //加载本地图片
    },
  });

  if (process.env.NODE_ENV === ENV.development) {
    mainWindow.loadURL("http://localhost:8080");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../general/index.html"));
  }
  return mainWindow;
}

// App开始监听系统级别事件
app.on("ready", createMainWindow);

// 注册事件
ipcMain.handle(SIGNAL.INIT_LIB, async (e) => {
  const libCoreDocs = await dbQueryAllLibCore();
  return JSON.stringify(libCoreDocs);
});

ipcMain.handle(
  SIGNAL.FILTER_LIB,
  async (e, filter: string): Promise<Msg> => {
    try {
      const libCoreDocs = await dbFilterLibCore(filter);
      return { status: MsgStatus.success, data: JSON.stringify(libCoreDocs) };
    } catch (e) {
      return { status: MsgStatus.fail, message: e.message };
    }
  }
);

async function initLib1(...args: any) {
  const imgBaseDocs: LibBaseDoc[] = await dbFetchLibBase(
    args[0],
    args[1],
    args[2] || { limit: 20 }
  );
  await Promise.all(
    imgBaseDocs.map(async (imgBaseDoc) => {
      const imgOcrInfo = await dbFindOneLibOcrByImgID(imgBaseDoc.path);
      console.log("former: ", imgBaseDoc);
      Object.assign(imgBaseDoc, imgOcrInfo);
    })
  );
  return JSON.stringify(imgBaseDocs);
}
