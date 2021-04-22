import path from "path";
import { readVersion } from "./utils";

export const RESOURCE_PATH = "/Users/mark/projects/finance-steward/resource";

export const PROJECT_PATH =
  "/Users/mark/projects/finance-steward/finance-steward-GUI-V2";
export const VERSION_PATH = path.join(PROJECT_PATH, "VERSION.txt");

export const APP_TITLE = `智能财务系统 V${readVersion()}, Powered By Electron, React, Redux, Webpack & Typescript`;

export enum ENV {
  development = "development",
  production = "production",
}
