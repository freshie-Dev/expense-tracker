import type { ApiErrorItem, ApiResponseEnvelope } from '../interfaces/api-response.interface';

export function successResponse<T>(
  message: string,
  data: T,
  meta: Record<string, unknown> = {}
): ApiResponseEnvelope<T> {
  return {
    success: true,
    message,
    data,
    errors: [],
    meta
  };
}

export function errorResponse(
  message: string,
  errors: ApiErrorItem[] = [],
  meta: Record<string, unknown> = {}
): ApiResponseEnvelope<null> {
  return {
    success: false,
    message,
    data: null,
    errors,
    meta
  };
}

