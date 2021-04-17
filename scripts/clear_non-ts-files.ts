import * as path from "path";
import * as fs from "fs";

const ROOT_PATH = path.resolve(__dirname, "../src");

function fsHandleFile(filePath: string) {
  if (filePath.match(/\.(d\.ts(\.map)?|js)$/)) {
    fs.unlink(filePath, (e) => {
      if (e) {
        console.warn("failed to delete file: ", filePath);
      } else {
        console.log("deleted file: ", filePath);
      }
    });
  }
}

function fsWalk(rootPath: string) {
  const dirs = fs.readdirSync(rootPath, { withFileTypes: true });
  dirs.forEach((dir) => {
    const dirPath = path.join(rootPath, dir.name);
    if (dir.isDirectory()) fsWalk(dirPath);
    else fsHandleFile(dirPath);
  });
}

console.log("=== START BATCH HANDLING FILES ===");
console.log("ROOT_PATH: ", ROOT_PATH);
fsWalk(ROOT_PATH);
console.log("=== FINISHED HANDLING FILES ====");
