export interface ApiErrorItem {
  code: string;
  field?: string;
  detail: string;
}

export interface ApiResponseEnvelope<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: ApiErrorItem[];
  meta: Record<string, unknown>;
}
