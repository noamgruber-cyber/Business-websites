import busboy from 'busboy';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import type { ReadableStream as NodeReadableStream } from 'node:stream/web';
import { z } from 'zod';
import { imageMimeSchema } from '../siteSchemas';
import { SessionError } from './session';

export const MAX_UPLOAD_BODY_BYTES = Math.floor(3.25 * 1024 * 1024);
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

// Call only after server session verification. Provider operations happen later.
export async function readImageUpload(request: Request) {
  const reject = (message: string, status = 400) => new SessionError('UPLOAD_REJECTED', status, message);
  if (!request.body) throw reject('Image upload body is required');
  const contentType = request.headers.get('content-type');
  if (!contentType?.toLowerCase().startsWith('multipart/form-data;')) throw reject('Send multipart/form-data', 415);
  let parser: ReturnType<typeof busboy>;
  try {
    parser = busboy({ headers: { 'content-type': contentType }, limits: {
      fileSize: MAX_IMAGE_BYTES, files: 1, fields: 2, parts: 4,
      fieldNameSize: 20, fieldSize: 100, headerPairs: 50,
    } });
  } catch { throw reject('Invalid multipart boundary'); }
  const source = Readable.fromWeb(request.body as NodeReadableStream<Uint8Array>);
  let bytes = 0;
  const bounded = new Transform({ transform(chunk: Buffer, _encoding, callback) {
    bytes += chunk.length;
    if (bytes > MAX_UPLOAD_BODY_BYTES) callback(reject('Upload exceeds 3.25 MiB', 413));
    else callback(null, chunk);
  } });
  const fields = new Map<string, string>();
  const chunks: Buffer[] = [];
  let fileName: string | undefined;
  let mime: string | undefined;
  let failure: SessionError | undefined;
  function fail(error: SessionError) {
    failure ??= error;
    // pipeline propagates parser errors and cancels the request stream.
    parser.destroy(error);
  }
  parser.on('field', (name, value, info) => {
    if (!['siteId', 'assetId'].includes(name) || fields.has(name) || info.nameTruncated || info.valueTruncated) {
      fail(reject('Unexpected, duplicate or oversized upload field')); return;
    }
    fields.set(name, value);
  });
  parser.on('file', (name, file, info) => {
    file.on('error', () => undefined);
    if (name !== 'file' || fileName !== undefined || !info.filename || info.filename.length > 255 || !imageMimeSchema.safeParse(info.mimeType).success) {
      file.resume(); fail(reject('Upload one JPEG, PNG or WebP image in the file field')); return;
    }
    fileName = info.filename; mime = info.mimeType;
    file.on('limit', () => fail(reject('Image exceeds 3 MiB', 413)));
    file.on('data', (chunk: Buffer) => chunks.push(chunk));
  });
  for (const event of ['partsLimit', 'filesLimit', 'fieldsLimit'] as const) parser.on(event, () => fail(reject('Too many upload fields or files')));
  try { await pipeline(source, bounded, parser); }
  catch (error) {
    if (failure) throw failure;
    if (error instanceof SessionError) throw error;
    throw reject('Incomplete or malformed image upload');
  }
  const siteId = fields.get('siteId'), assetId = fields.get('assetId');
  if (!z.uuid().safeParse(siteId).success || !z.uuid().safeParse(assetId).success || !fileName || !mime || chunks.length === 0) throw reject('Provide siteId, assetId and a nonempty image');
  return { siteId: siteId!, assetId: assetId!, fileName, mime: imageMimeSchema.parse(mime), buffer: Buffer.concat(chunks) };
}
