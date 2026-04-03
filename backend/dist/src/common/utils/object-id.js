"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureObjectId = ensureObjectId;
const mongoose_1 = __importDefault(require("mongoose"));
const app_error_1 = require("../exceptions/app-error");
function ensureObjectId(id, field = 'id') {
    if (!mongoose_1.default.isValidObjectId(id)) {
        throw new app_error_1.AppError({
            message: `Invalid ${field}`,
            statusCode: 400,
            code: 'INVALID_OBJECT_ID',
            field
        });
    }
    return new mongoose_1.default.Types.ObjectId(id);
}
