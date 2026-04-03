"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = validateEnv;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().int().min(1).max(65535).default(5000),
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    MONGO_URI: zod_1.z.string().min(1, 'MONGO_URI is required'),
    CORS_ORIGIN: zod_1.z.string().min(1).default('http://localhost:4200'),
    OVESPENDING_MODE: zod_1.z.enum(['block', 'warn']).default('warn'),
    RATE_LIMIT_WINDOW_MS: zod_1.z.coerce.number().int().min(1000).default(900000),
    RATE_LIMIT_MAX: zod_1.z.coerce.number().int().min(1).default(100)
});
function validateEnv(input) {
    const parsed = envSchema.safeParse(input);
    if (!parsed.success) {
        const messages = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
        throw new Error(`Environment validation failed: ${messages.join(', ')}`);
    }
    return parsed.data;
}
