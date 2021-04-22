"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbFindOneOcrLibByImgID = exports.dbFetchAllOcrLib = exports.dbAddOcrLib = exports.ocrLibModel = exports.OcrLibSchema = exports.COLL_OCR_LIB = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const client_1 = __importDefault(require("./client"));
const assert_1 = __importDefault(require("assert"));
const lib_parsed_1 = require("./lib_parsed");
const lib_basic_1 = require("./lib_basic");
const ocr_1 = require("../interface/lib/ocr");
exports.COLL_OCR_LIB = "lib_ocr";
/**
 * ocr表的设计需要用到联表
 * - [mongoose的联表存储和查询_养只猫的博客-CSDN博客_mongoose联表查询](https://blog.csdn.net/qq_40816649/article/details/88064215)
 */
exports.OcrLibSchema = new mongoose_1.default.Schema({
    baseId: {
        type: String,
        required: true,
    },
    parses: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: lib_parsed_1.COLL_PARSED_LIB,
        },
    ],
    api: { type: String, default: ocr_1.OcrApiType.HUAWEI_WEB_IMAGE },
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
}, { collection: exports.COLL_OCR_LIB });
exports.ocrLibModel = client_1.default.model(exports.COLL_OCR_LIB, exports.OcrLibSchema);
const dbAddOcrLib = async (baseId, ocrItems, api) => {
    const ocrDoc = await exports.ocrLibModel.create({
        baseId,
        api,
        time: new Date(),
        items: ocrItems,
    });
    console.log("added ocr: ", ocrDoc._id);
    // 更新reference
    const baseDoc = await lib_basic_1.basicLibModel.updateOne({ _id: baseId }, { $addToSet: { ocrs: ocrDoc._id } });
    console.log("updated base: ", baseDoc);
    return ocrDoc;
};
exports.dbAddOcrLib = dbAddOcrLib;
const dbFetchAllOcrLib = async () => {
    return exports.ocrLibModel.find();
};
exports.dbFetchAllOcrLib = dbFetchAllOcrLib;
const dbFindOneOcrLibByImgID = async (baseId) => {
    const libOcrDoc = await exports.ocrLibModel.findOne({ baseId });
    assert_1.default(libOcrDoc);
    return libOcrDoc;
};
exports.dbFindOneOcrLibByImgID = dbFindOneOcrLibByImgID;
//# sourceMappingURL=lib_ocr.js.map