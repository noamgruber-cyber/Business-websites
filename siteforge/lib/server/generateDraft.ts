import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import type { Response, ResponseCreateParamsNonStreaming } from 'openai/resources/responses/responses';
import sharp from 'sharp';
import { generatedDraftSchema, generatedDraftSchemaFor, intakeGenerationSchema } from '../siteSchemas';
import { templateConfigs } from '../templateConfigs';
import { SITE_DRAFT_INSTRUCTIONS, SITE_DRAFT_PROMPT_VERSION } from '../prompts/siteDraftV1';
import { parseInput } from './siteApi';
import { SessionError } from './session';
import type { IntakeV1 } from '../siteContracts';

type Image = { assetId: string; dataUrl: string };
type ProviderResponse = Pick<Response, 'id' | 'status' | 'output' | 'output_text' | 'usage'>;
type Provider = (request: ResponseCreateParamsNonStreaming) => Promise<ProviderResponse>;

// Injected provider exists for deterministic tests; production uses the guarded wrapper below.
export function createDraftGenerator(provider: Provider, model: string) {
  return async (input: IntakeV1, images: Image[]) => {
    if (!model.trim()) throw new SessionError('SERVICE_UNAVAILABLE', 503, 'Generation model is not configured');
    const intake = parseInput(intakeGenerationSchema, input);
    if (images.length > 6 || new Set(images.map(i => i.assetId)).size !== images.length) throw new SessionError('INVALID_INPUT', 400, 'Too many or duplicate generation images');
    for (const image of images) {
      if (!intake.imageAssetIds.includes(image.assetId) || !/^data:image\/webp;base64,[A-Za-z0-9+/]+=*$/.test(image.dataUrl) || image.dataUrl.length > 1_400_000) throw new SessionError('INVALID_INPUT', 400, 'Invalid generation image');
      const metadata = await sharp(Buffer.from(image.dataUrl.split(',')[1], 'base64'), { limitInputPixels: 768 * 768 }).metadata();
      if (metadata.format !== 'webp' || !metadata.width || !metadata.height || metadata.width > 768 || metadata.height > 768 || (metadata.pages ?? 1) > 1 || metadata.exif || metadata.icc || metadata.xmp) throw new SessionError('INVALID_INPUT', 400, 'Generation images must be sanitized derivatives');
    }
    const templates = templateConfigs.filter(t => t.category === intake.facts.category && !t.isPremium).map(t => t.id);
    const response = await provider({
      model, stream: false, store: false, max_output_tokens: 4000,
      instructions: SITE_DRAFT_INSTRUCTIONS,
      tools: [],
      input: [{ role: 'user', content: [
        { type: 'input_text', text: JSON.stringify({ intake, availableTemplateIds: templates }) },
        ...images.flatMap(image => [
          { type: 'input_text' as const, text: JSON.stringify({ assetId: image.assetId }) },
          { type: 'input_image' as const, image_url: image.dataUrl, detail: 'low' as const },
        ]),
      ] }],
      text: { format: zodTextFormat(generatedDraftSchema, 'site_draft') },
    });
    if (response.status !== 'completed') throw new SessionError('GENERATION_FAILED', 422, 'Generation did not complete');
    if (response.output.some(item => item.type === 'message' && item.content.some(c => c.type === 'refusal'))) throw new SessionError('GENERATION_FAILED', 422, 'Generation declined; review your business details');
    let draft: unknown;
    try { draft = JSON.parse(response.output_text); }
    catch { throw new SessionError('GENERATION_FAILED', 422, 'Generation returned invalid JSON'); }
    const parsed = generatedDraftSchemaFor(intake).safeParse(draft);
    if (!parsed.success) throw new SessionError('GENERATION_FAILED', 422, 'Generated draft failed validation');
    return { draft: parsed.data, providerResponseId: response.id, model, promptVersion: SITE_DRAFT_PROMPT_VERSION,
      usage: { inputTokens: response.usage?.input_tokens ?? 0, outputTokens: response.usage?.output_tokens ?? 0, estimatedCostUsd: null } };
  };
}

export async function generateDraft(input: IntakeV1, images: Image[]) {
  if (process.env.AI_GENERATION_ENABLED !== 'true' || !process.env.OPENAI_MODEL || !process.env.OPENAI_API_KEY) throw new SessionError('SERVICE_UNAVAILABLE', 503, 'AI generation is not configured');
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 90_000, maxRetries: 0 });
  // The future worker must persist call admission before invoking this function.
  return createDraftGenerator(request => client.responses.create(request), process.env.OPENAI_MODEL)(input, images);
}
