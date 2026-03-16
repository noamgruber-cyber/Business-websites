'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditorStore } from '@/lib/businessStore';
import { getTemplatesForCategory, type TemplateConfig } from '@/lib/templateConfigs';
import { BusinessCategory } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';

const VALID_CATEGORIES = new Set<BusinessCategory>([
  'barbershop', 'restaurant', 'nail_salon', 'gym', 'cafe', 'photography',
]);

// ── Premium Lock Modal ────────────────────────────────────────────────────────
function PremiumModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative max-w-sm w-full rounded-2xl p-8 text-center"
          style={{ backgroundColor: '#0f0f1a', border: '1px solid rgba(139,92,246,0.3)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-white mb-2">Business Plan Required</h3>
          <p className="text-white/50 text-sm mb-6 leading-relaxed">
            This premium template is available on the Business plan. Upgrade to unlock all templates, analytics, and priority support.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/pricing"
              className="block w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all text-center"
            >
              View Plans →
            </Link>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              Maybe later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Template Visual Preview ───────────────────────────────────────────────────
function TemplatePreview({ config }: { config: TemplateConfig }) {
  const [bg, accent, surface] = config.previewColors;
  return (
    <div style={{
      width: '100%', aspectRatio: '16/10', borderRadius: 8, overflow: 'hidden',
      backgroundColor: bg, position: 'relative',
    }}>
      {/* Fake browser chrome */}
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.3)', padding: '5px 8px',
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
          <span key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c, display: 'block', opacity: 0.7 }} />
        ))}
        <div style={{
          flex: 1, maxWidth: 120, margin: '0 8px', background: 'rgba(255,255,255,0.1)',
          borderRadius: 3, height: 8,
        }} />
      </div>

      {/* Fake navbar */}
      <div style={{
        backgroundColor: surface, padding: '6px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${accent}40`,
      }}>
        <div style={{ width: 50, height: 6, backgroundColor: accent, borderRadius: 3, opacity: 0.8 }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ width: 20, height: 4, backgroundColor: accent, borderRadius: 2, opacity: 0.3 }} />
          ))}
        </div>
      </div>

      {/* Fake hero */}
      <div style={{ padding: '12px 10px', backgroundColor: bg, borderBottom: `2px solid ${accent}50` }}>
        <div style={{ width: '70%', height: 10, backgroundColor: accent, borderRadius: 2, marginBottom: 6, opacity: 0.9 }} />
        <div style={{ width: '90%', height: 5, backgroundColor: accent, borderRadius: 2, marginBottom: 4, opacity: 0.3 }} />
        <div style={{ width: '60%', height: 5, backgroundColor: accent, borderRadius: 2, marginBottom: 10, opacity: 0.3 }} />
        <div style={{ display: 'inline-block', backgroundColor: accent, borderRadius: 4, padding: '4px 10px' }}>
          <div style={{ width: 40, height: 5, backgroundColor: bg, borderRadius: 2, opacity: 0.8 }} />
        </div>
      </div>

      {/* Fake services row */}
      <div style={{ padding: '8px 10px', display: 'flex', gap: 6 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            flex: 1, backgroundColor: surface, borderRadius: 4, padding: '5px 6px',
            border: `1px solid ${accent}20`,
          }}>
            <div style={{ width: '80%', height: 4, backgroundColor: accent, borderRadius: 2, marginBottom: 3, opacity: 0.6 }} />
            <div style={{ width: '50%', height: 4, backgroundColor: accent, borderRadius: 2, opacity: 0.9 }} />
          </div>
        ))}
      </div>

      {/* Premium dim overlay */}
      {config.isPremium && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 28 }}>🔒</span>
        </div>
      )}
    </div>
  );
}

