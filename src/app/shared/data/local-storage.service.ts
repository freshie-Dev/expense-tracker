import { Injectable } from '@angular/core';

const APP_STORAGE_KEY = 'expense-tracker:v1';

export type StorageResult<T> =
  | { ok: true; value: T }
  | { ok: false; reason: 'missing' | 'invalid' | 'unavailable' };

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  readJson<T>(): StorageResult<T> {
    try {
      if (typeof localStorage === 'undefined') {
        return { ok: false, reason: 'unavailable' };
      }
      const raw = localStorage.getItem(APP_STORAGE_KEY);
      if (!raw) return { ok: false, reason: 'missing' };
      const parsed = JSON.parse(raw) as unknown;
      return { ok: true, value: parsed as T };
    } catch {
      return { ok: false, reason: 'invalid' };
    }
  }

  writeJson<T>(value: T): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(value));
  }

  clear(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(APP_STORAGE_KEY);
  }
}

