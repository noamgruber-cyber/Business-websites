'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditorStore } from '@/lib/businessStore';
import { saveBusiness, checkSlugAvailable } from '@/lib/firestore';
import { useAuth } from '@/context/AuthContext';

const CATEGORY_LABELS: Record<string, string> = {
  barbershop:  '💈 Barbershop',
  restaurant:  '🍕 Restaurant',
  nail_salon:  '💅 Nail Salon',
  gym:         '🏋️ Gym / Fitness',
  cafe:        '☕ Café',
  photography: '📸 Photography',
};

function generateSlug(value: string, category?: string): string {
  // Replace Hebrew/non-ASCII chars — if the whole string would be empty after stripping,
  // fall back to category + timestamp
  const stripped = value
    .toLowerCase()
    .trim()
    .replace(/[\u0590-\u05FF\u05B0-\u05C7]/g, '') // strip Hebrew characters
    .replace(/[^a-z0-9\s-]/g, '')                  // remove remaining special chars
    .replace(/\s+/g, '-')                           // spaces → dashes
    .replace(/-{2,}/g, '-')                         // collapse multiple dashes
    .replace(/^-|-$/g, '');                         // trim leading/trailing dashes

  if (!stripped) {
    // Fallback: category-timestamp
    const base = (category ?? 'business').replace(/_/g, '-');
    return `${base}-${Date.now().toString(36)}`;
  }
  return stripped;
}

function validateSlug(slug: string): string | null {
  if (!slug) return 'Slug is required';
  if (slug.length < 3) return 'Must be at least 3 characters';
  if (!/^[a-z0-9-]+$/.test(slug)) return 'Only lowercase letters, numbers, and hyphens';
  return null;
}

type PublishState = 'idle' | 'checking' | 'saving' | 'done' | 'error';

export default function Step5_Publish() {
  const router = useRouter();
  const { user } = useAuth();
  const { businessData, updateBusinessData, setStep, reset } = useEditorStore();

  const [slugError, setSlugError]     = useState<string | null>(null);
  const [publishState, setPublishState] = useState<PublishState>('idle');
  const [publishError, setPublishError] = useState<string | null>(null);

  const handleSlugChange = (value: string) => {
    const slug = generateSlug(value, businessData.category);
    updateBusinessData({ slug });
    setSlugError(validateSlug(slug));
    setPublishError(null);
  };

  const handlePublish = async () => {
    const validationErr = validateSlug(businessData.slug);
    if (validationErr) { setSlugError(validationErr); return; }

    setPublishError(null);

    try {
      // 1 — Check slug availability (exclude current business if re-publishing)
      setPublishState('checking');
      const available = await checkSlugAvailable(businessData.slug, businessData.id || undefined);
      if (!available) {
        setSlugError('הכתובת הזו כבר תפוסה, נסה כתובת אחרת');
        setPublishState('idle');
        return;
      }

      // 2 — Save to Firestore
      setPublishState('saving');
      const publishedData = {
        ...businessData,
        publishedAt:   new Date().toISOString(),
        ownerUid:      user?.uid          ?? '',
        ownerEmail:    user?.email        ?? '',
        ownerName:     user?.displayName  ?? '',
        ownerPhotoUrl: user?.photoURL     ?? '',
      };
      await saveBusiness(publishedData);
      updateBusinessData({ publishedAt: publishedData.publishedAt });

      // 3 — Navigate and reset store
      setPublishState('done');
      const publishedSlug = businessData.slug;
      reset();
      router.push(`/b/${publishedSlug}`);
    } catch (err) {
      console.error('[publish]', err);
      setPublishError('Something went wrong. Please try again.');
      setPublishState('error');
    }
  };

  const slugValid  = !slugError && businessData.slug.length >= 3;
  const isWorking  = publishState === 'checking' || publishState === 'saving';

  const statusText: Record<PublishState, string> = {
    idle:     '🚀 Publish My Website',
    checking: 'Checking URL…',
    saving:   'Publishing your website…',
    done:     '✅ Published!',
    error:    '🚀 Publish My Website',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">

        {/* Back link */}
        <button
          onClick={() => setStep(4)}
          className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Contact &amp; Hours
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl font-black text-white mb-3">Ready to Go Live?</h1>
          <p className="text-white/45 text-base">Review your details and publish your website</p>
        </div>

        {/* Summary Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-4">Summary</p>
          <div className="space-y-3">
            <Row label="Business Name" value={businessData.businessName || '—'} />
            <Row label="Category"      value={CATEGORY_LABELS[businessData.category] ?? '—'} />
            <Row label="Services"      value={`${businessData.services.length} added`} />
            <Row
              label="Photos"
              value={`${businessData.coverPhotoUrl ? 1 : 0} cover · ${businessData.galleryPhotos.filter(Boolean).length} gallery`}
            />
            {businessData.coverPhotoUrl && (
              <div className="flex justify-between items-center pt-1">
                <span className="text-white/40 text-sm">Cover Preview</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={businessData.coverPhotoUrl}
                  alt="Cover"
                  className="w-20 h-12 object-cover rounded-lg border border-white/10"
                />
              </div>
            )}
          </div>
        </div>

        {/* Slug input */}
        <div className="mb-8">
          <label className="text-sm font-medium text-white/80 block mb-2">Your Website URL</label>
          <div
            className={`flex items-center bg-white/5 border rounded-xl overflow-hidden transition-colors ${
              slugError ? 'border-red-500/50' : slugValid ? 'border-green-500/40' : 'border-white/10'
            }`}
          >
            <span className="px-3 py-3 text-white/30 text-sm bg-white/5 border-r border-white/10 whitespace-nowrap flex-shrink-0">
              siteforge.com/b/
            </span>
            <input
              type="text"
              value={businessData.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="your-business-name"
              className="flex-1 bg-transparent px-3 py-3 text-white text-sm outline-none min-w-0"
            />
            {slugValid && (
              <div className="px-3 flex-shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          {slugError && <p className="text-red-400 text-xs mt-1.5">{slugError}</p>}
          {!slugError && businessData.slug && (
            <p className="text-white/25 text-xs mt-1.5">siteforge.com/b/{businessData.slug}</p>
          )}
        </div>

        {/* Publish error banner */}
        {publishError && (
          <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between gap-3">
            <p className="text-red-400 text-sm">{publishError}</p>
            <button
              onClick={handlePublish}
              className="text-xs font-semibold text-red-400 hover:text-red-300 flex-shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Publish button */}
        <button
          onClick={handlePublish}
          disabled={isWorking || !slugValid}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-xl shadow-purple-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isWorking && (
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {statusText[publishState]}
        </button>

        <p className="text-center text-white/25 text-sm mt-5">
          You can always edit your website later from your dashboard
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-white/40 text-sm">{label}</span>
      <span className="text-white font-medium text-sm">{value}</span>
    </div>
  );
}
