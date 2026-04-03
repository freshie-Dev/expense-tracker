import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

export function validateBody<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);
    next();
  };
}

export function validateQuery<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
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

