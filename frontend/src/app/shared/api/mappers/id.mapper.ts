/** Normalize Mongo / JSON `_id` to string */
export function idOf(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && '$oid' in value) {
    return String((value as { $oid: string }).$oid);
  }
  return String(value);
}

export function toIsoDateString(value: unknown): string {
  if (typeof value === 'string') {
    return value.length >= 10 ? value.slice(0, 10) : value;
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return '';
}
