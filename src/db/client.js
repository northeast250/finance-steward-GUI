"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../main/config");
const client = mongoose_1.default;
client.connect(config_1.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (!err)
        console.log("MongoDB connected");
});
client.Promise = global.Promise;
const db = client.connection;
db.on("error", console.error.bind(console, "Mongodb error"));
exports.default = client;
//# sourceMappingURL=client.js.map