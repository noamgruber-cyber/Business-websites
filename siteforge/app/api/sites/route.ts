import { createSiteRequestSchema } from '@/lib/siteSchemas';
import { apiFailure, apiSuccess } from '@/lib/server/session';
import { operationKey, readJson, siteIdentity } from '@/lib/server/siteApi';
import { createSiteService } from '@/lib/server/sites';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const uid = await siteIdentity(request, true);
    const key = operationKey(request);
    const input = await readJson(request, createSiteRequestSchema);
    return apiSuccess({ site: await createSiteService().create(uid, input, key) }, 201);
  } catch (error) { return apiFailure(error); }
}
export async function GET(request: Request) {
  try { const uid = await siteIdentity(request); return apiSuccess({ sites: await createSiteService().list(uid) }); }
  catch (error) { return apiFailure(error); }
}
