import { createHash, randomUUID } from 'node:crypto';
import { Timestamp, type Firestore, type DocumentData } from 'firebase-admin/firestore';
import type { IntakeV1, SiteRecord } from '../siteContracts';
import { createSiteRequestSchema, DAYS, saveDraftRequestSchema } from '../siteSchemas';
import { getAdminFirestore } from './firebaseAdmin';
import { SessionError } from './session';
import { parseInput, siteId } from './siteApi';

const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const iso = (value: Timestamp) => value.toDate().toISOString();
const notFound = () => new SessionError('NOT_FOUND', 404, 'Site not found');
const active = (state: string) => ['queued', 'generating', 'validating'].includes(state);

export function serializeSite(data: DocumentData): SiteRecord {
  return {
    id: data.id, ownerUid: data.ownerUid, draftRevision: data.draftRevision,
    draft: data.draft, latestVersionId: data.latestVersionId,
    publishedVersionId: data.publishedVersionId, publicationRevision: data.publicationRevision,
    activeJobId: data.activeJobId, slug: data.slug, suspended: data.suspended,
    deletedAt: data.deletedAt ? iso(data.deletedAt) : null,
    createdAt: iso(data.createdAt), updatedAt: iso(data.updatedAt),
  };
}

function owned(data: DocumentData | undefined, uid: string, mutation = false): DocumentData {
  if (!data || data.ownerUid !== uid || data.deletedAt || (mutation && data.suspended)) throw notFound();
  return data;
}

export function blankDraft(category: IntakeV1['facts']['category'], language: IntakeV1['facts']['language']): IntakeV1 {
  return {
    schemaVersion: 1, style: 'auto', imageAssetIds: [], rightsConfirmed: false,
    facts: {
      businessName: '', category, language, description: '', services: [],
      phone: null, whatsapp: null, email: null, address: null, city: null,
      instagramUrl: null, facebookUrl: null,
      openingHours: DAYS.map(day => ({ day, value: null })),
    },
  };
}

