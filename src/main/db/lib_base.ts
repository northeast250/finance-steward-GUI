import { Schema, Document, Model } from "mongoose";
import client from "./client";
import imageSize from "image-size";
import {
  Brand,
  Category,
  ImgBase,
  ImgPath,
} from "../../renderer/redux/lib/interface";
import assert from "assert";

export const COLL_LIB_BASE = "lib_base";

const LibBaseSchema = new Schema(
  {
    path: String,
    size: {
      width: String,
      height: String,
    },
    benchmark: {
      brand: {
        type: String,
        enum: ["WX", "ZFB"],
      },
      category: {
        type: String,
        enum: ["LS", "XQ"],
      },
    },
  },
  { collection: COLL_LIB_BASE }
);

export interface LibBaseDoc extends Document, ImgBase {}
export interface LibBaseModel extends Model<LibBaseDoc> {}

export const libBaseModel = client.model<LibBaseDoc, LibBaseModel>(
  COLL_LIB_BASE,
  LibBaseSchema
);

export const dbAddLibBase = async (
  path: ImgPath,
  width: number,
  height: number,
  brand: Brand,
  category: Category
) => {
  const imgBase: ImgBase = {
    path,
    size: { width, height },
    benchmark: { brand, category },
  };
  return libBaseModel.create(imgBase).then((e: LibBaseDoc) => {
    console.log("created img_base: ", e.path);
  });
};

export const dbFetchLibBase = async (...args: any): Promise<LibBaseDoc[]> => {
  return libBaseModel.find(...args);
};

export default {
  dbFetchLibBase,
};
