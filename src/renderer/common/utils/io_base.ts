import fs from "fs";

export const loadJsonFile = (filePath: string, fallback: any) => {
  if (fs.existsSync(filePath)) {
    // console.log("loaded json file: ", filePath);
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } else {
    console.log("not found json file: ", filePath);
    console.log("fallback: ", fallback);
    return fallback;
  }
};

export const dumpJsonFile = (filePath: string, data: object) => {
  fs.writeFile(filePath, JSON.stringify(data), (e) => {
    if (e) {
      console.error("保存JSON失败: " + filePath);
    } else {
      console.log("保存JSON成功: " + filePath);
    }
  });
};
