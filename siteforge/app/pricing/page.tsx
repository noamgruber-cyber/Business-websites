'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// ── Types ─────────────────────────────────────────────────────────────────────
type Billing = 'monthly' | 'yearly';

// ── Plan data ─────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'starter',
    tier: 'Starter',
    badge: null,
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyTotal: null,
    description: 'Everything you need to get started online — forever free.',
    cta: 'Get Started Free',
    ctaVariant: 'outline' as const,
    popular: false,
    features: [
      '1 business website',
      'SiteForge subdomain (siteforge.com/b/your-name)',
      '3 template designs',
      'Up to 6 services listed',
      'Contact form',
      'Mobile responsive',
    ],
    disabledFeatures: [
      'Custom domain',
      'Remove SiteForge branding',
      'Analytics',
      'Priority support',
    ],
  },
  {
    id: 'business',
    tier: 'Business',
    badge: '⭐ Most Popular',
    monthlyPrice: 49,
    yearlyPrice: 39,
    yearlyTotal: 468,
    description: 'Everything you need to grow your business online.',
    cta: 'Start Free Trial',
    ctaVariant: 'gradient' as const,
    popular: true,
    features: [
      'Everything in Starter',
      'Unlimited websites',
      'All 6 template designs',
      'Unlimited services',
      'Custom domain support',
      'Remove SiteForge branding',
      'Basic analytics (views, clicks)',
      'Priority email support',
      'Early access to new templates',
    ],
    disabledFeatures: [
      'White-label',
      'Multiple team members',
    ],
  },
  {
    id: 'agency',
    tier: 'Agency',
    badge: null,
    monthlyPrice: 179,
    yearlyPrice: 143,
    yearlyTotal: 1716,
    description: 'Built for professionals managing multiple clients.',
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
    popular: false,
    features: [
      'Everything in Business',
      'Up to 20 client websites',
      'White-label (remove all SiteForge branding)',
      'Multiple team members (up to 5)',
      'Advanced analytics dashboard',
      'Custom template requests',
      'Dedicated account manager',
      'Phone support',
      'SLA guarantee',
    ],
    disabledFeatures: [],
  },
];

// ── Comparison table ──────────────────────────────────────────────────────────
type CellValue = boolean | string;
interface TableRow {
  feature: string;
  starter: CellValue;
  business: CellValue;
  agency: CellValue;
}
interface TableGroup {
  label: string;
  rows: TableRow[];
}

const COMPARISON: TableGroup[] = [
  {
    label: 'Websites & Templates',
    rows: [
      { feature: 'Number of websites',  starter: '1',        business: 'Unlimited',  agency: '20 client sites' },
      { feature: 'Template designs',    starter: '3',        business: 'All 6',      agency: 'All 6 + custom' },
      { feature: 'Services per site',   starter: '6',        business: 'Unlimited',  agency: 'Unlimited' },
      { feature: 'Custom domain',       starter: false,      business: true,         agency: true },
    ],
  },
  {
    label: 'Customization',
    rows: [
      { feature: 'Remove branding',     starter: false,      business: true,         agency: true },
      { feature: 'White-label',         starter: false,      business: false,        agency: true },
    ],
  },
  {
    label: 'Support',
    rows: [
      { feature: 'Support channel',     starter: 'Community', business: 'Email',     agency: 'Phone + Email' },
      { feature: 'Dedicated manager',   starter: false,       business: false,       agency: true },
    ],
  },
  {
    label: 'Advanced',
    rows: [
      { feature: 'Analytics',           starter: false,       business: 'Basic',     agency: 'Advanced' },
      { feature: 'Team members',        starter: '1',         business: '1',         agency: 'Up to 5' },
      { feature: 'API access',          starter: false,       business: false,       agency: true },
    ],
  },
];

// ── FAQ data ──────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Is the free plan really free forever?',
    a: 'Yes! The Starter plan is completely free with no time limit. You get a real published website at no cost. We only charge if you want premium features like a custom domain or removing our branding.',
  },
  {
    q: 'Can I upgrade or downgrade anytime?',
    a: "Absolutely. You can change your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, the change takes effect at the end of your billing cycle.",
  },
  {
    q: 'Do I need a credit card to sign up?',
    a: 'No credit card required for the free plan. Just sign in with Google and start building.',
  },
  {
    q: 'What happens to my website if I cancel?',
    a: "Your website stays live on the free plan. If you were on a paid plan, you'll be moved back to the free plan — your site won't disappear, but premium features will be disabled.",
  },
  {
    q: 'Can I use my own domain name?',
    a: 'Custom domains are available on the Business and Agency plans. You connect your domain through your domain registrar and point it to your SiteForge site.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'Most business owners finish in under 5 minutes. You pick a template, fill in your details, upload a couple of photos, and hit publish. It really is that fast.',
  },
  {
    q: 'Do you offer refunds?',
    a: "Yes. If you're not happy within the first 14 days of a paid plan, contact us for a full refund — no questions asked.",
  },
  {
    q: 'Is my website mobile-friendly?',
    a: 'Every template on SiteForge is fully responsive and looks great on phones, tablets, and desktops.',
  },
];

