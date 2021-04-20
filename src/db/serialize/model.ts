import { Model, model, Schema, Document } from "mongoose";
import { Collections } from "../config";
import {
  SerializeLSResult,
  SerializeXQResult,
} from "../../renderer/common/interface/serialize/token";

interface ISerialize extends Document {
  readonly imgId: string;
  resultLS?: SerializeLSResult;
  resultXQ?: SerializeXQResult;
}

const SerializeSchema = new Schema(
  {
    imgId: String,
    resultLS: Schema.Types.Mixed,
    resultXQ: Schema.Types.Mixed,
    status: String,
  },
  { collection: Collections.serialize }
);

export const SerializeModel: Model<ISerialize> = model(
  Collections.serialize,
  SerializeSchema
);

export default SerializeModel;
