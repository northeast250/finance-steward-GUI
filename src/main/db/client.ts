import mongoose from "mongoose";
import { MONGO_URI } from "../config";

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
