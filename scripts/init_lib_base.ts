import { fsWalk } from "../src/general/io";
import { RESOURCE_ABS_PATH } from "../src/general/config";
import { dbAddLibBase } from "../src/main/db/lib_base";
import imageSize from "image-size";
import assert from "assert";
import { Brand, Category } from "../src/renderer/redux/lib/interface";

/**
 * always load from local
 */
(async () => {
  const paths = await fsWalk(RESOURCE_ABS_PATH);
  paths.forEach((path) => {
    if (!path.endsWith(".jpg")) return;

    const { width, height } = imageSize(path);
    assert(width && height);

    const brand = path.match(/支付宝\//) ? Brand.ZFB : Brand.WX;
    const category = path.match(/\/xq/) ? Category.XQ : Category.LS;
    dbAddLibBase(path, width, height, brand, category);
  });
})();
