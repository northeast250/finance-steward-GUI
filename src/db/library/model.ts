import { ImgLocation, ImgSize } from "../../renderer/common/interface/img";
import { OcrItems } from "../../renderer/common/interface/ocr/ocrItem";
import {
  Brand,
  Category,
} from "../../renderer/common/interface/serialize/scenario";
import { Model, Schema, Document } from "mongoose";
import { Collections } from "../config";
import client from "../client";

export interface ImgBenchmark {
  brand: Brand;
  category: Category;
}

export interface OcrImg {
  location: ImgLocation;
  size: ImgSize;
  ocrItems: OcrItems;
  benchmark: ImgBenchmark;
}

export interface ILibrary extends OcrImg, Document {
  _id: string;
  path: string;
}

const LibrarySchema = new Schema(
  {
    location: {
      dir: String,
      name: String,
    },
    size: {
      width: Number,
      height: Number,
    },
    benchmark: {
      brand: { type: String, enum: Brand },
      category: { type: String, enum: Category },
    },
    ocrItems: [{ words: String, confidence: Number, location: [[Number]] }],
  },
  { collection: Collections.library }
);

LibrarySchema.virtual("path").get(function () {
  // @ts-ignore
  return [this.location.dir, this.location.name].join("/");
});

export const LibraryModel: Model<ILibrary> = client.model(
  Collections.library,
  LibrarySchema
);
export default LibraryModel;
