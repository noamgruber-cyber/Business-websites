import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';
import { BusinessData } from './types';

const COL = 'businesses';

// ── Save (create or overwrite) a business ────────────────────────────────────
export async function saveBusiness(data: BusinessData): Promise<void> {
  try {
    const ref = doc(db, COL, data.slug);
    await setDoc(ref, { ...data, savedAt: new Date().toISOString() });
  } catch (err) {
    console.error('[firestore] saveBusiness failed:', err);
    throw new Error('Failed to save business. Please check your connection and try again.');
  }
}

// ── Fetch a single business by slug ──────────────────────────────────────────
export async function getBusiness(slug: string): Promise<BusinessData | null> {
  try {
    const ref  = doc(db, COL, slug);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data() as BusinessData;
  } catch (err) {
    console.error('[firestore] getBusiness failed:', err);
    throw new Error('Failed to fetch business data. Firestore may be unavailable.');
  }
}

// ── Fetch all businesses (max 50, newest first) ───────────────────────────────
export async function getAllBusinesses(): Promise<BusinessData[]> {
  try {
    const q    = query(collection(db, COL), orderBy('createdAt', 'desc'), limit(50));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as BusinessData);
  } catch (err) {
    console.error('[firestore] getAllBusinesses failed:', err);
    throw new Error('Failed to fetch businesses. Please try again.');
  }
}

// ── Partial update ────────────────────────────────────────────────────────────
export async function updateBusiness(
  slug: string,
  updates: Partial<BusinessData>,
): Promise<void> {
  try {
    const ref = doc(db, COL, slug);
    await updateDoc(ref, { ...updates, savedAt: new Date().toISOString() });
  } catch (err) {
    console.error('[firestore] updateBusiness failed:', err);
    throw new Error('Failed to update business. Please try again.');
  }
}

// ── Check if a slug is available (optionally excluding the current business id) ─
export async function checkSlugAvailable(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  try {
    const ref  = doc(db, COL, slug);
    const snap = await getDoc(ref);
    if (!snap.exists()) return true;
    // If the existing doc belongs to the same business being edited, it's still available
    if (excludeId && snap.data()?.id === excludeId) return true;
    return false;
  } catch (err) {
    console.error('[firestore] checkSlugAvailable failed:', err);
    throw new Error('Failed to check URL availability. Please try again.');
  }
}

// ── Delete a business by slug ─────────────────────────────────────────────────
export async function deleteBusiness(slug: string): Promise<void> {
  try {
    const ref = doc(db, COL, slug);
    await deleteDoc(ref);
  } catch (err) {
    console.error('[firestore] deleteBusiness failed:', err);
    throw new Error('Failed to delete business. Please try again.');
  }
}

// ── Fetch all businesses owned by a user ─────────────────────────────────────
export async function getBusinessesByUser(uid: string): Promise<BusinessData[]> {
  try {
    const q    = query(collection(db, COL), where('ownerUid', '==', uid), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as BusinessData);
  } catch (err) {
    console.error('[firestore] getBusinessesByUser failed:', err);
    throw new Error('Failed to load your websites. Please check your connection.');
  }
}
