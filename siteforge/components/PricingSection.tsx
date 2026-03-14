"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * PricingSection — 3-tier pricing with highlighted "Business" plan.
 * Middle card is larger with a glowing purple border.
 */

const plans = [
  {
    tier: "Starter",
    price: "₪0",
    period: "/month",
    description: "Perfect for getting started",
    cta: "Get Started Free",
    ctaStyle: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
    popular: false,
    features: [
      "1 website",
      "SiteForge subdomain",
      "Basic templates",
      "Contact form",
      "SSL certificate",
      "Mobile responsive",
    ],
    disabledFeatures: ["Custom domain", "Remove branding", "Analytics", "Priority support"],
  },
  {
    tier: "Business",
    price: "₪39",
    period: "/month",
    description: "Everything you need to grow",
    cta: "Start 14-Day Free Trial",
    ctaStyle: "gradient-btn text-white shadow-xl shadow-purple-500/30",
    popular: true,
    features: [
      "Unlimited pages",
      "Custom domain",
      "All templates",
      "Remove SiteForge branding",
      "Analytics dashboard",
      "Priority email support",
      "SSL certificate",
      "Mobile responsive",
    ],
    disabledFeatures: [],
  },
  {
    tier: "Agency",
    price: "₪149",
    period: "/month",
    description: "For professionals managing multiple clients",
    cta: "Contact Sales",
    ctaStyle: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
    popular: false,
    features: [
      "Everything in Business",
      "10 websites",
      "White-label solution",
      "Priority phone support",
      "Dedicated account manager",
      "Custom integrations",
      "Team collaboration",
      "Advanced analytics",
    ],
    disabledFeatures: [],
  },
];

function CheckIcon({ disabled = false }: { disabled?: boolean }) {
  return (
    <svg
      className={`w-4 h-4 flex-shrink-0 ${disabled ? "text-white/20" : "text-purple-400"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      {disabled ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      )}
    </svg>
  );
}

export default function PricingSection() {
  const { user } = useAuth();
  const router = useRouter();
  const handleCta = () => router.push(user ? '/create' : '/login');

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Simple,{" "}
            <span className="gradient-text">Honest Pricing</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            No hidden fees. No surprise charges. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.popular
                  ? // Popular card: glowing purple border, slightly larger via py
                    "bg-[#0d0d1a] border-2 border-purple-500/70 shadow-2xl shadow-purple-500/20 md:py-12 md:-my-4"
                  : "glass"
              }`}
            >
              {/* "Most Popular" Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 gradient-btn text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-purple-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">
                {plan.tier}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-2">
                <span className={`text-5xl font-black ${plan.popular ? "gradient-text" : "text-white"}`}>
                  {plan.price}
                </span>
                <span className="text-white/40 text-sm pb-2">{plan.period}</span>
              </div>

              <p className="text-white/45 text-sm mb-8">{plan.description}</p>

              {/* Features List */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/80">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.disabledFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/25">
                    <CheckIcon disabled />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={handleCta}
                className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-200 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-white/35 text-sm mt-10"
        >
          🔒 14-day money-back guarantee · No contracts · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
