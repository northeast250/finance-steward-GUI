import { Schema, Document, Model } from "mongoose";
import client from "./client";
import { ocrLibModel } from "./lib_ocr";
import { ParsedResult, ParseStatus, Scenario } from "../interface/lib/parse";

export const COLL_PARSED_LIB = "lib_parse";

export const LibParseSchema = new Schema(
  {
    ocrId: String,
    time: {
      type: Date,
      required: true,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
    },
    scenario: {
      type: String,
      enum: Scenario,
    },
    status: {
      type: String,
      enum: ParseStatus,
    },
    tokens: [
      {
        value: Schema.Types.Mixed,
        type: {
          type: String,
        },
      },
    ],
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          required: true,
        },
        category: String,
        status: String,
      },
    ],
  },
  { collection: COLL_PARSED_LIB }
);

export interface ParsedLibDoc extends Document, ParsedResult {
  _id: string;
  ocrId: string;
}

export interface LibParseModel extends Model<ParsedLibDoc> {}

export const libParseModel = client.model<ParsedLibDoc, LibParseModel>(
  COLL_PARSED_LIB,
  LibParseSchema
);

export const dbAddLibParse = async (
  ocrId: string,
  parsedResult: ParsedResult
) => {
  const parseDoc = await libParseModel.create({
    ...parsedResult,
    ocrId,
  });
  console.log("added parse: ", parseDoc._id);
  const updatedOcrResult = await ocrLibModel.updateOne(
    { _id: ocrId },
    { $addToSet: { parses: parseDoc._id } }
  );
  console.log("updated ocr: ", updatedOcrResult);
  return parseDoc;
};
