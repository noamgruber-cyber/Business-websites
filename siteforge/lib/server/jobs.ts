import { createHash, randomUUID } from 'node:crypto';
import { Timestamp, type Firestore } from 'firebase-admin/firestore';
import { getAdminFirestore } from './firebaseAdmin';
import { parseInput, siteId } from './siteApi';
import { generateRequestSchema, intakeGenerationSchema } from '../siteSchemas';
import { SessionError } from './session';

const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
type AdmissionConfig = { enabled: boolean; model: string; ownerDailyLimit: number; platformDailyLimit: number };
const runtimeConfig = (): AdmissionConfig => ({
  enabled: process.env.AI_GENERATION_ENABLED === 'true',
  model: process.env.OPENAI_MODEL ?? '', ownerDailyLimit: 3, platformDailyLimit: 20,
});

export function createJobService(db: Firestore = getAdminFirestore(), now = () => Date.now(), config = runtimeConfig()) {
  return {
    async enqueue(uid: string, id: string, input: unknown, key: string) {
      const parsed = parseInput(generateRequestSchema, input);
      if (!/^[\x21-\x7e]{1,128}$/.test(key)) throw new SessionError('INVALID_INPUT', 400, 'Invalid operation key');
      const site = db.doc(`sites/${siteId(id)}`);
      const operation = db.doc(`operationKeys/${hash([uid, id, 'generate', key])}`);
      const payloadHash = hash(parsed), jobId = randomUUID();
      return db.runTransaction(async tx => {
        const [siteSnap, replay] = await tx.getAll(site, operation);
        if (!siteSnap.exists || siteSnap.get('ownerUid') !== uid || siteSnap.get('deletedAt') || siteSnap.get('suspended')) throw new SessionError('NOT_FOUND', 404, 'Site not found');
        if (replay.exists) {
          if (replay.get('payloadHash') !== payloadHash) throw new SessionError('IDEMPOTENCY_CONFLICT', 409, 'Key already used');
          return replay.get('response') as { jobId: string; state: 'queued' };
        }
        if (!config.enabled || !config.model.trim() || ![config.ownerDailyLimit, config.platformDailyLimit].every(n => Number.isSafeInteger(n) && n > 0)) throw new SessionError('SERVICE_UNAVAILABLE', 503, 'Generation is not configured');
        if (siteSnap.get('activeJobId')) throw new SessionError('JOB_ACTIVE', 409, 'Generation already active');
        if (siteSnap.get('draftRevision') !== parsed.expectedRevision) throw new SessionError('REVISION_CONFLICT', 409, 'Draft changed');
        const intake = parseInput(intakeGenerationSchema, siteSnap.get('draft'));
        if (intake.imageAssetIds.length) {
          const assets = await tx.getAll(...intake.imageAssetIds.map(assetId => db.doc(`assets/${assetId}`)));
          if (assets.some(asset => !asset.exists || asset.get('ownerUid') !== uid || asset.get('siteId') !== id || asset.get('status') !== 'ready')) throw new SessionError('INVALID_INPUT', 400, 'Images must be ready and owned by this site');
        }
        const timestamp = Timestamp.fromMillis(now()), day = timestamp.toDate().toISOString().slice(0, 10);
        const ownerUsage = db.doc(`generationUsage/${uid}_${day}`), platformUsage = db.doc(`platformUsage/${day}`);
        const counters = await tx.getAll(ownerUsage, platformUsage);
        if (counters[0].get('admitted') >= config.ownerDailyLimit || counters[1].get('admitted') >= config.platformDailyLimit) throw new SessionError('LIMIT_REACHED', 429, 'Daily generation limit reached');
        const response = { jobId, state: 'queued' as const };
        tx.create(db.doc(`generationJobs/${jobId}`), {
          id: jobId, siteId: id, ownerUid: uid, sourceRevision: parsed.expectedRevision,
          inputSnapshot: intake, state: 'queued', attempt: 0, modelCallCount: 0,
          nextAttemptAt: timestamp, leaseToken: null, leaseExpiresAt: null,
          candidate: null, resultVersionId: null, providerResponseId: null,
          usage: { inputTokens: 0, outputTokens: 0, estimatedCostUsd: null },
          errorCode: null, createdAt: timestamp, updatedAt: timestamp,
        });
        counters.forEach(counter => tx.set(counter.ref, {
          admitted: (counter.get('admitted') ?? 0) + 1, modelCalls: counter.get('modelCalls') ?? 0,
          inputTokens: counter.get('inputTokens') ?? 0, outputTokens: counter.get('outputTokens') ?? 0,
        }));
        tx.update(site, { activeJobId: jobId, updatedAt: timestamp });
        tx.create(operation, { ownerUid: uid, route: `POST /api/sites/${id}/generate`, key, payloadHash, response, createdAt: timestamp });
        return response;
      });
    },
  };
}