export function createSiteService(db: Firestore = getAdminFirestore(), clock = () => Timestamp.now()) {
  return {
    async create(uid: string, input: unknown, key: string): Promise<SiteRecord> {
      const { category, language } = parseInput(createSiteRequestSchema, input);
      if (!/^[\x21-\x7e]{1,128}$/.test(key)) throw new SessionError('INVALID_INPUT', 400, 'Invalid operation key');
      const payloadHash = hash({ category, language });
      const operation = db.doc(`operationKeys/${hash([uid, 'POST /api/sites', key])}`);
      const account = db.doc(`ownerAccounts/${uid}`);
      const id = randomUUID();
      return db.runTransaction(async tx => {
        const [existing, owner] = await tx.getAll(operation, account);
        if (existing.exists) {
          if (existing.get('payloadHash') !== payloadHash) throw new SessionError('IDEMPOTENCY_CONFLICT', 409, 'Key already used with different input');
          return existing.get('response') as SiteRecord;
        }
        if (owner.get('siteId')) throw new SessionError('LIMIT_REACHED', 429, 'One site per account during the pilot');
        const now = clock();
        const data = {
          id, ownerUid: uid, draftRevision: 0, draft: blankDraft(category, language),
          latestVersionId: null, publishedVersionId: null, publicationRevision: 0,
          activeJobId: null, slug: null, suspended: false, deletedAt: null,
          createdAt: now, updatedAt: now,
        };
        const response = serializeSite(data);
        tx.create(db.doc(`sites/${id}`), data);
        tx.set(account, { siteId: id, updatedAt: now });
        tx.create(operation, { ownerUid: uid, route: 'POST /api/sites', key, payloadHash, response, createdAt: now });
        return response;
      });
    },

    async list(uid: string): Promise<SiteRecord[]> {
      const result = await db.collection('sites').where('ownerUid', '==', uid).orderBy('updatedAt', 'desc').limit(50).get();
      return result.docs.filter(doc => !doc.get('deletedAt')).map(doc => serializeSite(doc.data()));
    },

    async get(uid: string, id: string) {
      const ref = db.doc(`sites/${siteId(id)}`);
      return db.runTransaction(async tx => {
        const data = owned((await tx.get(ref)).data(), uid);
        const versions = await tx.get(ref.collection('versions').orderBy('createdAt', 'desc').limit(20));
        const job = data.activeJobId ? (await tx.get(db.doc(`generationJobs/${data.activeJobId}`))).data() : null;
        return {
          site: serializeSite(data),
          versions: versions.docs.map(doc => {
            const v = doc.data();
            return { id: doc.id, siteId: id, sourceRevision: v.sourceRevision, blueprint: v.blueprint,
              source: v.source, parentVersionId: v.parentVersionId, qa: v.qa,
              rendererVersion: v.rendererVersion, createdAt: iso(v.createdAt) };
          }),
          job: job && job.ownerUid === uid && job.siteId === id ? {
            id: job.id, state: job.state, sourceRevision: job.sourceRevision,
            resultVersionId: job.resultVersionId, errorCode: job.errorCode,
          } : null,
        };
      });
    },

    async saveDraft(uid: string, id: string, input: unknown): Promise<SiteRecord> {
      const { expectedRevision, intake } = parseInput(saveDraftRequestSchema, input);
      const ref = db.doc(`sites/${siteId(id)}`);
      return db.runTransaction(async tx => {
        const data = owned((await tx.get(ref)).data(), uid, true);
        if (data.draftRevision !== expectedRevision) throw new SessionError('REVISION_CONFLICT', 409, 'Draft changed; reload before saving');
        if (data.activeJobId) {
          const job = await tx.get(db.doc(`generationJobs/${data.activeJobId}`));
          if (!job.exists || active(job.get('state'))) throw new SessionError('JOB_ACTIVE', 409, 'Cancel generation before editing');
        }
        if (intake.imageAssetIds.length) {
          const assets = await tx.getAll(...intake.imageAssetIds.map(id => db.doc(`assets/${id}`)));
          if (assets.some(a => !a.exists || a.get('ownerUid') !== uid || a.get('siteId') !== id || a.get('status') !== 'ready')) {
            throw new SessionError('INVALID_INPUT', 400, 'Images must be ready and belong to this site');
          }
          if (!intake.rightsConfirmed) throw new SessionError('INVALID_INPUT', 400, 'Confirm image rights');
        }
        const updated = { ...data, draft: intake, draftRevision: expectedRevision + 1, activeJobId: null, updatedAt: clock() };
        tx.update(ref, { draft: intake, draftRevision: updated.draftRevision, activeJobId: null, updatedAt: updated.updatedAt });
        return serializeSite(updated);
      });
    },

    async remove(uid: string, id: string, expectedPublicationRevision: number) {
      const ref = db.doc(`sites/${siteId(id)}`);
      if (!Number.isSafeInteger(expectedPublicationRevision) || expectedPublicationRevision < 0) throw new SessionError('INVALID_INPUT', 400, 'Invalid revision');
      return db.runTransaction(async tx => {
        const data = owned((await tx.get(ref)).data(), uid, true);
        if (data.publicationRevision !== expectedPublicationRevision) throw new SessionError('REVISION_CONFLICT', 409, 'Publication changed; reload');
        const jobRef = data.activeJobId ? db.doc(`generationJobs/${data.activeJobId}`) : null;
        const job = jobRef ? await tx.get(jobRef) : null;
        const now = clock();
        if (jobRef && job?.exists && active(job.get('state'))) tx.update(jobRef, { state: 'cancelled', leaseToken: null, leaseExpiresAt: null, updatedAt: now });
        if (data.slug) tx.delete(db.doc(`publicSites/${data.slug}`));
        tx.update(ref, { deletedAt: now, updatedAt: now, publishedVersionId: null, activeJobId: null, publicationRevision: expectedPublicationRevision + 1 });
        // Keep account/slug reservations until delayed cleanup, preventing premature reuse.
        return { publicationRevision: expectedPublicationRevision + 1 };
      });
    },
  };
}
