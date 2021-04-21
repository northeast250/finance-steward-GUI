import { RESOURCE_ABS_PATH } from "../src/general/config";
import { fsWalk, fsWalkSync } from "../src/general/io";

console.time("fs1");
console.log("files count sync:" + fsWalkSync(RESOURCE_ABS_PATH).length);
console.timeEnd("fs1");

console.time("fs2");
fsWalk(RESOURCE_ABS_PATH).then((e) => {
  // console.log("files: ", JSON.stringify(e, null, 2));
  console.log("files count async: ", e.length);
  console.timeEnd("fs2");
});
