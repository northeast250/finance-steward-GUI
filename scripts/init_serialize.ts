import { initSerializes } from "../src/db/serialize/curd";

initSerializes().catch((e) => {
  throw e;
});
