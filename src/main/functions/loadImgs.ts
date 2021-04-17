import * as fs from "fs";
import * as path from "path";
import { ImgScenario, ImgState } from "../../redux/interface";

export type Path = string;

export const ExcludedFiles = [".DS_Store"];

export const loadImgsFromDirectory = (dir: Path): ImgState[] => {
  let data: ImgState[] = [];
  const res = fs.readdirSync(dir);
  res.forEach((fileName, index, array) => {
    if (ExcludedFiles.includes(fileName)) return;

    const filePath = path.join(dir, fileName);
    const isDir = fs.statSync(filePath).isDirectory();
    if (isDir) data = [...data, ...loadImgsFromDirectory(filePath)];
    else if (fileName.endsWith(".jpg"))
      data.push({ name: fileName, dir, scenario: ImgScenario.UNKNOWN });
    else return;
  });
  return data;
};

export const loadImgsFromResourceRoot = (root: Path): ImgState[] => {
  return loadImgsFromDirectory(root);
};
