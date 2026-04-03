"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
exports.validateQuery = validateQuery;
function validateBody(schema) {
    return (req, _res, next) => {
        req.body = schema.parse(req.body);
        next();
    };
}
function validateQuery(schema) {
    return (req, _res, next) => {
        const parsed = schema.parse(req.query);
        // Express 5: `req.query` has no setter; define own property so handlers see parsed/coerced values.
        Object.defineProperty(req, 'query', {
            value: parsed,
            writable: true,
            enumerable: true,
            configurable: true
        });
        next();
    };
}
