"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    planId: zod_1.z.string().min(1),
    name: zod_1.z.string().trim().min(1).max(80),
    allocatedAmount: zod_1.z.number().positive()
});
exports.updateCategorySchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(1).max(80).optional(),
    allocatedAmount: zod_1.z.number().positive().optional()
})
    .refine((x) => x.name !== undefined || x.allocatedAmount !== undefined, {
    message: 'At least one field must be provided'
});