// ── Helper components ─────────────────────────────────────────────────────────

function FeatureCheck({ disabled = false }: { disabled?: boolean }) {
  if (disabled) {
    return (
      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
        <svg className="w-3 h-3 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500/15">
      <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function TableCell({ value }: { value: CellValue }) {
  if (typeof value === 'string') {
    return <span className="text-white/70 text-sm font-medium">{value}</span>;
  }
  return value ? (
    <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-white/20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-full p-1">
      <button
        onClick={() => onChange('monthly')}
        className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          billing === 'monthly' ? 'text-white' : 'text-white/45 hover:text-white/70'
        }`}
      >
        {billing === 'monthly' && (
          <motion.div
            layoutId="billing-pill"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10">Monthly</span>
      </button>
      <button
        onClick={() => onChange('yearly')}
        className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          billing === 'yearly' ? 'text-white' : 'text-white/45 hover:text-white/70'
        }`}
      >
        {billing === 'yearly' && (
          <motion.div
            layoutId="billing-pill"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          Yearly
          <span className="text-xs font-bold text-green-400 bg-green-400/15 px-1.5 py-0.5 rounded-full">
            −20%
          </span>
        </span>
      </button>
    </div>
  );
}

// ── Pricing card ──────────────────────────────────────────────────────────────
function PricingCard({
  plan,
  billing,
  onCta,
  index,
}: {
  plan: (typeof PLANS)[0];
  billing: Billing;
  onCta: () => void;
  index: number;
}) {
  const monthlyPrice = plan.monthlyPrice;
  const displayPrice = billing === 'yearly' ? plan.yearlyPrice : monthlyPrice;
  const showStrike = billing === 'yearly' && plan.yearlyPrice < plan.monthlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      className={`relative flex flex-col rounded-2xl p-8 ${
        plan.popular
          ? 'scale-105 bg-[#0f0f20] border-2 border-purple-500/60 shadow-2xl shadow-purple-500/25 z-10'
          : 'bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors duration-300'
      }`}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan name + description */}
      <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">{plan.tier}</p>

      {/* Price block */}
      <div className="mb-6">
        {displayPrice === 0 ? (
          <div className="flex items-end gap-1 h-14">
            <span className="text-5xl font-black text-white leading-none">Free</span>
            <span className="text-white/40 text-sm pb-1.5">forever</span>
          </div>
        ) : (
          <div className="flex items-end gap-1 h-14">
            <span className="text-white/50 text-xl pb-1.5">₪</span>

            {/* Animated price number */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`${plan.id}-${billing}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className={`text-5xl font-black leading-none ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'
                    : 'text-white'
                }`}
              >
                {displayPrice}
              </motion.span>
            </AnimatePresence>

            <div className="flex flex-col pb-1.5 gap-0.5">
              {showStrike && (
                <span className="text-white/30 text-xs line-through leading-none">₪{monthlyPrice}</span>
              )}
              <span className="text-white/40 text-xs leading-none">/mo</span>
            </div>
          </div>
        )}

        {billing === 'yearly' && plan.yearlyTotal && (
          <AnimatePresence mode="wait">
            <motion.p
              key={`${plan.id}-yearly-total`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white/35 text-xs mt-1"
            >
              Billed ₪{plan.yearlyTotal}/year
            </motion.p>
          </AnimatePresence>
        )}
      </div>

      <p className="text-white/50 text-sm leading-relaxed mb-7">{plan.description}</p>

      {/* CTA */}
      <button
        onClick={onCta}
        className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 mb-8 ${
          plan.ctaVariant === 'gradient'
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-500/30 hover:scale-[1.02]'
            : 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5'
        }`}
      >
        {plan.cta}
      </button>

      {/* Divider */}
      <div className="w-full h-px bg-white/10 mb-6" />

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <FeatureCheck />
            <span className="text-sm text-white/75 leading-snug">{f}</span>
          </li>
        ))}
        {plan.disabledFeatures.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <FeatureCheck disabled />
            <span className="text-sm text-white/30 leading-snug line-through decoration-white/15">{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Comparison table ──────────────────────────────────────────────────────────
function ComparisonTable() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-20">
      {/* Toggle header */}
      <div className="text-center mb-6">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 text-sm font-semibold group"
        >
          <span>Compare All Features</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-base"
          >
            ↓
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="table"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="text-left px-6 py-4 text-white/45 font-medium w-[45%]">Feature</th>
                    <th className="text-center px-4 py-4 text-white/70 font-semibold">Starter</th>
                    <th className="text-center px-4 py-4 text-purple-400 font-bold bg-purple-500/[0.05]">
                      Business
                    </th>
                    <th className="text-center px-4 py-4 text-white/70 font-semibold">Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.flatMap((group, gi) => [
                    <tr key={`g${gi}`} className="border-t border-white/10 bg-white/[0.02]">
                      <td
                        colSpan={4}
                        className="px-6 py-2.5 text-xs font-bold text-purple-400/80 uppercase tracking-widest"
                      >
                        {group.label}
                      </td>
                    </tr>,
                    ...group.rows.map((row, ri) => (
                      <tr
                        key={`r${gi}-${ri}`}
                        className={`border-t border-white/[0.06] transition-colors hover:bg-white/[0.02] ${
                          ri % 2 === 1 ? 'bg-white/[0.01]' : ''
                        }`}
                      >
                        <td className="px-6 py-3.5 text-white/60">{row.feature}</td>
                        <td className="px-4 py-3.5 text-center">
                          <TableCell value={row.starter} />
                        </td>
                        <td className="px-4 py-3.5 text-center bg-purple-500/[0.04]">
                          <TableCell value={row.business} />
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <TableCell value={row.agency} />
                        </td>
                      </tr>
                    )),
                  ])}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="mt-24 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-white/45 text-base">
          Everything you need to know about SiteForge pricing.
        </p>
      </motion.div>

      <div className="space-y-2">
        {FAQS.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
                isOpen
                  ? 'border-purple-500/40 bg-purple-500/[0.04]'
                  : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="text-white/85 font-medium text-sm leading-snug">{faq.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-xl font-light flex-shrink-0 transition-colors duration-200 ${
                    isOpen ? 'text-purple-400' : 'text-white/35'
                  }`}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-white/55 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const { user } = useAuth();
  const router = useRouter();

  const handleCta = (planId: string) => {
    if (planId === 'agency') {
      router.push('/login');
      return;
    }
    router.push(user ? '/create' : '/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#0a0a0f]/85 backdrop-blur-xl px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-black text-xl tracking-tight">
            Site<span className="text-purple-400">Forge</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <Link href="/#how-it-works" className="text-white/55 hover:text-white transition-colors">Features</Link>
            <Link href="/#templates"    className="text-white/55 hover:text-white transition-colors">Templates</Link>
            <Link href="/examples"      className="text-white/55 hover:text-white transition-colors">Examples</Link>
          </nav>
          {user ? (
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 px-4 py-2 rounded-full transition-all"
            >
              Dashboard →
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 px-4 py-2 rounded-full transition-all"
            >
              Sign In →
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══ SECTION 1: HERO ══════════════════════════════════════════════════ */}
        <section className="pt-20 pb-6 text-center">
          {/* Background orbs */}
          <div className="absolute inset-x-0 top-0 h-[500px] pointer-events-none overflow-hidden" aria-hidden>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/10 blur-[140px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-sm font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20">
              💰 Simple Pricing
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5 leading-[1.05]">
              Invest in Your Business{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Online Presence
              </span>
            </h1>

            <p className="text-white/55 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Start free, upgrade when you&apos;re ready. No hidden fees. Cancel anytime.
            </p>

            {/* Billing toggle */}
            <BillingToggle billing={billing} onChange={setBilling} />
          </motion.div>
        </section>

        {/* ══ SECTION 2: PRICING CARDS ════════════════════════════════════════ */}
        <section className="relative py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {PLANS.map((plan, i) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billing={billing}
                onCta={() => handleCta(plan.id)}
                index={i}
              />
            ))}
          </div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-white/30 text-sm mt-8"
          >
            🔒 14-day money-back guarantee &nbsp;·&nbsp; No contracts &nbsp;·&nbsp; Cancel anytime
          </motion.p>
        </section>

        {/* ══ SECTION 3: COMPARISON TABLE ═════════════════════════════════════ */}
        <ComparisonTable />

        {/* ══ SECTION 4: FAQ ══════════════════════════════════════════════════ */}
        <FAQ />

        {/* ══ SECTION 5: BOTTOM CTA ═══════════════════════════════════════════ */}
        <section className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden px-8 py-16 sm:py-20 text-center"
          >
            {/* Layered gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-[#0d0d22] to-blue-900/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
            <div className="absolute inset-0 border border-white/[0.08] rounded-3xl" />
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-purple-500/25 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-blue-500/15 blur-3xl rounded-full" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Ready to get your business online?
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-md mx-auto">
                Join hundreds of business owners who built their website with SiteForge.
              </p>

              <button
                onClick={() => handleCta('starter')}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-white text-purple-900 font-bold text-base hover:bg-white/90 transition-all duration-200 shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
              >
                Create Your Free Website →
              </button>

              <p className="mt-5 text-white/40 text-sm flex flex-wrap items-center justify-center gap-4">
                <span>✓ Free forever</span>
                <span>✓ No credit card</span>
                <span>✓ Live in 5 minutes</span>
              </p>
            </div>
          </motion.div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-sm">
          <Link href="/" className="hover:text-white/50 transition-colors font-bold text-white/35">
            ⚡ SiteForge
          </Link>
          <span>© 2025 SiteForge. All rights reserved.</span>
          <Link href="/" className="hover:text-white/50 transition-colors">
            ← Back to homepage
          </Link>
        </div>
      </footer>
    </div>
  );
}
