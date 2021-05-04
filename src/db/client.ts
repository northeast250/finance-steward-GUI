import mongoose from "mongoose";
// @ts-ignore
mongoose.Schema.ObjectId.get((v) => (v != null ? v.toString() : v));

import { MONGO_URI } from "../main/config";

const client = mongoose;

client.connect(
  MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (!err) console.log("MongoDB connected");
  }
);

client.Promise = global.Promise;
const db = client.connection;
db.on("error", console.error.bind(console, "Mongodb error"));

export default client;
