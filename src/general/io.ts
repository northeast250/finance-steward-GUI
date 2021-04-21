import * as fs from "fs";
import { promisify } from "util";
import { Dirent } from "fs";
import path from "path";

export const fsWalkSync = (dir: string): string[] => {
  let data: string[] = [];
  const res = fs.readdirSync(dir);
  res.forEach((fileName) => {
    const filePath = path.join(dir, fileName);
    const isDir = fs.statSync(filePath).isDirectory();
    if (isDir) {
      data = [...data, ...fsWalkSync(filePath)];
    } else data.push(filePath);
  });
  return data;
};

// 以下写法会生成树状文件名（非单数组形式）
export const fsWalkTree = async (root: string): Promise<any> => {
  const dirs = await promisify(fs.readdir)(root, { withFileTypes: true });
  return Promise.all(
    dirs.map(async (dir: Dirent) => {
      const path = [root, dir.name].join("/");
      return dir.isDirectory() ? await fsWalkTree(path) : path;
    })
  );
};

export const fsWalk = async (
  root: string,
  curPaths: string[] = []
): Promise<string[]> => {
  const dirs = await promisify(fs.readdir)(root, { withFileTypes: true });
  await Promise.all(
    dirs.map(async (dir: Dirent) => {
      const path = [root, dir.name].join("/");
      if (dir.isDirectory()) {
        await fsWalk(path, curPaths);
      } else {
        curPaths.push(path);
      }
    })
  );
  return curPaths;
};
