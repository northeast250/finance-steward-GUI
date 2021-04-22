import * as fs from "fs";
import assert = require("assert");

/**
 */
(async () => {
  const argv = require("minimist")(process.argv.slice(2));
  console.log(argv);

  const outPath = "temp.ts";
  const path: string = process.argv[2];
  console.log("input path: ", path);
  const types: string[] = [];
  fs.readFile(path, "utf-8", (err, text) => {
    let data: string = text
      .split("\n")
      .map((s: string) => {
        const arr: string[] = s.split(" ").filter((s) => s !== "=" && s !== "");
        assert(arr.length === 1 || arr.length === 2);
        let key = arr[0];
        let val = `"${arr[0]}"`;
        if (arr.length === 2) {
          val = arr[1].replace(/,/, "");
        }
        types.push(key);
        return `export const ${key} = ${val}\nexport type ${key} = typeof ${key}\n`;
      })
      .join("\n");
    data += "\nexport type XXX = " + types.join(" | ");
    fs.writeFile(outPath, data, (err) => {
      if (!err) {
        console.log("output path: " + outPath);
      }
    });
  });
})();
