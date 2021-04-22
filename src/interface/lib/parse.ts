import {
  AmountTokenType,
  NameTokenType,
  TimeTokenType,
  Token,
  ZFBCategoryTokenType,
  ZFBStatusTokenType,
} from "./token";

export enum Scenario {
  WX_XQ = "WX_XQ",
  WX_LS = "WX_LS",
  ZFB_XQ = "ZFB_XQ",
  ZFB_LS = "ZFB_LS",
  UNKNOWN = "UNKNOWN",
}

export enum ParseStatus {
  success = "解析成功",
  failForPreParse = "预解析失败",
  failForFloatWindow = "解析失败（有浮窗）",
  failForNotComplete = "解析失败（截图不全）",
  failForUnknown = "解析失败（未知类型）",
  failForDetail = "解析失败（不能识别详情页）",
  failForZFBLess = "解析失败（支付宝竟然比微信少，todo）",
  failForParseName = "解析失败（未识别出交易对象）",
  delay = "延后解析",
  todo = "待解析",
}

export interface ParseItemBase {
  name: NameTokenType;
  amount: AmountTokenType;
  time: TimeTokenType;
}

export interface ParseItemOfZfb extends ParseItemBase {
  category: ZFBCategoryTokenType;
  status: ZFBStatusTokenType;
}

export interface ParsedResult {
  time: Date;
  status: ParseStatus;
  confidence: number;
  scenario: Scenario;
  tokens: Token[];
  items: ParseItemBase[];
}
