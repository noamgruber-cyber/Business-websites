import { z } from 'zod';
import { assertSameOrigin, createSessionService, SessionError } from './session';

export async function siteIdentity(request: Request, mutation = false) {
  if (process.env.SITE_AUTOMATION_ENABLED !== 'true') {
    throw new SessionError('SERVICE_UNAVAILABLE', 503, 'Site automation is not enabled');
  }
  if (mutation) assertSameOrigin(request);
  return (await createSessionService().verify(request)).uid;
}

export function parseInput<T>(schema: z.ZodType<T>, input: unknown): T {
  const parsed = schema.safeParse(input);
  if (!parsed.success) throw new SessionError('INVALID_INPUT', 400, 'Invalid request fields');
  return parsed.data;
}

export async function readJson<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    throw new SessionError('INVALID_INPUT', 415, 'Send application/json');
  }
  const reader = request.body?.getReader();
  if (!reader) throw new SessionError('INVALID_INPUT', 400, 'JSON body required');
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 65536) {
        await reader.cancel();
        throw new SessionError('INVALID_INPUT', 413, 'Request exceeds 64 KiB');
      }
      chunks.push(value);
    }
    let json: unknown;
    try { json = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { throw new SessionError('INVALID_INPUT', 400, 'Invalid JSON'); }
    return parseInput(schema, json);
  } finally { reader.releaseLock(); }
}

export function operationKey(request: Request) {
  const key = request.headers.get('idempotency-key');
  if (!key || !/^[\x21-\x7e]{1,128}$/.test(key)) {
    throw new SessionError('INVALID_INPUT', 400, 'Idempotency-Key is required (1-128 printable characters)');
  }
  return key;
}

export function siteId(value: string) {
  if (!z.uuid().safeParse(value).success) throw new SessionError('NOT_FOUND', 404, 'Site not found');
  return value;
}
