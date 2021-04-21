import { Schema, Document, Model } from "mongoose";
import { COLL_LIB_BASE, LibBaseDoc } from "./lib_base";
import { COLL_LIB_OCR, LibOcrDoc } from "./lib_ocr";
import client from "./client";
import * as ts from "typescript";
import internal from "stream";

export const COLL_LIB_CORE = "lib_core";

export const OID = Schema.Types.ObjectId;
export type OID = typeof OID;

// todo: lib_parse
export const LibCoreSchema = new Schema(
  {
    base: {
      type: OID,
      ref: COLL_LIB_BASE,
      required: true,
    },
    ocr: {
      type: OID,
      ref: COLL_LIB_OCR,
    },
    // parse: {
    //   type: OID,
    //   ref: COLL_LIB_PARSE,
    // },
    time: Date,
  },
  { collection: COLL_LIB_CORE }
);

export interface LibCoreDoc extends Document {
  base: OID | LibBaseDoc;
  ocr: OID | LibOcrDoc;
  parse: OID;
  time: Date;
}

export interface LibCoreModel extends Model<LibCoreDoc> {}

export const libCoreModel = client.model<LibCoreDoc, LibCoreModel>(
  COLL_LIB_CORE,
  LibCoreSchema
);

export const dbAddLibCore = (base: OID, ocr?: OID, parse?: OID) => {
  return libCoreModel
    .updateOne(
      { _id: base },
      { $set: { base, ocr, parse, time: new Date() } },
      { upsert: true }
    )
    .then((e) => {
      console.log(e);
    })
    .catch((e) => {
      console.error(e);
    });
};

export const dbQueryAllLibCore = async (
  ...args: any
): Promise<LibCoreDoc[]> => {
  return libCoreModel
    .find(...args)
    .populate("base")
    .populate("ocr")
    .populate("parse");
};

export const dbFilterLibCore = async (filter: string) => {
  if (!filter.match(/^\s*return\s*/)) filter = "return " + filter;
  console.log("filter: ", filter);
  const funcFilter = new Function("doc", filter);

  const docs = await libCoreModel
    .find()
    .populate("base")
    .populate("ocr")
    .populate("parse");

  return docs.filter((doc: LibCoreDoc) => {
    const result = funcFilter(doc);
    if (typeof result === "boolean") {
      return result;
    } else {
      throw new Error(result + " is not a boolean");
    }
  });
};
