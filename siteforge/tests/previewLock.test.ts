import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '../proxy';
afterEach(() => vi.unstubAllEnvs());
describe('hosted preview setup lock', () => {
  it('closes pages, APIs and assets before preview setup is complete', () => {
    vi.stubEnv('VERCEL_ENV', 'preview');
    vi.stubEnv('SITEFORGE_PREVIEW_UNLOCKED', undefined);
    for (const path of ['/', '/api/sites', '/_next/static/test.js', '/studio']) {
      const response = proxy(new NextRequest(`https://example.test${path}`));
      expect(response.status).toBe(503);
      expect(response.headers.get('cache-control')).toContain('no-store');
    }
  });
  it('preserves local and production routing', () => {
    for (const environment of ['development', 'production']) {
      vi.stubEnv('VERCEL_ENV', environment);
      expect(proxy(new NextRequest('https://example.test/')).status).toBe(200);
      expect(proxy(new NextRequest('https://example.test/dashboard')).status).toBe(307);
    }
  });
  it('requires the exact unlock value and retains owner route hints afterwards', () => {
    vi.stubEnv('VERCEL_ENV', 'preview');
    vi.stubEnv('SITEFORGE_PREVIEW_UNLOCKED', 'TRUE');
    expect(proxy(new NextRequest('https://example.test/')).status).toBe(503);
    vi.stubEnv('SITEFORGE_PREVIEW_UNLOCKED', 'true');
    expect(proxy(new NextRequest('https://example.test/')).status).toBe(200);
    expect(proxy(new NextRequest('https://example.test/studio')).status).toBe(307);
  });
});
