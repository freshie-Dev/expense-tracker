"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
exports.globalErrorHandler = globalErrorHandler;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const api_response_1 = require("../responses/api-response");
const app_error_1 = require("../exceptions/app-error");
const logger_1 = require("../utils/logger");
function notFoundHandler(_req, res) {
    res.status(404).json((0, api_response_1.errorResponse)('Resource not found', [{ code: 'NOT_FOUND', detail: 'Endpoint does not exist' }]));
}
function globalErrorHandler(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json((0, api_response_1.errorResponse)('Validation failed', err.issues.map((i) => ({
            code: 'VALIDATION_ERROR',
            field: i.path.join('.'),
            detail: i.message
        }))));
        return;
    }
    if (err instanceof app_error_1.AppError) {
        res.status(err.statusCode).json((0, api_response_1.errorResponse)(err.message, [
            {
                code: err.code,
                field: err.field,
                detail: err.details ?? err.message
            }
        ]));
        return;
    }
    if (err instanceof mongoose_1.default.Error.CastError) {
        res.status(400).json((0, api_response_1.errorResponse)('Invalid identifier format', [
            { code: 'INVALID_OBJECT_ID', field: err.path, detail: 'Provided ID is not valid' }
        ]));
        return;
    }
    logger_1.logger.error({ err }, 'Unhandled server error');
    res.status(500).json((0, api_response_1.errorResponse)('Internal server error', [
        { code: 'INTERNAL_SERVER_ERROR', detail: 'Unexpected error occurred' }
    ]));
}