// ── Template Card ─────────────────────────────────────────────────────────────
function TemplateCard({
  config,
  isSelected,
  onSelect,
  lang,
}: {
  config: TemplateConfig;
  isSelected: boolean;
  onSelect: () => void;
  lang: 'he' | 'en';
}) {
  const name = lang === 'he' ? config.nameHe : config.name;
  const description = lang === 'he' ? config.descriptionHe : config.description;
  const vibe = lang === 'he' ? config.vibeHe : config.vibe;

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="relative text-start w-full rounded-2xl border p-4 transition-all duration-200 bg-white/[0.03] hover:bg-white/[0.05]"
      style={{
        borderColor: isSelected ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.08)',
        boxShadow: isSelected ? '0 0 0 1px rgba(139,92,246,0.4), 0 8px 32px rgba(139,92,246,0.15)' : 'none',
        opacity: config.isPremium && !isSelected ? 0.85 : 1,
      }}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <span className="absolute top-3 end-3 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center z-10">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}

      {/* Premium badge */}
      {config.isPremium && (
        <span className="absolute top-3 start-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{ backgroundColor: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
          ⭐ Pro
        </span>
      )}

      {/* Template preview */}
      <TemplatePreview config={config} />

      {/* Template info */}
      <div className="mt-3">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white font-bold text-base">{name}</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor, border: `1px solid ${config.accentColor}30` }}>
            {vibe}
          </span>
        </div>
        <p className="text-white/40 text-xs leading-relaxed mb-3">{description}</p>

        {/* Color palette */}
        <div className="flex items-center gap-1.5">
          {config.previewColors.map((c, i) => (
            <span key={i} style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: c, border: '1px solid rgba(255,255,255,0.15)', display: 'block' }} />
          ))}
        </div>
      </div>
    </motion.button>
  );
}

// ── Main Form ─────────────────────────────────────────────────────────────────
function TemplateGalleryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateBusinessData, businessData } = useEditorStore();
  const { lang } = useLanguage();

  const id = searchParams.get('id') ?? '';
  const category = (searchParams.get('category') ?? businessData.category) as BusinessCategory;
  const validCategory = VALID_CATEGORIES.has(category) ? category : 'barbershop';

  const templates = getTemplatesForCategory(validCategory);

  const [selectedId, setSelectedId] = useState<string>(
    businessData.templateId && businessData.templateId !== validCategory
      ? businessData.templateId
      : templates[0]?.id ?? ''
  );
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleCardClick = (tpl: TemplateConfig) => {
    if (tpl.isPremium) {
      setShowPremiumModal(true);
    } else {
      setSelectedId(tpl.id);
    }
  };

  const handleUseDesign = () => {
    updateBusinessData({ templateId: selectedId });
    if (id) {
      router.push(`/edit/${id}`);
    } else {
      router.push(`/edit/${businessData.id}`);
    }
  };

  const heading  = lang === 'he' ? 'בחר עיצוב' : 'Choose Your Design';
  const subline  = lang === 'he' ? 'בחר את התבנית שמדברת אליך' : 'Pick the template that speaks to your brand';
  const useBtn   = lang === 'he' ? 'השתמש בעיצוב הזה →' : 'Use This Design →';
  const backLabel = lang === 'he' ? 'חזרה' : 'Back';

  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-10 flex flex-col">

      {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}

      {/* Top bar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between mb-10">
        <Link
          href="/create"
          className="flex items-center gap-2 text-white/40 hover:text-white/80 text-sm transition-colors"
        >
          <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                n <= 2 ? 'w-6 bg-purple-500' : 'w-3 bg-white/10'
              }`}
            />
          ))}
          <span className="text-white/35 text-xs ms-2">Step 2 of 5</span>
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-5xl mx-auto w-full text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">{heading}</h1>
          <p className="text-white/45 text-base sm:text-lg">{subline}</p>
        </motion.div>
      </div>

      {/* Template grid */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
        {templates.map((tpl, i) => (
          <motion.div
            key={tpl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <TemplateCard
              config={tpl}
              isSelected={selectedId === tpl.id}
              onSelect={() => handleCardClick(tpl)}
              lang={lang}
            />
          </motion.div>
        ))}
      </div>

      {/* Continue button */}
      <div className="max-w-5xl mx-auto w-full mt-10">
        <div className={`transition-all duration-300 ${selectedId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <button
            onClick={handleUseDesign}
            className="mx-auto flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-xl shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02]"
          >
            {useBtn}
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </main>
  );
}

export default function TemplateGalleryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <TemplateGalleryForm />
    </Suspense>
  );
}
