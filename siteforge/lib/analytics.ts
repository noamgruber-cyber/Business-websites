import {
  doc,
  setDoc,
  getDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export type AnalyticsData = {
  totalViews: number;
  totalClicks: {
    whatsapp: number;
    instagram: number;
    phone: number;
    facebook: number;
  };
  dailyViews: Record<string, number>;
  lastVisitedAt: string;
};

const COL = 'analytics';

function todayKey(): string {
  return new Date().toISOString().split('T')[0]; // "2025-03-15"
}

/** Record a page view for a slug — fire-and-forget safe */
export async function recordView(slug: string): Promise<void> {
  const ref  = doc(db, COL, slug);
  const date = todayKey();
  await setDoc(
    ref,
    {
      totalViews:                increment(1),
      [`dailyViews.${date}`]:    increment(1),
      lastVisitedAt:             new Date().toISOString(),
    },
    { merge: true },
  );
}

/** Record a CTA click for a slug */
export async function recordClick(
  slug: string,
  type: 'whatsapp' | 'instagram' | 'phone' | 'facebook',
): Promise<void> {
  const ref = doc(db, COL, slug);
  await setDoc(
    ref,
    { [`totalClicks.${type}`]: increment(1) },
    { merge: true },
  );
}

/** Fetch analytics document — returns null if not found */
export async function getAnalytics(slug: string): Promise<AnalyticsData | null> {
  const ref  = doc(db, COL, slug);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const raw = snap.data();
  return {
    totalViews:   raw.totalViews   ?? 0,
    totalClicks:  {
      whatsapp:  raw.totalClicks?.whatsapp  ?? 0,
      instagram: raw.totalClicks?.instagram ?? 0,
      phone:     raw.totalClicks?.phone     ?? 0,
      facebook:  raw.totalClicks?.facebook  ?? 0,
    },
    dailyViews:   raw.dailyViews   ?? {},
    lastVisitedAt: raw.lastVisitedAt ?? '',
  };
}
