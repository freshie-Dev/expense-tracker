export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly field?: string;
  readonly details?: string;

  constructor(params: {
    message: string;
    statusCode: number;
    code: string;
    field?: string;
    details?: string;
  }) {
    super(params.message);
    this.statusCode = params.statusCode;
    this.code = params.code;
    this.field = params.field;
    this.details = params.details;
  }
}

