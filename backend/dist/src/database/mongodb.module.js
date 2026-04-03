"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = connectMongo;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const app_config_1 = require("../config/app.config");
const logger_1 = require("../common/utils/logger");
async function connectMongo() {
    await mongoose_1.default.connect(app_config_1.appConfig.MONGO_URI, {
        serverApi: {
            version: mongodb_1.ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        },
        serverSelectionTimeoutMS: 10000
    });
    logger_1.logger.info('MongoDB connected (Atlas SRV + Stable API)');
}
