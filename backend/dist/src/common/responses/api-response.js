"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
function successResponse(message, data, meta = {}) {
    return {
        success: true,
        message,
        data,
        errors: [],
        meta
    };
}
function errorResponse(message, errors = [], meta = {}) {
    return {
        success: false,
        message,
        data: null,
        errors,
        meta
    };
}
