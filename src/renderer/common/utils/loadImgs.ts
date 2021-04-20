import fs from "fs";
import path from "path";
import { Img } from "../interface/img";
import { dumpJsonFile, loadJsonFile } from "./io_base";
import { MARKS_DICT_PATH } from "../../../settings/path";
import {addImg} from "./img_helper";

const loadImgsFromDirectory = (
  dir: string,
  dict: { [key: string]: string }
): Img[] => {
  const ExcludedFiles = [".DS_Store"];

  let data: Img[] = [];
  const res = fs.readdirSync(dir);
  res.forEach((fileName) => {
    if (ExcludedFiles.includes(fileName)) return;

    const filePath = path.join(dir, fileName);
    const isDir = fs.statSync(filePath).isDirectory();
    if (isDir) {
      data = [...data, ...loadImgsFromDirectory(filePath, dict)];
    } else if (fileName.endsWith(".jpg")) {
      const img = addImg(dir, fileName, dict);
      if (img) {
        data.push(img);
      }
    } else return; // do nothing
  });
  // console.log(data);
  return data;
};

export const loadImgsFromResourceRoot = (root: string): Img[] => {
  const marksDict = loadJsonFile(MARKS_DICT_PATH, {});
  const data = loadImgsFromDirectory(root, marksDict);
  dumpJsonFile(MARKS_DICT_PATH, marksDict);
  return data;
};
