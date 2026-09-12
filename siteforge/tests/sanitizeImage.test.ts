import { describe, it, expect } from 'vitest';
import sharp from 'sharp';
import { sanitizeImage } from '@/lib/server/sanitizeImage';
describe('image sanitation', () => {
  it('decodes a JPEG, strips metadata and produces bounded WebP', async () => {
    const jpeg = await sharp({ create: { width: 24, height: 12, channels: 3, background: '#ff0000' } }).withMetadata().jpeg().toBuffer();
    const result = await sanitizeImage(jpeg, 'image/jpeg');
    expect(result.width).toBe(24); expect(result.height).toBe(12);
    const meta = await sharp(result.buffer).metadata();
    expect(meta.format).toBe('webp'); expect(meta.exif).toBeUndefined(); expect(meta.icc).toBeUndefined();
  });
  it('rejects corrupt content, oversized files, SVG and disguised MIME', async () => {
    const png = await sharp({ create: { width: 2, height: 2, channels: 3, background: 'red' } }).png().toBuffer();
    for (const [buffer, mime] of [[Buffer.from('invalid'), 'image/jpeg'], [Buffer.alloc(3 * 1024 * 1024 + 1), 'image/png'], [Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"/>'), 'image/png'], [png, 'image/jpeg']] as const) {
      await expect(sanitizeImage(buffer, mime)).rejects.toMatchObject({ code: 'UPLOAD_REJECTED' });
    }
  });
  it('rejects decoded images over the pixel limit', async () => {
    const big = await sharp({ create: { width: 5000, height: 4001, channels: 3, background: 'white' } }).png().toBuffer();
    await expect(sanitizeImage(big, 'image/png')).rejects.toMatchObject({ code: 'UPLOAD_REJECTED' });
  });
});
