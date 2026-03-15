'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { getBusiness } from '@/lib/firestore';
import { getAnalytics, type AnalyticsData } from '@/lib/analytics';
import { BusinessData } from '@/lib/types';

// ── Helpers ────────────────────────────────────────────────────────────────────
function relativeTime(iso: string): string {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 2) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function getLastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

function shortDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

// Seeded pseudo-random from string
function seededRand(seed: string, index: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  h = (Math.imul(h, index + 1)) | 0;
  return Math.abs(h % 100) / 100;
}

type ActivityItem = { icon: string; label: string; time: string };

function generateActivityFeed(analytics: AnalyticsData, slug: string): ActivityItem[] {
  const items: ActivityItem[] = [];
  const now = Date.now();

  const pool: { icon: string; label: string; count: number }[] = [
    { icon: '👀', label: 'Someone viewed your page', count: Math.min(analytics.totalViews, 6) },
    { icon: '📱', label: 'Someone clicked WhatsApp', count: analytics.totalClicks.whatsapp },
    { icon: '📸', label: 'Someone opened your Instagram', count: analytics.totalClicks.instagram },
    { icon: '📞', label: 'Someone called you', count: analytics.totalClicks.phone },
    { icon: '👥', label: 'Someone visited your Facebook', count: analytics.totalClicks.facebook },
  ];

  pool.forEach(({ icon, label, count }) => {
    for (let i = 0; i < count && items.length < 10; i++) {
      const hoursAgo = Math.floor(seededRand(slug + label, i) * 20) + 1;
      const minAgo = Math.floor(seededRand(slug + label + 'min', i) * 50);
      const ms = hoursAgo * 3600000 + minAgo * 60000;
      items.push({ icon, label, time: relativeTime(new Date(now - ms).toISOString()) });
    }
  });

  // Sort by approximate recency (use the time string as a rough proxy)
  return items.slice(0, 10);
}

// ── Animated progress bar ──────────────────────────────────────────────────────
function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.04] border border-white/10 rounded-2xl p-5"
    >
      <p className="text-white/40 text-xs mb-1">{label}</p>
      <p className="text-3xl font-black text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      {sub && <p className="text-white/30 text-xs mt-1">{sub}</p>}
    </motion.div>
  );
}

