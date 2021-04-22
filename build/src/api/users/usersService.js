"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.UsersService = void 0;
var UsersService = /** @class */ (function () {
    function UsersService() {
    }
    UsersService.prototype.get = function (id, name) {
        return {
            id: id,
            email: "jane@doe.com",
            name: name !== null && name !== void 0 ? name : "Jane Doe",
            status: "Happy",
            phoneNumbers: []
        };
    };
    UsersService.prototype.create = function (userCreationParams) {
        return __assign({ id: Math.floor(Math.random() * 10000), status: "Happy" }, userCreationParams);
    };
    return UsersService;
}());
exports.UsersService = UsersService;
