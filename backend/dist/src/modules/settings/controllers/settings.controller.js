"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSettingsController = buildSettingsController;
const express_1 = require("express");
const validate_middleware_1 = require("../../../common/middleware/validate.middleware");
const api_response_1 = require("../../../common/responses/api-response");
const settings_dto_1 = require("../dto/settings.dto");
function buildSettingsController(service) {
    const router = (0, express_1.Router)();
    router.get('/', async (_req, res) => {
        const settings = await service.getSettings();
        res.json((0, api_response_1.successResponse)('Settings fetched', settings));
    });
    router.patch('/', (0, validate_middleware_1.validateBody)(settings_dto_1.updateSettingsSchema), async (req, res) => {
        const settings = await service.updateSettings(req.body);
        res.json((0, api_response_1.successResponse)('Settings updated', settings));
    });
    return router;
}
