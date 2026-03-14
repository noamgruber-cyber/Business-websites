'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// ── Types ─────────────────────────────────────────────────────────────────────
type Billing = 'monthly' | 'yearly';

// ── Pricing data ──────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'starter',
    tier: 'Starter',
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyTotal: 0,
    description: 'Perfect for getting started',
    cta: 'Get Started Free',
    popular: false,
    features: [
      '1 website',
      'SiteForge subdomain',
      '3 basic templates',
      'Contact form',
      'SSL certificate',
      'Mobile responsive',
    ],
  },
  {
    id: 'business',
    tier: 'Business',
    monthlyPrice: 49,
    yearlyPrice: 39,
    yearlyTotal: 468,
    description: 'Everything you need to grow',
    cta: 'Start 14-Day Free Trial',
    popular: true,
    features: [
      '1 website',
      'Custom domain',
      'All 6 templates',
      'Remove SiteForge branding',
      'Analytics dashboard',
      'Priority email support',
      'SSL certificate',
      'Mobile responsive',
    ],
  },
  {
    id: 'agency',
    tier: 'Agency',
    monthlyPrice: 179,
    yearlyPrice: 143,
    yearlyTotal: 1716,
    description: 'For professionals managing multiple clients',
    cta: 'Contact Sales',
    popular: false,
    features: [
      '10 websites',
      'Custom domain per site',
      'All 6 templates',
      'White-label solution',
      'Priority phone support',
      'Dedicated account manager',
      'Team collaboration',
      'Advanced analytics',
    ],
  },
];

// ── Feature comparison table ──────────────────────────────────────────────────
const COMPARISON_GROUPS = [
  {
    label: 'Websites & Templates',
    rows: [
      { feature: 'Number of websites', starter: '1', business: '1', agency: '10' },
      { feature: 'Industry templates', starter: '3 basic', business: 'All 6', agency: 'All 6' },
      { feature: 'Custom subdomain', starter: true, business: true, agency: true },
      { feature: 'Custom domain', starter: false, business: true, agency: true },
    ],
  },
  {
    label: 'Customization',
    rows: [
      { feature: 'Logo & cover photo upload', starter: true, business: true, agency: true },
      { feature: 'Gallery photos', starter: '3 photos', business: 'Unlimited', agency: 'Unlimited' },
      { feature: 'Remove SiteForge branding', starter: false, business: true, agency: true },
      { feature: 'White-label solution', starter: false, business: false, agency: true },
    ],
  },
  {
    label: 'Support',
    rows: [
      { feature: 'Email support', starter: 'Community', business: 'Priority', agency: 'Priority' },
      { feature: 'Phone support', starter: false, business: false, agency: true },
      { feature: 'Dedicated account manager', starter: false, business: false, agency: true },
      { feature: 'Onboarding assistance', starter: false, business: false, agency: true },
    ],
  },
  {
    label: 'Advanced',
    rows: [
      { feature: 'Analytics dashboard', starter: false, business: true, agency: true },
      { feature: 'Team collaboration', starter: false, business: false, agency: true },
      { feature: 'Custom integrations', starter: false, business: false, agency: true },
      { feature: 'API access', starter: false, business: false, agency: true },
    ],
  },
];

// ── FAQ data ──────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference immediately. Downgrading takes effect at the end of your billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! The Business plan comes with a 14-day free trial — no credit card required. You\'ll only be charged if you decide to keep it after the trial period.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Agency plans, we also support bank transfers and invoicing.',
  },
  {
    q: 'What does "remove SiteForge branding" mean?',
    a: 'On the Starter plan, a small "Powered by SiteForge" badge appears in the footer of your website. Business and Agency plans remove this badge, so your website looks 100% yours.',
  },
  {
    q: 'Can I use my own domain name?',
    a: 'Yes, on the Business and Agency plans you can connect any custom domain you own (e.g. mybarbershop.com). On the Starter plan, your site is accessible at yourbusiness.siteforge.com.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'You can cancel anytime with no cancellation fees. Your website stays live until the end of your paid billing period. After that, your site will revert to a Starter plan (subdomain only).',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer a 14-day money-back guarantee on all paid plans. If you\'re not satisfied for any reason, contact our support team within 14 days of your first payment for a full refund.',
  },
  {
    q: 'What is the Agency white-label solution?',
    a: 'The white-label solution lets you present SiteForge to your clients under your own brand. You can remove all SiteForge references and use your own logo and color scheme in the platform.',
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function CheckCell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-white/70 text-sm">{value}</span>;
  }
  return value ? (
    <svg className="w-5 h-5 text-purple-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-white/15 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function BillingToggle({ billing, onChange }: { billing: Billing; onChange: (b: Billing) => void }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-14">
      <span className={`text-sm font-medium transition-colors ${billing === 'monthly' ? 'text-white' : 'text-white/40'}`}>
        Monthly
      </span>
      <button
        onClick={() => onChange(billing === 'monthly' ? 'yearly' : 'monthly')}
        className="relative w-14 h-7 bg-white/10 border border-white/15 rounded-full transition-colors hover:bg-white/15"
        aria-label="Toggle billing period"
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className={`absolute top-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg ${
            billing === 'yearly' ? 'left-8' : 'left-1'
          }`}
        />
      </button>
      <span className={`text-sm font-medium transition-colors ${billing === 'yearly' ? 'text-white' : 'text-white/40'}`}>
        Yearly
        <span className="ml-2 text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
          Save 20%
        </span>
      </span>
    </div>
  );
}

