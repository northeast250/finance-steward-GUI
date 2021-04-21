import mongoose, { Schema } from "mongoose";
import { ImgOcrItem } from "../../renderer/redux/lib/interface";
import client from "./client";
import assert from "assert";
import { COLL_LIB_BASE } from "./lib_base";

export const COLL_LIB_OCR = "lib_ocr";

export enum OCR_API_TYPE {
  HUAWEI_WEB_IMAGE = "HUAWEI_WEB_IMAGE",
}

/**
 * ocr表的设计需要用到联表
 * - [mongoose的联表存储和查询_养只猫的博客-CSDN博客_mongoose联表查询](https://blog.csdn.net/qq_40816649/article/details/88064215)
 */
export const LibOcrSchema = new mongoose.Schema(
  {
    imgID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLL_LIB_BASE,
    },
    api: { type: String, default: OCR_API_TYPE.HUAWEI_WEB_IMAGE },
    time: Date,
    items: [
      {
        words: String,
        confidence: Number,
        location: [[Number]],
      },
    ],
  },
  { collection: COLL_LIB_OCR }
);

export interface LibOcrDoc extends mongoose.Document {
  imgID: string;
  api: string;
  time: Date;
  items: ImgOcrItem[];
}

export interface LibOcrModel extends mongoose.Model<LibOcrDoc> {}

export const libOcrModel = client.model<LibOcrDoc, LibOcrModel>(
  COLL_LIB_OCR,
  LibOcrSchema
);

export const dbAddLibOcr = (
  imgID: Schema.Types.ObjectId,
  ocrItems: ImgOcrItem[],
  api: OCR_API_TYPE
) => {
  libOcrModel
    .create({
      imgID,
      api,
      time: new Date(),
      items: ocrItems,
    })
    .then((doc: LibOcrDoc) => {
      console.debug("added lib_ocr of image id: ", imgID);
    });
};

export const dbFindAllLibOcr = async (): Promise<LibOcrDoc[]> => {
  return libOcrModel.find();
};

export const dbFindOneLibOcrByImgID = async (
  imgID: string
): Promise<LibOcrDoc> => {
  const libOcrDoc = await libOcrModel.findOne({ imgID });
  assert(libOcrDoc);
  return libOcrDoc;
};

export const dbFindOneLibOcrByID = async (
  ocrID: string
): Promise<LibOcrDoc> => {
  const libOcrDoc = await libOcrModel.findById(ocrID);
  assert(libOcrDoc);
  return libOcrDoc;
};
