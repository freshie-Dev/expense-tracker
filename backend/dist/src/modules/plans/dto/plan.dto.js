"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activatePlanSchema = exports.createPlanSchema = void 0;
const zod_1 = require("zod");
const isoDate = zod_1.z.string().date();
exports.createPlanSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(1).max(100),
    totalIncome: zod_1.z.number().positive(),
    startDate: isoDate,
    endDate: isoDate
})
    .refine((data) => data.endDate >= data.startDate, {
    message: 'endDate must be greater than or equal to startDate',
    path: ['endDate']
});
exports.activatePlanSchema = zod_1.z.object({
    id: zod_1.z.string().min(1)
});
