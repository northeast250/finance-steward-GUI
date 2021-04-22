"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbAddLibParse = exports.libParseModel = exports.LibParseSchema = exports.COLL_PARSED_LIB = void 0;
const mongoose_1 = require("mongoose");
const client_1 = __importDefault(require("./client"));
const lib_ocr_1 = require("./lib_ocr");
const parse_1 = require("../interface/lib/parse");
exports.COLL_PARSED_LIB = "lib_parse";
exports.LibParseSchema = new mongoose_1.Schema({
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
        enum: parse_1.Scenario,
    },
    status: {
        type: String,
        enum: parse_1.ParseStatus,
    },
    tokens: [
        {
            value: mongoose_1.Schema.Types.Mixed,
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
}, { collection: exports.COLL_PARSED_LIB });
exports.libParseModel = client_1.default.model(exports.COLL_PARSED_LIB, exports.LibParseSchema);
const dbAddLibParse = async (ocrId, parsedResult) => {
    const parseDoc = await exports.libParseModel.create({
        ...parsedResult,
        ocrId,
    });
    console.log("added parse: ", parseDoc._id);
    const updatedOcrResult = await lib_ocr_1.ocrLibModel.updateOne({ _id: ocrId }, { $addToSet: { parses: parseDoc._id } });
    console.log("updated ocr: ", updatedOcrResult);
    return parseDoc;
};
exports.dbAddLibParse = dbAddLibParse;
//# sourceMappingURL=lib_parsed.js.map