import { libCoreModel } from "../../src/db/lib_core";
import Mongoose from "mongoose";

// 测试通过
const testDbFetchLibCoreWillHaveBaseWhenAutoPopulate = async () => {
  const result = await libCoreModel.findOne();
  console.log(result);
};

const testDbFetchLibCoreWithNestedFilterOnAutoPopulated = async () => {
  const doc = await libCoreModel.findOne({
    // 1. 直接用base_id作为筛选，测试通过，说明很有可能是filter之后再populate
    // base: "607f8f3cca1727529d3668b6",

    // 2. 用base的紫属性去筛选，最终得不到结果，说明确实是filter之后再populate的
    "base.__v": 0,
  });
  console.log(doc);
};

// 经测试，这个match也是没用的……
const testDbFetchLibCoreWithNestedFilterAfterPopulate = async () => {
  const doc = await libCoreModel.findOne().populate({
    path: "base",
    match: {
      path: { $regex: /支付宝/ },
    },
  });
  console.log(doc);
};

// testDbFetchLibCoreWillHaveBaseWhenAutoPopulate();
// testDbFetchLibCoreWithNestedFilterOnAutoPopulated();
testDbFetchLibCoreWithNestedFilterAfterPopulate();
