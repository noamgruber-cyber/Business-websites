'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ── Template demo data ────────────────────────────────────────────────────────
const DEMOS = [
  {
    id: 'barbershop',
    emoji: '💈',
    label: 'Barbershop',
    name: 'The Classic',
    slug: 'cohens-barbershop',
    tagline: "Sharp cuts. Sharp style.",
    bg: '#130a00',
    primary: '#c8a96e',
    accent: '#d4a554',
    preview: 'barbershop',
  },
  {
    id: 'restaurant',
    emoji: '🍕',
    label: 'Restaurant',
    name: 'The Elegant',
    slug: 'mamas-restaurant',
    tagline: 'Home-cooked flavors.',
    bg: '#faf8f5',
    primary: '#c0392b',
    accent: '#e74c3c',
    preview: 'restaurant',
  },
  {
    id: 'nail_salon',
    emoji: '💅',
    label: 'Nail Salon',
    name: 'The Boutique',
    slug: 'glamour-nails',
    tagline: 'Where every detail is perfection.',
    bg: '#fff0f7',
    primary: '#d4547a',
    accent: '#e91e8c',
    preview: 'nail_salon',
  },
  {
    id: 'gym',
    emoji: '🏋️',
    label: 'Gym',
    name: 'The Beast',
    slug: 'ironforge-gym',
    tagline: 'Forge your strongest self.',
    bg: '#0a0a0a',
    primary: '#f97316',
    accent: '#fb923c',
    preview: 'gym',
  },
  {
    id: 'cafe',
    emoji: '☕',
    label: 'Café',
    name: 'The Cozy',
    slug: 'the-daily-grind',
    tagline: "Life's too short for bad coffee.",
    bg: '#faf5ef',
    primary: '#6f4e37',
    accent: '#92603f',
    preview: 'cafe',
  },
  {
    id: 'photography',
    emoji: '📸',
    label: 'Photography',
    name: 'The Minimal',
    slug: 'lens-and-light',
    tagline: 'Every moment deserves to be remembered.',
    bg: '#ffffff',
    primary: '#111111',
    accent: '#555555',
    preview: 'photography',
  },
] as const;

type DemoCategory = (typeof DEMOS)[number]['id'] | 'all';

const FILTERS: { id: DemoCategory; label: string }[] = [
  { id: 'all',         label: 'All' },
  { id: 'barbershop',  label: '💈 Barbershop' },
  { id: 'restaurant',  label: '🍕 Restaurant' },
  { id: 'nail_salon',  label: '💅 Nail Salon' },
  { id: 'gym',         label: '🏋️ Gym' },
  { id: 'cafe',        label: '☕ Café' },
  { id: 'photography', label: '📸 Photography' },
];

