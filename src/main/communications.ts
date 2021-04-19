import { dialog } from "electron";
import path from "path";

export function handleSwitchRoot() {
  console.log("ipcMain receive: ", "SWITCH_ROOT");

  const res = dialog.showOpenDialogSync({
    defaultPath: path.resolve(__dirname, "../../.."),
    buttonLabel: "确认选择",
    title: "选定资源根目录",
    properties: ["openDirectory"],
  });
  return res ? res[0] : "";
}
