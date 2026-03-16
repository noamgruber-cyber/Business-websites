'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { getBusinessesByUser, deleteBusiness } from '@/lib/firestore';
import { getAnalytics, type AnalyticsData } from '@/lib/analytics';
import { BusinessData } from '@/lib/types';
import { useEditorStore } from '@/lib/businessStore';
import { useLanguage } from '@/context/LanguageContext';
import { t, type Translations } from '@/lib/translations';
import { SkeletonDashboardGrid } from '@/components/ui/Skeleton';

type DashboardText = Translations['en']['dashboard'] | Translations['he']['dashboard'];

const CATEGORY_EMOJI: Record<string, string> = {
  barbershop:  '💈',
  restaurant:  '🍕',
  nail_salon:  '💅',
  gym:         '🏋️',
  cafe:        '☕',
  photography: '📸',
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function relativeTime(iso: string): string {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 2) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

function dayLabel(iso: string): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[new Date(iso).getDay()];
}

function insightTip(a: AnalyticsData): string {
  if (a.totalClicks.whatsapp > 0)
    return `💡 ${a.totalClicks.whatsapp} people clicked your WhatsApp — great engagement!`;
  if (a.totalViews > 50)
    return '🔥 Your page has over 50 views — consider upgrading for more analytics';
  if (a.totalClicks.instagram === 0)
    return '💡 Tip: Add your Instagram to get more followers from your website';
  if (a.totalViews === 0)
    return '👀 Share your link to get your first visitors!';
  return '📈 Keep sharing your link to grow your audience';
}