export default function ExamplesPage() {
  const [active, setActive] = useState<DemoCategory>('all');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filtered = active === 'all' ? DEMOS : DEMOS.filter((d) => d.id === active);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ── Top bar ── */}
      <header className="border-b border-white/[0.07] px-4 sm:px-8 py-4 sticky top-0 z-20 bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-black text-xl">
            Site<span className="text-purple-400">Forge</span>
          </Link>
          <Link
            href="/create"
            className="flex items-center gap-2 gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-purple-500/20"
          >
            Create Your Website →
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">
            Live Demos
          </p>
          <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-6">
            See{' '}
            <span className="gradient-text">What&apos;s Possible</span>
          </h1>
          <p className="text-lg text-white/55 leading-relaxed max-w-xl mx-auto">
            Real templates, real businesses. Click any demo to see the full live site,
            then make it yours in minutes.
          </p>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div className="sticky top-[65px] z-10 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/[0.05] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 flex-wrap justify-center sm:justify-start overflow-x-auto scrollbar-hide">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                active === f.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'border border-white/15 text-white/55 hover:text-white hover:border-white/30'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Cards grid ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((demo) => (
              <motion.div
                key={demo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DemoCard demo={demo} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── CTA banner ── */}
        <div className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <div className="text-4xl mb-4">🏗️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Don&apos;t see your industry?</h2>
          <p className="text-white/45 mb-8 max-w-sm mx-auto">
            We&apos;re adding new templates every month. Tell us what you need and we&apos;ll build it next.
          </p>

          {submitted ? (
            <p className="text-green-400 font-medium">✅ Thanks! We&apos;ll be in touch.</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                required
                className="flex-1 w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 outline-none focus:border-purple-500/60 transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto gradient-btn text-white font-semibold text-sm px-6 py-3 rounded-xl flex-shrink-0"
              >
                Request a Template
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

// ── Demo card ─────────────────────────────────────────────────────────────────
function DemoCard({ demo }: { demo: (typeof DEMOS)[number] }) {
  const router = useRouter();

  return (
    <div className="group bg-white/[0.03] border border-white/10 hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 flex flex-col">

      {/* Mini template preview */}
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <TemplatePreview demo={demo} />

        {/* Category badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          <span>{demo.emoji}</span>
          <span>{demo.label}</span>
        </div>
      </div>

      {/* Card info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-lg mb-0.5">
          {demo.label} — <span className="text-white/60">{demo.name}</span>
        </h3>
        <p className="text-white/40 text-sm mb-5 flex-1 italic">&ldquo;{demo.tagline}&rdquo;</p>

        <div className="flex gap-2">
          <Link
            href={`/b/${demo.slug}`}
            target="_blank"
            className="flex-1 py-2 rounded-xl border border-white/15 hover:border-white/30 text-white/65 hover:text-white text-sm font-medium transition-all duration-200 text-center"
          >
            👁 Live Preview
          </Link>
          <button
            onClick={() => router.push(`/create?category=${demo.id}`)}
            className="flex-1 py-2 rounded-xl gradient-btn text-white text-sm font-semibold text-center transition-all duration-200"
          >
            Use This →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Mini visual template representations ─────────────────────────────────────
function TemplatePreview({ demo }: { demo: (typeof DEMOS)[number] }) {
  const { preview, bg, primary, accent } = demo;

  if (preview === 'barbershop') {
    return (
      <div className="w-full h-full flex flex-col" style={{ background: bg }}>
        <div className="px-4 py-2.5 flex items-center justify-between border-b" style={{ borderColor: `${primary}30` }}>
          <span className="font-bold text-xs" style={{ color: primary }}>💈 COHEN&apos;S</span>
          <div className="flex gap-3 text-[10px]" style={{ color: `${primary}80` }}>
            <span>Services</span><span>Gallery</span><span>Book</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 text-center">
          <div className="text-[10px] tracking-[0.3em] mb-2" style={{ color: `${primary}80` }}>ESTABLISHED 2010 · TEL AVIV</div>
          <div className="text-xl font-black text-white mb-1">Sharp Cuts.</div>
          <div className="text-xl font-black mb-4" style={{ color: primary }}>Sharp Style.</div>
          <div className="px-4 py-1.5 rounded-full text-[11px] font-bold" style={{ background: primary, color: bg }}>Book Appointment</div>
        </div>
        <div className="px-4 py-2 flex gap-2">
          {['Haircut ₪70', 'Beard ₪45', 'Shave ₪80'].map((s) => (
            <div key={s} className="flex-1 py-1.5 rounded border text-center text-[9px] font-medium" style={{ borderColor: `${primary}50`, color: `${primary}cc` }}>{s}</div>
          ))}
        </div>
      </div>
    );
  }

  if (preview === 'restaurant') {
    return (
      <div className="w-full h-full flex flex-col" style={{ background: bg }}>
        <div className="px-4 py-2.5 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm">
          <span className="font-bold text-xs" style={{ color: primary }}>🍴 MAMA&apos;S KITCHEN</span>
          <div className="flex gap-3 text-[10px] text-gray-500"><span>Menu</span><span>Reserve</span></div>
        </div>
        <div className="h-24 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${primary}dd, ${accent}cc)` }}>
          <div className="text-center text-white">
            <div className="text-xs tracking-widest opacity-75 mb-1">HOMEMADE · HAIFA</div>
            <div className="text-lg font-black">Mama&apos;s Kitchen</div>
          </div>
        </div>
        <div className="flex-1 px-4 py-3">
          <div className="text-[10px] font-bold mb-2 tracking-widest" style={{ color: primary }}>CHEF&apos;S SPECIALS</div>
          {[['Shakshuka', '₪52'], ['Sea Bass', '₪98']].map(([name, price]) => (
            <div key={name} className="flex justify-between items-center py-1.5 border-b border-gray-100 text-xs">
              <span className="text-gray-700 font-medium">{name}</span>
              <span className="font-bold" style={{ color: primary }}>{price}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (preview === 'nail_salon') {
    return (
      <div className="w-full h-full flex flex-col" style={{ background: bg }}>
        <div className="px-4 py-2.5 flex items-center justify-between bg-white/80 border-b" style={{ borderColor: `${primary}20` }}>
          <span className="font-bold text-xs tracking-wider" style={{ color: primary }}>GLAMOUR NAILS</span>
        </div>
        <div className="flex-1 flex" style={{ background: `linear-gradient(135deg, ${bg}, #ffe4f0)` }}>
          <div className="flex-1 flex flex-col justify-center px-5 py-4">
            <div className="text-[10px] tracking-widest mb-1" style={{ color: `${primary}80` }}>BOUTIQUE NAIL STUDIO</div>
            <div className="text-lg font-bold leading-tight mb-3 text-gray-800">Where every<br />detail is <span style={{ color: primary }}>perfect.</span></div>
            <div className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold self-start" style={{ background: primary, color: '#fff' }}>Book Now ✨</div>
          </div>
          <div className="w-20 flex flex-col gap-1 p-2 justify-center">
            {['#ffb7d0', '#ff8ab3', '#e91e8c'].map((c) => (
              <div key={c} className="h-5 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="px-4 py-2.5 bg-white/60 flex gap-2">
          {['Manicure ₪80', 'Gel ₪120'].map((s) => (
            <div key={s} className="flex-1 py-1 rounded-lg border text-center text-[9px] font-medium" style={{ borderColor: `${primary}40`, color: primary }}>{s}</div>
          ))}
        </div>
      </div>
    );
  }

  if (preview === 'gym') {
    return (
      <div className="w-full h-full flex flex-col" style={{ background: bg }}>
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-orange-500/20">
          <span className="font-black text-xs tracking-widest" style={{ color: primary }}>⚡ IRONFORGE</span>
          <div className="flex gap-2 text-[10px] text-gray-500"><span>Classes</span><span>Join</span></div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-4">
          <div className="text-[10px] tracking-[0.2em] mb-2" style={{ color: `${primary}80` }}>HAIFA&apos;S #1 GYM</div>
          <div className="text-2xl font-black text-white leading-tight text-center mb-1">PUSH YOUR</div>
          <div className="text-2xl font-black leading-tight text-center mb-4" style={{ color: primary }}>LIMITS.</div>
          <div className="px-5 py-2 rounded text-[11px] font-black text-black" style={{ background: primary }}>JOIN NOW →</div>
        </div>
        <div className="px-4 py-2.5 flex gap-2 border-t border-orange-500/20">
          {['CrossFit ₪60', 'PT ₪180'].map((s) => (
            <div key={s} className="flex-1 py-1 rounded border text-center text-[9px] font-medium" style={{ borderColor: `${primary}50`, color: primary }}>{s}</div>
          ))}
        </div>
      </div>
    );
  }

  if (preview === 'cafe') {
    return (
      <div className="w-full h-full flex flex-col" style={{ background: bg }}>
        <div className="px-4 py-2.5 flex items-center justify-between bg-[#fdf8f1] border-b border-amber-100">
          <span className="font-bold text-xs" style={{ color: primary }}>☕ THE DAILY GRIND</span>
        </div>
        <div className="px-5 py-4 flex-1" style={{ background: 'linear-gradient(to bottom, #faf5ef, #fdf8f1)' }}>
          <div className="text-[9px] tracking-widest mb-2" style={{ color: `${primary}90` }}>SPECIALTY COFFEE · JERUSALEM</div>
          <div className="text-xl font-bold mb-1" style={{ color: primary }}>Life&apos;s too short</div>
          <div className="text-xl font-bold mb-4 text-gray-700">for bad coffee.</div>
          <div className="inline-block px-3 py-1.5 rounded-full text-[10px] font-semibold" style={{ background: primary, color: '#fff' }}>View Menu ☕</div>
        </div>
        <div className="px-4 py-2.5 bg-amber-50/80 flex gap-2">
          {['Flat White ₪18', 'Cold Brew ₪22'].map((s) => (
            <div key={s} className="flex-1 py-1 rounded border text-center text-[9px] font-medium border-amber-200" style={{ color: primary }}>{s}</div>
          ))}
        </div>
      </div>
    );
  }

  // Photography
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="px-4 py-2.5 flex items-center justify-between bg-black">
        <span className="font-light text-xs tracking-[0.2em] text-white">LENS & LIGHT</span>
        <div className="flex gap-3 text-[10px] text-white/50"><span>Work</span><span>Packages</span></div>
      </div>
      <div className="flex-1 bg-black flex flex-col items-start justify-end px-5 pb-5 relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-30">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-600" style={{ background: `hsl(0,0%,${25 + i * 8}%)` }} />
          ))}
        </div>
        <div className="relative z-10">
          <div className="text-[10px] tracking-[0.3em] text-white/50 mb-1">PHOTOGRAPHER · TEL AVIV</div>
          <div className="text-xl font-light text-white italic">Noa Cohen</div>
        </div>
      </div>
      <div className="px-4 py-2.5 bg-white flex gap-2">
        {['Portrait ₪650', 'Wedding ₪5500'].map((s) => (
          <div key={s} className="flex-1 py-1 rounded border border-gray-200 text-center text-[9px] font-medium text-gray-700">{s}</div>
        ))}
      </div>
    </div>
  );
}
