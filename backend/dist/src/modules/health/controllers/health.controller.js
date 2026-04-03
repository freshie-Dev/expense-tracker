"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHealthController = buildHealthController;
const express_1 = require("express");
const api_response_1 = require("../../../common/responses/api-response");
function buildHealthController() {
    const router = (0, express_1.Router)();
    router.get('/', (_req, res) => {
        res.json((0, api_response_1.successResponse)('API is healthy', {
            status: 'ok',
            timestamp: new Date().toISOString()
        }));
    });
    return router;
}
