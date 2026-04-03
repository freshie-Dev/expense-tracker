import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { errorResponse } from '../responses/api-response';
import { AppError } from '../exceptions/app-error';
import { logger } from '../utils/logger';

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json(
    errorResponse('Resource not found', [{ code: 'NOT_FOUND', detail: 'Endpoint does not exist' }])
  );
}

export function globalErrorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    res.status(400).json(
      errorResponse(
        'Validation failed',
        err.issues.map((i) => ({
          code: 'VALIDATION_ERROR',
          field: i.path.join('.'),
          detail: i.message
        }))
      )
    );
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json(
      errorResponse(err.message, [
        {
          code: err.code,
          field: err.field,
          detail: err.details ?? err.message
        }
      ])
    );
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json(
      errorResponse('Invalid identifier format', [
        { code: 'INVALID_OBJECT_ID', field: err.path, detail: 'Provided ID is not valid' }
      ])
    );
    return;
  }

  logger.error({ err }, 'Unhandled server error');
  res.status(500).json(
    errorResponse('Internal server error', [
      { code: 'INTERNAL_SERVER_ERROR', detail: 'Unexpected error occurred' }
    ])
  );
}

