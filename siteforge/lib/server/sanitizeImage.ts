import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { SessionError } from './session';
const MAX_BYTES = 3 * 1024 * 1024;
export async function sanitizeImage(bytes: Buffer, announcedMime: string) {
  const reject = () => new SessionError('UPLOAD_REJECTED', 400, 'Use a valid nonanimated JPEG, PNG or WebP up to 3 MiB and 20 megapixels');
  if (!bytes.length || bytes.length > MAX_BYTES) throw reject();
  try {
    const options = { limitInputPixels: 20_000_000, failOn: 'warning' as const, animated: true };
    const metadata = await sharp(bytes, options).metadata();
    const formats: Record<string, string> = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
    const mime = formats[metadata.format ?? ''];
    if (!mime || mime !== announcedMime || (metadata.pages ?? 1) !== 1 || !metadata.width || !metadata.height || metadata.width * metadata.height > 20_000_000) throw reject();
    const result = await sharp(bytes, options).rotate().resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toBuffer({ resolveWithObject: true });
    if (result.data.length > MAX_BYTES) throw reject();
    return { buffer: result.data, mime: 'image/webp' as const, bytes: result.data.length,
      width: result.info.width, height: result.info.height,
      sha256: createHash('sha256').update(result.data).digest('hex') };
  } catch (error) {
    if (error instanceof SessionError) throw error;
    throw reject();
  }
}
