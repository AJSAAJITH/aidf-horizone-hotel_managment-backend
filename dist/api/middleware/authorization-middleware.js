"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAmdin = void 0;
const forbidden_error_1 = __importDefault(require("../../domain/errors/forbidden_error"));
const isAmdin = (req, res, next) => {
    if (req?.auth?.sessionClaims?.metadata?.role !== "admin") {
        throw new forbidden_error_1.default("FobiddenError");
    }
    // console.log(req?.auth?.sessionClaims?.metadata?.role);
    next();
};
exports.isAmdin = isAmdin;
//# sourceMappingURL=authorization-middleware.js.map