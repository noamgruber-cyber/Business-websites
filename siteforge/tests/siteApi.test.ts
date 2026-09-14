import { afterEach, describe, expect, it, vi } from 'vitest';
import { readJson, siteIdentity } from '@/lib/server/siteApi';
import { createSiteRequestSchema } from '@/lib/siteSchemas';
afterEach(() => vi.unstubAllEnvs());
describe('private API request boundary', () => {
  it('defaults to disabled before credentials or data are accessed', async () => {
    vi.stubEnv('SITE_AUTOMATION_ENABLED', 'false');
    await expect(siteIdentity(new Request('https://example.test/api/sites'))).rejects.toMatchObject({ status: 503 });
  });
  it('rejects foreign origin before authentication', async () => {
    vi.stubEnv('SITE_AUTOMATION_ENABLED', 'true');
    await expect(siteIdentity(new Request('https://example.test/api/sites', { headers: { origin: 'https://other.test' } }), true)).rejects.toMatchObject({ status: 403 });
  });
  it('counts streamed bytes even without Content-Length', async () => {
    const request = new Request('https://example.test/api/sites', { method: 'POST', headers: { 'content-type': 'application/json' }, body: ' '.repeat(65537) });
    await expect(readJson(request, createSiteRequestSchema)).rejects.toMatchObject({ status: 413 });
  });
  it('rejects invalid JSON and unknown fields', async () => {
    for (const body of ['{', JSON.stringify({ category: 'gym', language: 'en', ownerUid: 'forged' })]) {
      await expect(readJson(new Request('https://example.test/api/sites', { method: 'POST', headers: { 'content-type': 'application/json' }, body }), createSiteRequestSchema)).rejects.toMatchObject({ status: 400 });
    }
  });
});
