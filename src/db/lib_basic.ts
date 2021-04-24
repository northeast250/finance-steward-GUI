import { Schema, Document, Model } from "mongoose";
import client from "./client";
import { Basic, Brand, Category, Path } from "../interface/lib/basic";
import { COLL_OCR_LIB, OcrLibDoc } from "./lib_ocr";
import assert from "assert";

export const COLL_BASIC_LIB = "lib_base";

const LibBaseSchema = new Schema(
  {
    ocrs: [
      {
        type: Schema.Types.ObjectId,
        ref: COLL_OCR_LIB,
      },
    ],
    time: {
      type: Date,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      width: {
        type: String,
        required: true,
      },
      height: {
        type: String,
        required: true,
      },
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
  { collection: COLL_BASIC_LIB }
);

export interface BasicLibDoc extends Document, Basic {
  _id: string;
  ocrs: (OcrLibDoc | string)[]; // 输出的时候，必须populate
}

export interface BasicLibModel extends Model<BasicLibDoc> {}

export const basicLibModel = client.model<BasicLibDoc, BasicLibModel>(
  COLL_BASIC_LIB,
  LibBaseSchema
);

export const dbAddBasicLib = async (
  path: Path,
  width: number,
  height: number,
  brand: Brand,
  category: Category
): Promise<BasicLibDoc> => {
  const basic: Basic = {
    time: new Date(),
    path,
    size: { width, height },
    benchmark: { brand, category },
  };
  const doc = await basicLibModel.create({ ...basic });
  console.log("added base: ", doc._id);
  return doc;
};

export const dbFetchBasicLib = async (...args: any): Promise<Object[]> => {
  return basicLibModel
    .find()
    .limit(10)
    .lean()
    .populate({
      path: "ocrs",
      select: "",
      populate: {
        path: "parses",
        select: "-tokens",
      },
    });
};

export const dbFindBasicLibByPath = async (path: string): Promise<Object> => {
  const doc = await basicLibModel
    .findOne({ path: { $regex: path } })
    .lean()
    .populate({
      path: "ocrs",
      select: "-items",
      populate: {
        path: "parses",
        select: "-tokens",
      },
    });
  assert(doc, "CAN'T FIND THE TARGET DOC!");
  return doc;
};

export const dbFilterBasicLib = async (s: string): Promise<Object[]> => {
  if (s.search(/^\s*return /) < 0) s = "return " + s;
  // @ts-ignore
  const funcFilter: (doc: Object) => boolean = new Function("doc", s);
  const docs: Object[] = await basicLibModel.find().lean().populate("ocrs");
  return docs.filter((doc: Object) => funcFilter(doc));
};
