import type { ApiErrorItem } from './api-response.model';

export class ApiBusinessError extends Error {
  readonly errors: ApiErrorItem[];
  readonly httpStatus: number;

  constructor(message: string, errors: ApiErrorItem[] = [], httpStatus = 400) {
    super(message);
    this.name = 'ApiBusinessError';
    this.errors = errors;
    this.httpStatus = httpStatus;
  }
}
