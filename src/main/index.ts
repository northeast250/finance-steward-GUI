import path from "path";
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { Application, Communications, ImgRoot } from "./settings";
import { loadImgsFromResourceRoot } from "./functions/loadImgs";

let mainWindow: BrowserWindow | null = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: Application.title,
    width: 800,
    height: 600,

    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
      allowRunningInsecureContent: true,
    },
  });

  const isDevelopment = process.env.NODE_ENV === "development";
  console.log("is development?: ", isDevelopment);

  if (isDevelopment) {
    // mainWindow.maximize();
    mainWindow.webContents.openDevTools();
  }

  if (isDevelopment) mainWindow.loadURL(`http://localhost:8080`);
  else mainWindow.loadFile(path.join(__dirname, "../../index.html"));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // 接受前端发起的文件管理请求
  ipcMain.handle(Communications.UpdateResourceRoot, loadResource);

  return mainWindow;
}

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
});

function loadResource() {
  const res = dialog.showOpenDialogSync({
    title: "UpdateResourceRoot",
    defaultPath: ImgRoot,
    properties: ["openDirectory"],
    buttonLabel: "确认素材库",
  });
  if (!res) return;
  const root = res[0];
  const imgs = loadImgsFromResourceRoot(root);
  console.log({ root, imgs });
  // store.dispatch(initImgsAction(root, imgs));
}