function PricingCard({
  plan,
  billing,
  onCta,
  index,
}: {
  plan: typeof PLANS[0];
  billing: Billing;
  onCta: () => void;
  index: number;
}) {
  const price = billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const isPopular = plan.popular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative rounded-2xl p-8 flex flex-col ${
        isPopular
          ? 'bg-[#0d0d1a] border-2 border-purple-500/70 shadow-2xl shadow-purple-500/20 md:py-12 md:-my-4'
          : 'bg-white/[0.04] border border-white/10'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-purple-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Most Popular
          </span>
        </div>
      )}

      <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">{plan.tier}</p>

      {/* Animated price */}
      <div className="flex items-end gap-1 mb-1 h-16">
        {price === 0 ? (
          <AnimatePresence mode="wait">
            <motion.span
              key="free"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-5xl font-black text-white"
            >
              Free
            </motion.span>
          </AnimatePresence>
        ) : (
          <>
            <span className="text-white/50 text-xl pb-1">₪</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`${plan.id}-${billing}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`text-5xl font-black ${isPopular ? 'gradient-text' : 'text-white'}`}
              >
                {price}
              </motion.span>
            </AnimatePresence>
            <span className="text-white/40 text-sm pb-2">/mo</span>
          </>
        )}
      </div>

      {billing === 'yearly' && plan.yearlyTotal > 0 && (
        <p className="text-white/35 text-xs mb-2">Billed ₪{plan.yearlyTotal}/year</p>
      )}

      <p className="text-white/45 text-sm mb-8 mt-1">{plan.description}</p>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-white/75">
            <svg className="w-4 h-4 flex-shrink-0 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onCta}
        className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
          isPopular
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-500/30'
            : 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5'
        }`}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}

function ComparisonTable() {
  const [open, setOpen] = useState(true);

  return (
    <section className="mt-24">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 mx-auto text-white/70 hover:text-white transition-colors group mb-2"
      >
        <h2 className="text-2xl font-bold">Full Feature Comparison</h2>
        <span
          className={`text-xl font-light transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      <p className="text-center text-white/35 text-sm mb-8">See exactly what's included in each plan</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.04] border-b border-white/10">
                    <th className="text-left px-6 py-4 text-white/50 font-medium w-1/2">Feature</th>
                    <th className="text-center px-4 py-4 text-white/70 font-semibold">Starter</th>
                    <th className="text-center px-4 py-4 text-purple-400 font-bold">Business</th>
                    <th className="text-center px-4 py-4 text-white/70 font-semibold">Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_GROUPS.flatMap((group, gi) => [
                    <tr key={`group-${gi}`} className="bg-white/[0.02] border-t border-white/10">
                      <td colSpan={4} className="px-6 py-3 text-xs font-bold text-purple-400/80 uppercase tracking-widest">
                        {group.label}
                      </td>
                    </tr>,
                    ...group.rows.map((row, ri) => (
                      <tr
                        key={`row-${gi}-${ri}`}
                        className="border-t border-white/[0.06] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-3.5 text-white/65">{row.feature}</td>
                        <td className="px-4 py-3.5 text-center">
                          <CheckCell value={row.starter} />
                        </td>
                        <td className="px-4 py-3.5 text-center bg-purple-500/[0.04]">
                          <CheckCell value={row.business} />
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <CheckCell value={row.agency} />
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
    </section>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-24 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-2">Frequently Asked Questions</h2>
      <p className="text-center text-white/35 text-sm mb-10">Everything you need to know about SiteForge pricing</p>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
            >
              <span className="text-white/85 font-medium text-sm">{faq.q}</span>
              <span
                className={`text-white/50 text-xl font-light flex-shrink-0 transition-transform duration-300 ${
                  openIndex === i ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
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
      window.location.href = 'mailto:hello@siteforge.com?subject=Agency Plan Inquiry';
      return;
    }
    router.push(user ? '/create' : '/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-white/[0.06] px-4 sm:px-8 py-4 sticky top-0 z-10 bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-black text-xl">
            Site<span className="text-purple-400">Forge</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-white/60">
            <Link href="/#how-it-works" className="hover:text-white transition-colors">Features</Link>
            <Link href="/#templates" className="hover:text-white transition-colors">Templates</Link>
            <Link href="/examples" className="hover:text-white transition-colors">Examples</Link>
          </nav>
          {user ? (
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-4 py-2 rounded-full transition-all"
            >
              Dashboard →
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-4 py-2 rounded-full transition-all"
            >
              Sign In →
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">Pricing</p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-5">
            Simple,{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Honest Pricing
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            No hidden fees. No surprise charges. Cancel anytime.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <BillingToggle billing={billing} onChange={setBilling} />

        {/* Pricing cards */}
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

        {/* Money-back guarantee */}
        <p className="text-center text-white/30 text-sm mt-10">
          🔒 14-day money-back guarantee · No contracts · Cancel anytime
        </p>

        {/* Feature comparison table */}
        <ComparisonTable />

        {/* FAQ */}
        <FAQAccordion />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-24 relative rounded-3xl overflow-hidden px-8 py-16 text-center"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-purple-900/60" />
          <div className="absolute inset-0 border border-purple-500/20 rounded-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-purple-500/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to get your business online?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
              Join thousands of local businesses already using SiteForge. Start free — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleCta('business')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-purple-900 font-bold text-base hover:bg-white/90 transition-all shadow-xl hover:scale-[1.02]"
              >
                ⚡ Create My Website Free
              </button>
              <Link
                href="/examples"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/25 text-white font-semibold text-base hover:border-white/50 hover:bg-white/5 transition-all"
              >
                View Examples →
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-white/25 text-sm mt-10">
        <Link href="/" className="hover:text-white/50 transition-colors">
          © 2025 SiteForge
        </Link>
        {' · '}
        <Link href="/" className="hover:text-white/50 transition-colors">Back to homepage</Link>
      </footer>
    </div>
  );
}
