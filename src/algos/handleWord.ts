import { TradeZfbStatus } from "../renderer/common/interface/ocr/trade";

// 1. 金额
export const wordIsAmount = (word: string): boolean => {
  return word.search(/^[+-]?[\d,，]+\.\d{2}$/) >= 0;
};

export const word2amount = (word: string): number => {
  try {
    // todo: 这里改成`replaceAll`是不对的，晚点要研究一下
    return parseFloat(word.replace(/[,，]/g, ""));
  } catch (e) {
    console.log({ word });
    throw new Error(e);
  }
};

// 2. 时间
// 微信/零钱通/转出/当前状态：支付成功/xq1.jpg，时间在识别时出现了中文冒号
export const wordIsDate = (word: string): boolean => {
  return (
    word.search(
      /^\s*(今天|昨天|\d+月\d+日|(\d{2,4}-)?\d\d-\d\d)\s+\d{2}[:：]\d{2}([:：]\d\d)?\s*$/
    ) >= 0
  );
};

export const word2date = (word: string): Date => {
  // 转换"mm月dd日"为标准的"mm-dd"
  word = word.replace("月", "-").replace("日", "");
  let date = new Date(word.replace(/：/g, ":"));
  if (date.getFullYear() === 2001) date.setFullYear(new Date().getFullYear());
  return date;
};

// 3. 类型
export const wordIsBillLs = (word: string): boolean => {
  // todo: 这里还可以写的更好一些，参考图： /Users/mark/projects/finance-steward/resource/test-root/微信/红包/收入/当前状态：已存入零钱/ls1.jpg
  return word.search(/.*账单\s*$/) >= 0;
};

export const wordIsBillXq = (word: string): boolean => {
  return word.search(/账单详情/) >= 0;
};

// 4. 状态
export const wordIsZfbTradeStatus = (word: string): boolean => {
  return Object.values(TradeZfbStatus).includes(word as TradeZfbStatus);
};
