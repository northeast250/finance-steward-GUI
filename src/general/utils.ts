import fs from "fs";
import { VERSION_PATH } from "./config";

export const readVersion = (): string => {
  return fs.readFileSync(VERSION_PATH, "utf-8").trim();
};
