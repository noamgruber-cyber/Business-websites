import { generateRequestSchema } from '@/lib/siteSchemas';
import { apiFailure, apiSuccess } from '@/lib/server/session';
import { operationKey, readJson, siteIdentity } from '@/lib/server/siteApi';
import { createJobService } from '@/lib/server/jobs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const uid = await siteIdentity(request, true);
    const key = operationKey(request);
    const input = await readJson(request, generateRequestSchema);
    return apiSuccess(await createJobService().enqueue(uid, (await context.params).id, input, key), 202);
  } catch (error) { return apiFailure(error); }
}
