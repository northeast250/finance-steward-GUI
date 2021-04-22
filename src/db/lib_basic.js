"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbFilterBasicLib = exports.dbFindBasicLibByPath = exports.dbFetchBasicLib = exports.dbAddBasicLib = exports.basicLibModel = exports.COLL_BASIC_LIB = void 0;
const mongoose_1 = require("mongoose");
const client_1 = __importDefault(require("./client"));
const lib_ocr_1 = require("./lib_ocr");
const assert_1 = __importDefault(require("assert"));
exports.COLL_BASIC_LIB = "lib_base";
const LibBaseSchema = new mongoose_1.Schema({
    ocrs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: lib_ocr_1.COLL_OCR_LIB,
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
}, { collection: exports.COLL_BASIC_LIB });
exports.basicLibModel = client_1.default.model(exports.COLL_BASIC_LIB, LibBaseSchema);
const dbAddBasicLib = async (path, width, height, brand, category) => {
    const basic = {
        time: new Date(),
        path,
        size: { width, height },
        benchmark: { brand, category },
    };
    const doc = await exports.basicLibModel.create({ ...basic });
    console.log("added base: ", doc._id);
    return doc;
};
exports.dbAddBasicLib = dbAddBasicLib;
const dbFetchBasicLib = async (...args) => {
    return exports.basicLibModel.find(...args).populate("ocrs");
};
exports.dbFetchBasicLib = dbFetchBasicLib;
const dbFindBasicLibByPath = async (path) => {
    const doc = await exports.basicLibModel
        .findOne({ path: { $regex: path } })
        .populate({
        path: "ocrs",
        select: "-items",
        populate: {
            path: "parses",
        },
    })
        .populate("parses");
    assert_1.default(doc);
    return doc;
};
exports.dbFindBasicLibByPath = dbFindBasicLibByPath;
const dbFilterBasicLib = async (s) => {
    if (s.search(/^\s*return /) < 0)
        s = "return " + s;
    // @ts-ignore
    const funcFilter = new Function("doc", s);
    const docs = await exports.basicLibModel.find().populate("ocrs");
    return docs.filter((doc) => funcFilter(doc));
};
exports.dbFilterBasicLib = dbFilterBasicLib;
//# sourceMappingURL=lib_basic.js.map