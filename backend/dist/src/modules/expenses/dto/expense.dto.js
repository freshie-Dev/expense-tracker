"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseListQuerySchema = exports.updateExpenseSchema = exports.createExpenseSchema = void 0;
const zod_1 = require("zod");
exports.createExpenseSchema = zod_1.z.object({
    categoryId: zod_1.z.string().min(1),
    amount: zod_1.z.number().positive(),
    date: zod_1.z.string().date(),
    description: zod_1.z.string().trim().max(240).optional().default('')
});
exports.updateExpenseSchema = zod_1.z
    .object({
    categoryId: zod_1.z.string().min(1).optional(),
    amount: zod_1.z.number().positive().optional(),
    date: zod_1.z.string().date().optional(),
    description: zod_1.z.string().trim().max(240).optional()
})
    .refine((x) => Object.keys(x).length > 0, {
    message: 'At least one field must be provided'
});
exports.expenseListQuerySchema = zod_1.z.object({
    categoryId: zod_1.z.string().optional(),
    startDate: zod_1.z.string().date().optional(),
    endDate: zod_1.z.string().date().optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20)
});
