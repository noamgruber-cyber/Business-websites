import { saveDraftRequestSchema } from '@/lib/siteSchemas';
import { apiFailure, apiSuccess } from '@/lib/server/session';
import { readJson, siteIdentity } from '@/lib/server/siteApi';
import { createSiteService } from '@/lib/server/sites';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const uid = await siteIdentity(request, true);
    const input = await readJson(request, saveDraftRequestSchema);
    return apiSuccess({ site: await createSiteService().saveDraft(uid, (await context.params).id, input) });
  } catch (error) { return apiFailure(error); }
}
