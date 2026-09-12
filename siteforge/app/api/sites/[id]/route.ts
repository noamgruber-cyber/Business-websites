import { deleteSiteRequestSchema } from '@/lib/siteSchemas';
import { apiFailure, apiSuccess } from '@/lib/server/session';
import { readJson, siteIdentity } from '@/lib/server/siteApi';
import { createSiteService } from '@/lib/server/sites';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, context: Context) {
  try {
    const uid = await siteIdentity(request);
    return apiSuccess(await createSiteService().get(uid, (await context.params).id));
  } catch (error) { return apiFailure(error); }
}
export async function DELETE(request: Request, context: Context) {
  try {
    const uid = await siteIdentity(request, true);
    const input = await readJson(request, deleteSiteRequestSchema);
    return apiSuccess(await createSiteService().remove(uid, (await context.params).id, input.expectedPublicationRevision), 202);
  } catch (error) { return apiFailure(error); }
}
