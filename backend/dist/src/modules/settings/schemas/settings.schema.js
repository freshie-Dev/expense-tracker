"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModel = void 0;
const mongoose_1 = require("mongoose");
const settingsSchema = new mongoose_1.Schema({
    overspendingMode: { type: String, enum: ['block', 'warn'], required: true, default: 'warn' }
}, { timestamps: true, versionKey: false });
exports.SettingsModel = (0, mongoose_1.model)('AppSettings', settingsSchema);
