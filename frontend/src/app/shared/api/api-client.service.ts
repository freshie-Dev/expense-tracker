import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiBusinessError } from './api-business.error';
import type { ApiResponseEnvelope } from './api-response.model';

@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  private unwrapSuccess<T>(body: ApiResponseEnvelope<T>): { data: T; meta: Record<string, unknown> } {
    if (!body.success) {
      throw new ApiBusinessError(body.message, body.errors, 400);
    }
    return { data: body.data as T, meta: body.meta ?? {} };
  }

  private async handle<T>(promise: Promise<ApiResponseEnvelope<T>>): Promise<{
    data: T;
    meta: Record<string, unknown>;
  }> {
    try {
      const body = await promise;
      return this.unwrapSuccess(body);
    } catch (err: unknown) {
      if (err instanceof HttpErrorResponse) {
        const e = err.error;
        if (
          e &&
          typeof e === 'object' &&
          'success' in e &&
          (e as ApiResponseEnvelope<null>).success === false
        ) {
          const env = e as ApiResponseEnvelope<null>;
          throw new ApiBusinessError(env.message, env.errors, err.status);
        }
        const msg =
          typeof e === 'string' && e.length > 0 ? e : err.message || 'Network error';
        throw new ApiBusinessError(msg, [], err.status);
      }
      throw err;
    }
  }

  get<T>(path: string): Promise<{ data: T; meta: Record<string, unknown> }> {
    return this.handle(
      firstValueFrom(this.http.get<ApiResponseEnvelope<T>>(`${this.baseUrl}${path}`))
    );
  }

  post<T>(path: string, body: unknown): Promise<{ data: T; meta: Record<string, unknown> }> {
    return this.handle(
      firstValueFrom(this.http.post<ApiResponseEnvelope<T>>(`${this.baseUrl}${path}`, body))
    );
  }

  patch<T>(path: string, body: unknown): Promise<{ data: T; meta: Record<string, unknown> }> {
    return this.handle(
      firstValueFrom(this.http.patch<ApiResponseEnvelope<T>>(`${this.baseUrl}${path}`, body))
    );
  }

  delete<T>(path: string): Promise<{ data: T; meta: Record<string, unknown> }> {
    return this.handle(
      firstValueFrom(this.http.delete<ApiResponseEnvelope<T>>(`${this.baseUrl}${path}`))
    );
  }
}
