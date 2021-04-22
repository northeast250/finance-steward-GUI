import mongoose, { Schema } from "mongoose";
import client from "./client";
import assert from "assert";
import { COLL_PARSED_LIB, ParsedLibDoc } from "./lib_parsed";
import { basicLibModel } from "./lib_basic";
import { OcrApiType, OcrItem, OcrResult } from "../interface/lib/ocr";

export const COLL_OCR_LIB = "lib_ocr";

/**
 * ocr表的设计需要用到联表
 * - [mongoose的联表存储和查询_养只猫的博客-CSDN博客_mongoose联表查询](https://blog.csdn.net/qq_40816649/article/details/88064215)
 */
export const OcrLibSchema = new mongoose.Schema(
  {
    baseId: {
      type: String,
      required: true,
    },
    parses: [
      {
        type: Schema.Types.ObjectId,
        ref: COLL_PARSED_LIB,
      },
    ],
    api: { type: String, default: OcrApiType.HUAWEI_WEB_IMAGE },
    time: {
      type: Date,
      required: true,
    },
    items: [
      {
        words: String,
        confidence: Number,
        location: [[Number]],
      },
    ],
  },
  { collection: COLL_OCR_LIB }
);

export interface OcrLibDoc extends mongoose.Document, OcrResult {
  _id: string;
  baseId: string;
  parses: (ParsedLibDoc | string)[];
}

export interface OcrLibModel extends mongoose.Model<OcrLibDoc> {}

export const ocrLibModel = client.model<OcrLibDoc, OcrLibModel>(
  COLL_OCR_LIB,
  OcrLibSchema
);

export const dbAddOcrLib = async (
  baseId: string,
  ocrItems: OcrItem[],
  api: OcrApiType
) => {
  const ocrDoc = await ocrLibModel.create({
    baseId,
    api,
    time: new Date(),
    items: ocrItems,
  });
  console.log("added ocr: ", ocrDoc._id);
  // 更新reference
  const baseDoc = await basicLibModel.updateOne(
    { _id: baseId },
    { $addToSet: { ocrs: ocrDoc._id } }
  );
  console.log("updated base: ", baseDoc);
  return ocrDoc;
};

export const dbFetchAllOcrLib = async () => {
  return ocrLibModel.find();
};

export const dbFindOneOcrLibByImgID = async (
  baseId: string
): Promise<OcrLibDoc> => {
  const libOcrDoc = await ocrLibModel.findOne({ baseId });
  assert(libOcrDoc);
  return libOcrDoc;
};
