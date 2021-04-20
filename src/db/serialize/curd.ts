import { OcrItems } from "../../renderer/common/interface/ocr/ocrItem";
import LibraryModel, { ILibrary } from "../library/model";
import { SerializeResult } from "../../renderer/common/interface/serialize/token";
import decideLSOrXQ from "../../algos/decideLSOrXQ";
import { serializeLS } from "../../algos/serializeLS";
import serializeXQ from "../../algos/serializeXQ";
import { CallbackError } from "mongoose";
import SerializeModel from "./model";

const createSerialize = (
  ocrItems: OcrItems,
  imgId: string,
  imgItem: ILibrary
): SerializeResult => {
  try {
    const isLS = decideLSOrXQ(ocrItems);
    if (isLS) {
      const tokenData = serializeLS(ocrItems, imgItem.size.width);
      return {
        imgId,
        resultLS: tokenData,
      };
    } else {
      const tokenData = serializeXQ(ocrItems);
      return {
        imgId,
        resultXQ: tokenData,
      };
    }
  } catch (e: any) {
    console.warn(`[${e.message}], skip img: ${imgItem.path}`);
    return {
      imgId,
      status: e.message,
    };
  }
};

export const initSerializes = async () => {
  LibraryModel.find().exec(async (err: CallbackError, docs: ILibrary[]) => {
    if (err) throw err;

    docs.forEach((doc: ILibrary) => {
      const serializeItem = createSerialize(doc.ocrItems, doc._id, doc);
      SerializeModel.create(serializeItem).then(() => {
        console.debug("successfully serialized img: ", doc.path);
      });
    });
  });
};

export default {
  init: initSerializes,
};
