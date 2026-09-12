import { reserveAssetRequestSchema } from '@/lib/siteSchemas';
import { apiFailure, apiSuccess } from '@/lib/server/session';
import { readJson, siteIdentity, operationKey } from '@/lib/server/siteApi';
import { createAssetService } from '@/lib/server/assets';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const uid = await siteIdentity(request, true);
    const key = operationKey(request), input = await readJson(request, reserveAssetRequestSchema);
    return apiSuccess(await createAssetService().reserve(uid, (await context.params).id, input, key), 201);
  } catch (error) { return apiFailure(error); }
}