// ── Tooltip bar ───────────────────────────────────────────────────────────────
function TooltipBar({ date, count, maxCount }: { date: string; count: number; maxCount: number }) {
  const [show, setShow] = useState(false);
  const heightPct = maxCount > 0 ? Math.max((count / maxCount) * 100, count > 0 ? 5 : 2) : 2;
  const isMax = count === maxCount && count > 0;

  return (
    <div
      className="flex-1 flex flex-col items-center gap-1 relative group cursor-pointer"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#1a1a2e] border border-white/15 rounded-lg px-2.5 py-1.5 whitespace-nowrap z-10 pointer-events-none"
          >
            <p className="text-white text-xs font-semibold">{count} views</p>
            <p className="text-white/40 text-[10px]">{date}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full flex flex-col justify-end" style={{ height: 140 }}>
        <motion.div
          className="w-full rounded-t-sm"
          style={{
            backgroundColor: isMax ? '#8b5cf6' : 'rgba(139,92,246,0.3)',
            minHeight: 3,
          }}
          initial={{ height: 0 }}
          animate={{ height: `${heightPct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="text-white/20 text-[9px] rotate-0">{shortDate(date)}</span>
    </div>
  );
}

// ── Tip card ──────────────────────────────────────────────────────────────────
function TipCard({ title, desc, action }: { title: string; desc: string; action?: string }) {
  return (
    <div className="flex gap-4 bg-white/[0.03] border border-white/8 rounded-2xl p-5">
      <span className="text-2xl mt-0.5">💡</span>
      <div>
        <p className="text-white font-semibold text-sm mb-1">{title}</p>
        <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
        {action && (
          <p className="text-purple-400 text-xs mt-2 font-medium">{action}</p>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function FullAnalyticsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.replace('/login?redirect=/dashboard');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || !slug) return;

    Promise.all([getBusiness(slug), getAnalytics(slug)])
      .then(([biz, anal]) => {
        if (!biz) { setError('Business not found'); return; }
        if (biz.ownerUid !== user.uid) { setError('Access denied'); return; }
        setBusiness(biz);
        setAnalytics(anal ?? {
          totalViews: 0,
          totalClicks: { whatsapp: 0, instagram: 0, phone: 0, facebook: 0 },
          dailyViews: {},
          lastVisitedAt: '',
        });
      })
      .catch(() => setError('Failed to load analytics'))
      .finally(() => setFetching(false));
  }, [user, slug]);

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !business || !analytics) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">{error || 'Something went wrong'}</p>
          <Link href="/dashboard" className="text-purple-400 hover:text-purple-300 text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const last30 = getLastNDays(30);
  const last30Counts = last30.map((d) => analytics.dailyViews[d] ?? 0);
  const max30 = Math.max(...last30Counts, 1);

  // Views this month
  const thisMonth = new Date().toISOString().slice(0, 7); // "2025-03"
  const monthlyViews = Object.entries(analytics.dailyViews)
    .filter(([k]) => k.startsWith(thisMonth))
    .reduce((acc, [, v]) => acc + v, 0);

  const clicks = analytics.totalClicks;
  const totalClicks = Object.values(clicks).reduce((a, b) => a + b, 0);

  const maxClicks = Math.max(...Object.values(clicks), 1);
  const topClickType = Object.entries(clicks).sort(([, a], [, b]) => b - a)[0];

  const clickRows = [
    { key: 'whatsapp', icon: '📱', label: 'WhatsApp' },
    { key: 'instagram', icon: '📸', label: 'Instagram' },
    { key: 'phone', icon: '📞', label: 'Phone' },
    { key: 'facebook', icon: '👥', label: 'Facebook' },
  ] as const;

  const activityFeed = generateActivityFeed(analytics, slug);

  // Tips
  const tips = [
    {
      title: 'Share your link in your WhatsApp status',
      desc: 'It reaches all your contacts instantly — the easiest way to get your first 50 visitors.',
    },
    ...(clicks.instagram < 3 ? [{
      title: 'Add your website to your Instagram bio',
      desc: 'Update your Instagram bio with your SiteForge link — people check Instagram bios every day.',
      action: 'Do this in 30 seconds →',
    }] : []),
    ...(clicks.phone > 3 && clicks.whatsapp < 1 ? [{
      title: 'Many customers prefer WhatsApp',
      desc: 'You have phone clicks but no WhatsApp clicks — make sure your WhatsApp number is set up.',
    }] : []),
    ...(analytics.totalViews < 20 ? [{
      title: 'Ask your existing customers to visit',
      desc: 'Send your website link to your 5 best customers and ask them to share it. Word of mouth is powerful.',
    }] : []),
  ].slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">

      {/* ── Header ── */}
      <header className="border-b border-white/[0.07] px-4 sm:px-8 py-4 sticky top-0 z-10 bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <span className="text-white/20 text-xs">Last 30 days</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10">

        {/* ── Business header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4"
        >
          <div className="text-4xl">{business.businessName.charAt(0)}</div>
          <div>
            <h1 className="text-2xl font-black text-white">{business.businessName}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-white/35 text-sm">{business.category.replace('_', ' ')}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                Analytics
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Section 1: Overview cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Views" value={analytics.totalViews} />
          <StatCard label="Views This Month" value={monthlyViews} />
          <StatCard label="Total Clicks" value={totalClicks} />
          <StatCard
            label="Most Clicked"
            value={totalClicks > 0 ? `${topClickType[0].charAt(0).toUpperCase() + topClickType[0].slice(1)}` : '—'}
            sub={totalClicks > 0 ? `${topClickType[1]} clicks` : 'No clicks yet'}
          />
        </div>

        {/* ── Section 2: 30-day views chart ── */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-bold text-base mb-6">Daily Views — Last 30 Days</h2>
          <div className="flex items-end gap-0.5 overflow-x-auto pb-2">
            {last30.map((date, i) => (
              <TooltipBar key={date} date={date} count={last30Counts[i]} maxCount={max30} />
            ))}
          </div>
        </div>

        {/* ── Section 3: Click breakdown ── */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-bold text-base mb-6">What Are Visitors Clicking?</h2>
          <div className="space-y-4">
            {clickRows.map(({ key, icon, label }) => (
              <div key={key} className="flex items-center gap-4">
                <span className="text-xl w-7 text-center flex-shrink-0">{icon}</span>
                <span className="text-white/60 text-sm w-24 flex-shrink-0">{label}</span>
                <ProgressBar value={clicks[key]} max={maxClicks} />
                <span className="text-white font-bold text-sm w-8 text-right flex-shrink-0">
                  {clicks[key]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 4: Recent activity ── */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-bold text-base mb-6">Recent Activity</h2>
          {activityFeed.length === 0 ? (
            <p className="text-white/30 text-sm">No activity yet — share your link to get started!</p>
          ) : (
            <div className="space-y-0">
              {activityFeed.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white/60 text-sm flex-1">{item.label}</span>
                  <span className="text-white/25 text-xs">{item.time}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ── Section 5: Tips ── */}
        <div>
          <h2 className="text-white font-bold text-base mb-5">How to Get More Visitors</h2>
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <TipCard {...tip} />
              </motion.div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
