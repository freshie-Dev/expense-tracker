"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const app_config_1 = require("../../config/app.config");
exports.logger = (0, pino_1.default)({
    level: app_config_1.appConfig.NODE_ENV === 'production' ? 'info' : 'debug',
    redact: ['req.headers.authorization']
});
