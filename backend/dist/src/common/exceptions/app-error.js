"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    code;
    field;
    details;
    constructor(params) {
        super(params.message);
        this.statusCode = params.statusCode;
        this.code = params.code;
        this.field = params.field;
        this.details = params.details;
    }
}
exports.AppError = AppError;
