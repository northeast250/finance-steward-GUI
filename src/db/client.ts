/**
 * reference:
 * 1. https://developer.mozilla.org/zh-CN/docs/learn/Server-side/Express_Nodejs/mongoose [火狐MDN文档]
 * 2. https://mongoosejs.com/docs/validation.html [moogoose官网]
 * 3. https://docs.mongodb.com/manual/reference/command/serverStatus/ [mongodb官网]
 */

// 导入 mongoose 模块
import { DATABASE_NAME, HOST } from "./config";

const mongoose = require("mongoose");

// 设置默认 mongoose 连接
const MONGO_URI = `mongodb://${HOST}/${DATABASE_NAME}`;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接

const connection = mongoose.connection;
connection.once("open", console.log.bind(console, "MongoDB 连接成功"));
connection.on("error", console.error.bind(console, "MongoDB 连接错误："));

export const client = mongoose;
export default client;
