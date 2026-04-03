"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const hpp_1 = __importDefault(require("hpp"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const pino_http_1 = __importDefault(require("pino-http"));
const app_config_1 = require("./config/app.config");
const swagger_config_1 = require("./config/swagger.config");
const mongodb_module_1 = require("./database/mongodb.module");
const logger_1 = require("./common/utils/logger");
const error_handler_1 = require("./common/filters/error-handler");
const app_module_1 = require("./app.module");
/**
 * Express 5 exposes `req.query` as getter-only; the default express-mongo-sanitize
 * middleware assigns `req.query = …` and throws. Sanitize body/params only; validate
 * query in route handlers (Zod).
 */
function mongoSanitizeExpress5(req, _res, next) {
    const sanitize = express_mongo_sanitize_1.default.sanitize;
    if (req.body && typeof req.body === 'object') {
        req.body = sanitize(req.body);
    }
    if (req.params && typeof req.params === 'object') {
        req.params = sanitize(req.params);
    }
    next();
}
async function bootstrap() {
    await (0, mongodb_module_1.connectMongo)();
    const app = (0, express_1.default)();
    app.use((0, pino_http_1.default)({
        logger: logger_1.logger,
        customSuccessMessage(req, res) {
            return `${req.method} ${req.url} completed with ${res.statusCode}`;
        }
    }));
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: app_config_1.appConfig.CORS_ORIGIN.split(',').map((o) => o.trim()),
        credentials: false
    }));
    if (app_config_1.appConfig.NODE_ENV !== 'development') {
        app.use((0, express_rate_limit_1.default)({
            windowMs: app_config_1.appConfig.RATE_LIMIT_WINDOW_MS,
            max: app_config_1.appConfig.RATE_LIMIT_MAX,
            standardHeaders: true,
            legacyHeaders: false
        }));
    }
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ extended: false, limit: '1mb' }));
    app.use(mongoSanitizeExpress5);
    app.use((0, hpp_1.default)());
    const { settingsService, apiRouter } = (0, app_module_1.createAppModule)();
    await settingsService.bootstrapDefaults();
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerDocument));
    app.use('/api', apiRouter);
    app.use(error_handler_1.notFoundHandler);
    app.use(error_handler_1.globalErrorHandler);
    app.listen(app_config_1.appConfig.PORT, () => {
        logger_1.logger.info({ port: app_config_1.appConfig.PORT, env: app_config_1.appConfig.NODE_ENV }, `Budget Tracker API running on http://localhost:${app_config_1.appConfig.PORT}`);
    });
}
bootstrap().catch((err) => {
    logger_1.logger.error({ err }, 'Failed to bootstrap application');
    process.exit(1);
});
