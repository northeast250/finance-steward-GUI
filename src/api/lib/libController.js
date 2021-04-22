"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibController = void 0;
const tsoa_1 = require("tsoa");
const lib_basic_1 = require("../../db/lib_basic");
let LibController = class LibController extends tsoa_1.Controller {
    async queryByPath(path) {
        return lib_basic_1.dbFindBasicLibByPath(path);
    }
};
__decorate([
    tsoa_1.Get("{path}"),
    __param(0, tsoa_1.Query())
], LibController.prototype, "queryByPath", null);
LibController = __decorate([
    tsoa_1.Route("lib"),
    tsoa_1.Tags("Library")
], LibController);
exports.LibController = LibController;
//# sourceMappingURL=libController.js.map