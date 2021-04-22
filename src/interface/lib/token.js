"use strict";
/**
 * token即从ocr结果的文本、位置、上下文等基于一定的词法分析以解析出的数据结构
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZFBStatusTokenType = exports.SignToken = exports.UnknownTokenType = exports.ZFBCategoryTokenType = exports.TimeTokenType = exports.AmountTokenType = exports.NameTokenType = void 0;
exports.NameTokenType = "NameTokenType";
exports.AmountTokenType = "AmountTokenType";
exports.TimeTokenType = "TimeTokenType";
exports.ZFBCategoryTokenType = "ZFBCategoryTokenType";
exports.UnknownTokenType = "UnknownTokenType";
var SignToken;
(function (SignToken) {
    SignToken["LS"] = "LS";
    SignToken["XQ"] = "XQ";
    SignToken["ZFB"] = "ZFB";
    SignToken["WX"] = "WX";
    SignToken["Unknown"] = "Unknown";
})(SignToken = exports.SignToken || (exports.SignToken = {}));
var ZFBStatusTokenType;
(function (ZFBStatusTokenType) {
    ZFBStatusTokenType["ZfbStatusOfWaitingPay"] = "\u7B49\u5F85\u4ED8\u6B3E";
    ZFBStatusTokenType["ZfbStatusOfWaitingYouPay"] = "\u7B49\u5F85\u5BF9\u65B9\u4ED8\u6B3E";
    ZFBStatusTokenType["ZfbStatusOfTradeSuccess"] = "\u4EA4\u6613\u6210\u529F";
    ZFBStatusTokenType["ZfbStatusOfTradeClose"] = "\u4EA4\u6613\u5173\u95ED";
    ZFBStatusTokenType["ZfbStatusOfHandling"] = "\u5904\u7406\u4E2D";
    ZFBStatusTokenType["ZfbStatusOfRefund"] = "\u9000\u6B3E\u6210\u529F";
    ZFBStatusTokenType["ZfbStatusOfClosed"] = "\u5DF2\u5173\u95ED";
})(ZFBStatusTokenType = exports.ZFBStatusTokenType || (exports.ZFBStatusTokenType = {}));
//# sourceMappingURL=token.js.map