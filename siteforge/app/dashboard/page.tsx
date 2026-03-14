'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getBusinessesByUser } from '@/lib/firestore';
import { BusinessData } from '@/lib/types';
import { useEditorStore } from '@/lib/businessStore';

const CATEGORY_EMOJI: Record<string, string> = {
  barbershop:  '💈',
  restaurant:  '🍕',
  nail_salon:  '💅',
  gym:         '🏋️',
  cafe:        '☕',
  photography: '📸',
};

const CATEGORY_LABEL: Record<string, string> = {
  barbershop:  'Barbershop',
  restaurant:  'Restaurant',
  nail_salon:  'Nail Salon',
  gym:         'Gym / Fitness',
  cafe:        'Café',
  photography: 'Photography',
};

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const { loadBusiness } = useEditorStore();

  const [businesses, setBusinesses] = useState<BusinessData[]>([]);
  const [fetching, setFetching]     = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace('/login?redirect=/dashboard');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    getBusinessesByUser(user.uid)
      .then(setBusinesses)
      .catch(console.error)
      .finally(() => setFetching(false));
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleEdit = (business: BusinessData) => {
    loadBusiness(business);
    router.push(`/edit/${business.id}`);
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
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10">

        {/* ── Page title + new button ── */}
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Your Websites</h1>
            <p className="text-white/40 text-sm">
              {fetching
                ? 'Loading…'
                : businesses.length === 0
                ? 'No websites yet — create your first one!'
                : `${businesses.length} website${businesses.length > 1 ? 's' : ''} published`}
            </p>
          </div>
          <Link
            href="/create"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Website
          </Link>
        </div>

        {/* ── Content ── */}
        {fetching ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : businesses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {businesses.map((b) => (
              <BusinessCard
                key={b.id}
                business={b}
                onEdit={() => handleEdit(b)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ── Business card ─────────────────────────────────────────────────────────────
function BusinessCard({ business: b, onEdit }: { business: BusinessData; onEdit: () => void }) {
  const publishedDate = b.publishedAt
    ? new Date(b.publishedAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      })
    : null;

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
        <div className="absolute top-3 right-3">
          {b.publishedAt ? (
            <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Live
            </span>
          ) : (
            <span className="bg-yellow-500/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Draft
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
        <p className="text-white/40 text-xs mb-1">{CATEGORY_LABEL[b.category]}</p>
        {b.slug && (
          <p className="text-purple-400/70 text-xs truncate mb-1">siteforge.com/b/{b.slug}</p>
        )}
        {publishedDate && (
          <p className="text-white/25 text-xs mb-0">Published {publishedDate}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-4">
          <button
            onClick={onEdit}
            className="flex-1 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-all duration-200 border border-white/10"
          >
            Edit
          </button>
          {b.slug && b.publishedAt && (
            <Link
              href={`/b/${b.slug}`}
              target="_blank"
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-white text-sm font-medium transition-all duration-200 text-center"
            >
              View Site →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="text-center py-24">
      <div className="text-7xl mb-5">🏗️</div>
      <h2 className="text-2xl font-bold text-white mb-3">Build your first website</h2>
      <p className="text-white/40 text-base mb-8 max-w-sm mx-auto leading-relaxed">
        Choose a template, fill in your business details, and go live in minutes.
      </p>
      <Link
        href="/create"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02]"
      >
        ⚡ Create My Website
      </Link>
    </div>
  );
}