// ── Mini analytics panel ───────────────────────────────────────────────────────
function AnalyticsPanel({ slug }: { slug: string }) {
  const [data, setData] = useState<AnalyticsData | null | 'loading'>('loading');

  useEffect(() => {
    getAnalytics(slug)
      .then((d) => setData(d ?? { totalViews: 0, totalClicks: { whatsapp: 0, instagram: 0, phone: 0, facebook: 0 }, dailyViews: {}, lastVisitedAt: '' }))
      .catch(() => setData(null));
  }, [slug]);

  if (data === 'loading') {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-white/30 text-xs py-4 text-center">Analytics unavailable</p>;
  }

  const last7 = getLast7Days();
  const counts = last7.map((d) => data.dailyViews[d] ?? 0);
  const maxCount = Math.max(...counts, 1);

  const clicks = data.totalClicks;
  const clickTypes = [
    { key: 'whatsapp', icon: '📱', label: 'WhatsApp' },
    { key: 'instagram', icon: '📸', label: 'Instagram' },
    { key: 'phone', icon: '📞', label: 'Phone' },
    { key: 'facebook', icon: '👥', label: 'Facebook' },
  ] as const;

  return (
    <div className="px-5 pb-5 space-y-5">
      {/* Total views */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl font-black text-white">{data.totalViews.toLocaleString()}</span>
          <p className="text-white/40 text-xs mt-0.5">Total Page Views</p>
        </div>
        {data.lastVisitedAt && (
          <p className="text-white/25 text-xs text-right">
            Last visited<br />
            <span className="text-white/40">{relativeTime(data.lastVisitedAt)}</span>
          </p>
        )}
      </div>

      {/* Click breakdown */}
      <div className="grid grid-cols-4 gap-2">
        {clickTypes.map(({ key, icon, label }) => (
          <div key={key} className="bg-white/[0.03] rounded-xl p-2.5 text-center border border-white/5">
            <div className="text-lg mb-0.5">{icon}</div>
            <div className="text-white font-bold text-sm">{clicks[key]}</div>
            <div className="text-white/30 text-[10px]">{label}</div>
          </div>
        ))}
      </div>

      {/* 7-day bar chart */}
      <div>
        <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2">Last 7 Days</p>
        <div className="flex items-end gap-1 h-20">
          {last7.map((date, i) => {
            const val = counts[i];
            const heightPct = Math.max((val / maxCount) * 100, val > 0 ? 8 : 4);
            const isMax = val === maxCount && val > 0;
            return (
              <div key={date} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col justify-end" style={{ height: 60 }}>
                  <div
                    className="w-full rounded-t-sm transition-all duration-500"
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor: isMax ? '#8b5cf6' : 'rgba(139,92,246,0.3)',
                      minHeight: 2,
                    }}
                  />
                </div>
                <span className="text-white/30 text-[9px]">{dayLabel(date)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insight tip */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl px-3.5 py-2.5">
        <p className="text-white/70 text-xs leading-relaxed">{insightTip(data)}</p>
      </div>

      {/* Full analytics link */}
      <Link
        href={`/dashboard/analytics/${slug}`}
        className="block text-center text-purple-400 hover:text-purple-300 text-xs transition-colors py-1"
      >
        View Full Analytics →
      </Link>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const { loadBusiness } = useEditorStore();
  const { lang } = useLanguage();
  const text = t[lang].dashboard;

  const [businesses, setBusinesses]       = useState<BusinessData[]>([]);
  const [fetching, setFetching]           = useState(true);
  const [fetchError, setFetchError]       = useState(false);
  const [deleteTarget, setDeleteTarget]   = useState<BusinessData | null>(null);
  const [deleting, setDeleting]           = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/login?redirect=/dashboard');
  }, [user, loading, router]);

  const loadBusinesses = useCallback(() => {
    if (!user) return;
    setFetching(true);
    setFetchError(false);
    getBusinessesByUser(user.uid)
      .then(setBusinesses)
      .catch((err) => {
        console.error('[dashboard] Failed to load businesses', err);
        setFetchError(true);
      })
      .finally(() => setFetching(false));
  }, [user]);

  useEffect(() => {
    loadBusinesses();
  }, [loadBusinesses]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleEdit = (business: BusinessData) => {
    loadBusiness(business);
    router.push(`/edit/${business.id}`);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteBusiness(deleteTarget.slug);
      setBusinesses((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    } catch (err) {
      console.error('[delete]', err);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">

      {/* ── Header ── */}
      <header className="border-b border-white/[0.07] px-4 sm:px-8 py-4 sticky top-0 z-10 bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-black text-xl">
            Site<span className="text-purple-400">Forge</span>
          </Link>

          <div className="flex items-center gap-3">
            {user.photoURL && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.photoURL}
                alt={user.displayName ?? 'User'}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full border border-white/20"
              />
            )}
            <span className="text-white/55 text-sm hidden sm:block truncate max-w-[160px]">
              {user.displayName || user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="text-xs text-white/40 hover:text-white/70 transition-colors border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg"
            >
              {text.signOut}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10">

        {/* ── Page title + new button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">{text.title}</h1>
            <p className="text-white/40 text-sm">
              {fetching
                ? text.loading
                : businesses.length === 0
                ? text.empty
                : `${businesses.length} ${businesses.length > 1 ? text.published : text.publishedSingle}`}
            </p>
          </div>
          <Link
            href="/create"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {text.newWebsite}
          </Link>
        </motion.div>

        {/* ── Fetch error banner ── */}
        {fetchError && !fetching && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4">
            <p className="text-red-400 text-sm">
              Failed to load your websites. Please check your connection and try again.
            </p>
            <button
              onClick={loadBusinesses}
              className="flex-shrink-0 rounded-lg border border-red-500/40 px-4 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Content ── */}
        {fetching ? (
          <SkeletonDashboardGrid />
        ) : fetchError ? null : businesses.length === 0 ? (
          <EmptyState text={text} />
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {businesses.map((b, i) => (
                <motion.div
                  key={b.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
                >
                  <BusinessCard
                    business={b}
                    text={text}
                    onEdit={() => handleEdit(b)}
                    onDelete={() => setDeleteTarget(b)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* ── Delete confirmation modal ── */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="bg-[#111118] border border-white/10 rounded-2xl p-7 max-w-sm w-full shadow-2xl"
            >
              <div className="text-3xl mb-4 text-center">🗑️</div>
              <h2 className="text-xl font-bold text-white text-center mb-2">{text.deleteTitle}</h2>
              <p className="text-white/45 text-sm text-center mb-7">
                <strong className="text-white/70">{deleteTarget.businessName}</strong>{' '}
                {text.deleteBody}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl border border-white/15 text-white/60 hover:text-white text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {text.cancelBtn}
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {deleting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {deleting ? text.deletingBtn : text.deleteBtn}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Business card ─────────────────────────────────────────────────────────────
function BusinessCard({
  business: b, text, onEdit, onDelete,
}: {
  business: BusinessData;
  text: DashboardText;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { lang } = useLanguage();
  const catText = t[lang].create.categories;
  const [statsOpen, setStatsOpen] = useState(false);

  const publishedDate = b.publishedAt
    ? new Date(b.publishedAt).toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      })
    : null;

  const categoryLabel = catText[b.category as keyof typeof catText]?.name ?? b.category;

  return (
    <div className="group bg-white/[0.04] border border-white/10 hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10 flex flex-col">

      {/* Cover photo */}
      <div className="relative h-40 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden flex-shrink-0">
        {b.coverPhotoUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={b.coverPhotoUrl}
            alt={b.businessName}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            {CATEGORY_EMOJI[b.category] ?? '🏢'}
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 end-3">
          {b.publishedAt ? (
            <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {text.liveLabel}
            </span>
          ) : (
            <span className="bg-yellow-500/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {text.draftLabel}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <h3 className="text-white font-bold text-lg leading-tight">{b.businessName || 'Untitled'}</h3>
          <span className="text-xl flex-shrink-0 mt-0.5">{CATEGORY_EMOJI[b.category]}</span>
        </div>
        <p className="text-white/40 text-xs mb-1">{categoryLabel}</p>
        {b.slug && (
          <p className="text-purple-400/70 text-xs truncate mb-1">siteforge.com/b/{b.slug}</p>
        )}
        {publishedDate && (
          <p className="text-white/25 text-xs mb-0">{text.publishedOn} {publishedDate}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-4">
          <button
            onClick={onEdit}
            className="flex-1 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-all duration-200 border border-white/10"
          >
            {text.editBtn}
          </button>
          {b.slug && b.publishedAt && (
            <Link
              href={`/b/${b.slug}`}
              target="_blank"
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-white text-sm font-medium transition-all duration-200 text-center"
            >
              {text.viewBtn}
            </Link>
          )}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onDelete}
            title="Delete website"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-white/30 hover:text-red-400 transition-all duration-200 flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Stats toggle */}
      {b.slug && b.publishedAt && (
        <>
          <button
            onClick={() => setStatsOpen((v) => !v)}
            className="flex items-center justify-between px-5 py-2.5 border-t border-white/5 hover:bg-white/[0.03] transition-colors text-xs font-medium text-white/40 hover:text-white/60 w-full text-left"
          >
            <span>📊 Stats</span>
            <motion.span
              animate={{ rotate: statsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[10px]"
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {statsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-white/5"
              >
                <AnalyticsPanel slug={b.slug} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ text }: { text: DashboardText }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-24"
    >
      <motion.div
        className="text-7xl mb-5"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        🏗️
      </motion.div>
      <h2 className="text-2xl font-bold text-white mb-3">{text.emptyTitle}</h2>
      <p className="text-white/40 text-base mb-8 max-w-sm mx-auto leading-relaxed">
        {text.emptyDesc}
      </p>
      <Link
        href="/create"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02]"
      >
        {text.emptyCreate}
      </Link>
    </motion.div>
  );
}
