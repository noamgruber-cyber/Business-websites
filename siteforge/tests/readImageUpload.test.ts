import { describe, it, expect } from 'vitest';
import { readImageUpload, MAX_UPLOAD_BODY_BYTES } from '@/lib/server/readImageUpload';
const siteId = crypto.randomUUID(), assetId = crypto.randomUUID();
function form(bytes = new Uint8Array([1, 2, 3]), mime = 'image/png') {
  const data = new FormData();
  data.set('siteId', siteId); data.set('assetId', assetId);
  data.set('file', new Blob([bytes], { type: mime }), 'image.png');
  return data;
}
async function request(body: FormData) {
  const encoded = new Request('https://example.test/api/upload', { method: 'POST', body });
  return new Request(encoded.url, { method: 'POST', headers: encoded.headers, body: await encoded.arrayBuffer() });
}
describe('bounded multipart ingestion', () => {
  it('reads expected IDs and bytes independent of part order', async () => {
    const data = form();
    const file = data.get('file')!;
    data.delete('file');
    const reversed = new FormData(); reversed.set('file', file); reversed.set('assetId', assetId); reversed.set('siteId', siteId);
    const result = await readImageUpload(await request(reversed));
    expect(result).toMatchObject({ siteId, assetId, mime: 'image/png' });
    expect([...result.buffer]).toEqual([1, 2, 3]);
  });
  it('rejects oversized image content', async () => {
    await expect(readImageUpload(await request(form(new Uint8Array(3 * 1024 * 1024 + 1))))).rejects.toMatchObject({ status: 413 });
  });
  it('rejects total body overflow without trusting Content-Length', async () => {
    const body = '--x\r\nContent-Disposition: form-data; name="siteId"\r\n\r\n' + 'a'.repeat(MAX_UPLOAD_BODY_BYTES + 1);
    await expect(readImageUpload(new Request('https://example.test/api/upload', { method: 'POST', headers: { 'content-type': 'multipart/form-data; boundary=x', 'content-length': '1' }, body }))).rejects.toMatchObject({ status: 413 });
  });
  it('rejects wrong MIME, duplicate fields, missing IDs and multiple files', async () => {
    const duplicate = form(); duplicate.append('siteId', siteId);
    const missing = form(); missing.delete('assetId');
    const multiple = form(); multiple.append('file', new Blob(['extra'], { type: 'image/png' }), 'extra.png');
    for (const data of [form(undefined, 'image/svg+xml'), duplicate, missing, multiple, form(new Uint8Array())]) {
      await expect(readImageUpload(await request(data))).rejects.toMatchObject({ code: 'UPLOAD_REJECTED' });
    }
  });
  it('rejects absent boundary and truncated multipart payloads', async () => {
    for (const [contentType, body] of [['multipart/form-data;', 'abc'], ['multipart/form-data; boundary=x', '--x\r\n']]) {
      await expect(readImageUpload(new Request('https://example.test/api/upload', { method: 'POST', headers: { 'content-type': contentType }, body }))).rejects.toMatchObject({ code: 'UPLOAD_REJECTED' });
    }
  });
});
