import { createHash, randomUUID } from 'node:crypto';
import { Timestamp, type Firestore } from 'firebase-admin/firestore';
import { getAdminFirestore } from './firebaseAdmin';
import { parseInput, siteId } from './siteApi';
import { reserveAssetRequestSchema } from '../siteSchemas';
import { SessionError } from './session';
const hash = (v: unknown) => createHash('sha256').update(JSON.stringify(v)).digest('hex');
export function createAssetService(db: Firestore = getAdminFirestore(), now = () => Date.now()) {
  return {
    async reserve(uid: string, id: string, input: unknown, key: string) {
      const parsed = parseInput(reserveAssetRequestSchema, input);
      if (!/^[\x21-\x7e]{1,128}$/.test(key)) throw new SessionError('INVALID_INPUT', 400, 'Invalid operation key');
      const site = db.doc(`sites/${siteId(id)}`);
      const operation = db.doc(`operationKeys/${hash([uid, id, 'reserveAsset', key])}`);
      const payloadHash = hash(parsed), assetId = randomUUID();
      return db.runTransaction(async tx => {
        const [siteSnap, replay] = await tx.getAll(site, operation);
        if (!siteSnap.exists || siteSnap.get('ownerUid') !== uid || siteSnap.get('deletedAt') || siteSnap.get('suspended')) throw new SessionError('NOT_FOUND', 404, 'Site not found');
        if (replay.exists) {
          if (replay.get('payloadHash') !== payloadHash) throw new SessionError('IDEMPOTENCY_CONFLICT', 409, 'Key already used');
          if (replay.get('expiresAt').toMillis() <= now()) throw new SessionError('UPLOAD_REJECTED', 409, 'Reservation expired; request a new slot');
          return replay.get('response') as { assetId: string };
        }
        if (siteSnap.get('activeJobId')) throw new SessionError('JOB_ACTIVE', 409, 'Cancel generation before uploading');
        const milliseconds = now(), createdAt = Timestamp.fromMillis(milliseconds);
        const expiresAt = Timestamp.fromMillis(milliseconds + 15 * 60 * 1000);
        const usageRef = db.doc(`uploadUsage/${uid}_${new Date(milliseconds).toISOString().slice(0, 13)}`);
        const usage = await tx.get(usageRef);
        const candidates = await tx.get(db.collection('assets').where('siteId', '==', id));
        const live = candidates.docs.filter(a => a.get('status') === 'ready' ||
          (a.get('status') === 'reserved' && a.get('reservationExpiresAt')?.toMillis() > milliseconds));
        const roles = live.filter(a => a.get('role') === parsed.role).length;
        if (live.length >= 8 || roles >= (parsed.role === 'gallery' ? 6 : 1)) throw new SessionError('LIMIT_REACHED', 429, 'No image slot available for this role');
        const requests = usage.get('requests') ?? 0, reservedBytes = usage.get('reservedBytes') ?? 0, acceptedBytes = usage.get('acceptedBytes') ?? 0;
        if (requests >= 20 || reservedBytes + acceptedBytes + parsed.bytes > 60 * 1024 * 1024) throw new SessionError('LIMIT_REACHED', 429, 'Hourly upload limit reached');
        const response = { assetId };
        tx.create(db.doc(`assets/${assetId}`), {
          id: assetId, siteId: id, ownerUid: uid, role: parsed.role, status: 'reserved',
          privatePublicId: null, publicPublicId: null, sha256: null, mime: null,
          bytes: null, width: null, height: null, createdAt, updatedAt: createdAt,
          reservationExpiresAt: expiresAt,
        });
        tx.create(db.doc(`uploadReservations/${assetId}`), { siteId: id, ownerUid: uid, payloadHash, expiresAt, byteAllowance: parsed.bytes, usageId: usageRef.id });
        tx.set(usageRef, { requests: requests + 1, reservedBytes: reservedBytes + parsed.bytes, acceptedBytes });
        // Contend on the site even when the collection query was empty.
        tx.update(site, { updatedAt: createdAt });
        tx.create(operation, { ownerUid: uid, route: `POST /api/sites/${id}/assets`, key, payloadHash, response, createdAt, expiresAt });
        return response;
      });
    },
  };
}
