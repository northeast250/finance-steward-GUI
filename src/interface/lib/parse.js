"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseStatus = exports.Scenario = void 0;
var Scenario;
(function (Scenario) {
    Scenario["WX_XQ"] = "WX_XQ";
    Scenario["WX_LS"] = "WX_LS";
    Scenario["ZFB_XQ"] = "ZFB_XQ";
    Scenario["ZFB_LS"] = "ZFB_LS";
    Scenario["UNKNOWN"] = "UNKNOWN";
})(Scenario = exports.Scenario || (exports.Scenario = {}));
var ParseStatus;
(function (ParseStatus) {
    ParseStatus["success"] = "\u89E3\u6790\u6210\u529F";
    ParseStatus["failForPreParse"] = "\u9884\u89E3\u6790\u5931\u8D25";
    ParseStatus["failForFloatWindow"] = "\u89E3\u6790\u5931\u8D25\uFF08\u6709\u6D6E\u7A97\uFF09";
    ParseStatus["failForNotComplete"] = "\u89E3\u6790\u5931\u8D25\uFF08\u622A\u56FE\u4E0D\u5168\uFF09";
    ParseStatus["failForUnknown"] = "\u89E3\u6790\u5931\u8D25\uFF08\u672A\u77E5\u7C7B\u578B\uFF09";
    ParseStatus["failForDetail"] = "\u89E3\u6790\u5931\u8D25\uFF08\u4E0D\u80FD\u8BC6\u522B\u8BE6\u60C5\u9875\uFF09";
    ParseStatus["failForZFBLess"] = "\u89E3\u6790\u5931\u8D25\uFF08\u652F\u4ED8\u5B9D\u7ADF\u7136\u6BD4\u5FAE\u4FE1\u5C11\uFF0Ctodo\uFF09";
    ParseStatus["failForParseName"] = "\u89E3\u6790\u5931\u8D25\uFF08\u672A\u8BC6\u522B\u51FA\u4EA4\u6613\u5BF9\u8C61\uFF09";
    ParseStatus["delay"] = "\u5EF6\u540E\u89E3\u6790";
    ParseStatus["todo"] = "\u5F85\u89E3\u6790";
})(ParseStatus = exports.ParseStatus || (exports.ParseStatus = {}));
//# sourceMappingURL=parse.js.map