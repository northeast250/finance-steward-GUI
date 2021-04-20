export const HOST = "localhost";
export const DATABASE_NAME = "finance-steward";

/**
 * 在设置Schema的时候，如果不指定集合的名字，会从Model名自动转成复数，所以要小心
 * reference: https://mongoosejs.com/docs/api.html#utils_exports.toCollectionName
 */
export enum Collections {
  library = "library",
  serialize = "serialize",
  config = "config",
}
