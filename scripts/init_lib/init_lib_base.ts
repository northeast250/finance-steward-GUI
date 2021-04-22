import { fsWalk } from "../../src/general/io";
import { RESOURCE_PATH } from "../../src/general/config";
import { dbAddBasicLib } from "../../src/db/lib_basic";
import imageSize from "image-size";
import assert from "assert";
import { Brand, Category } from "../../src/interface/lib/basic";

/**
 * always load from local
 */
const initLibBaseFromLocal = async () => {
  const paths = await fsWalk(RESOURCE_PATH);
  paths.forEach((path) => {
    if (!path.endsWith(".jpg")) return;

    const { width, height } = imageSize(path);
    assert(width && height);

    const brand = path.match(/支付宝\//) ? Brand.ZFB : Brand.WX;
    const category = path.match(/\/xq/) ? Category.XQ : Category.LS;
    dbAddBasicLib(path, width, height, brand, category);
  });
};

initLibBaseFromLocal();
