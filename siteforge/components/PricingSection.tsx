"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

/**
 * PricingSection — Homepage teaser. Shorter cards, billing toggle,
 * and a "See Full Pricing Details →" link that goes to /pricing.
 */

type Billing = "monthly" | "yearly";

const PLANS = [
  {
    id: "starter",
    tier: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Get online for free",
    cta: "Get Started Free",
    popular: false,
    variant: "outline" as const,
    features: [
      "1 website",
      "SiteForge subdomain",
      "3 template designs",
      "Contact form",
      "Mobile responsive",
    ],
  },
  {
    id: "business",
    tier: "Business",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "Everything you need to grow",
    cta: "Start Free Trial",
    popular: true,
    variant: "gradient" as const,
    features: [
      "Unlimited websites",
      "All 6 template designs",
      "Custom domain",
      "Remove branding",
      "Analytics + priority support",
    ],
  },
  {
    id: "agency",
    tier: "Agency",
    monthlyPrice: 179,
    yearlyPrice: 143,
    description: "For managing multiple clients",
    cta: "Contact Sales",
    popular: false,
    variant: "outline" as const,
    features: [
      "Up to 20 client websites",
      "White-label solution",
      "Team members (up to 5)",
      "Dedicated account manager",
      "Phone support + SLA",
    ],
  },
];

export default function PricingSection() {
  const { user } = useAuth();
  const router = useRouter();
  const [billing, setBilling] = useState<Billing>("monthly");

  const handleCta = (planId: string) => {
    if (planId === "agency") {
      router.push("/login");
      return;
    }
    router.push(user ? "/create" : "/login");
  };

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Simple,{" "}
            <span className="gradient-text">Honest Pricing</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Start free. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-full p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billing === "monthly" ? "text-white" : "text-white/45 hover:text-white/70"
              }`}
            >
              {billing === "monthly" && (
                <motion.div
                  layoutId="pricing-section-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billing === "yearly" ? "text-white" : "text-white/45 hover:text-white/70"
              }`}
            >
              {billing === "yearly" && (
                <motion.div
                  layoutId="pricing-section-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
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
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {PLANS.map((plan, index) => {
            const displayPrice = billing === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
            const showStrike = billing === "yearly" && plan.yearlyPrice < plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.popular
                    ? "bg-[#0f0f20] border-2 border-purple-500/60 shadow-2xl shadow-purple-500/20 md:scale-105 md:z-10"
                    : "glass"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">{plan.tier}</p>

                {/* Price */}
                <div className="flex items-end gap-1 mb-1 h-12">
                  {displayPrice === 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key="free"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl font-black text-white leading-none"
                      >
                        Free
                      </motion.span>
                    </AnimatePresence>
                  ) : (
                    <>
                      <span className="text-white/50 text-lg pb-1">₪</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${plan.id}-${billing}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className={`text-4xl font-black leading-none ${
                            plan.popular
                              ? "bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                              : "text-white"
                          }`}
                        >
                          {displayPrice}
                        </motion.span>
                      </AnimatePresence>
                      <div className="flex flex-col pb-1 gap-0.5">
                        {showStrike && (
                          <span className="text-white/30 text-xs line-through leading-none">
                            ₪{plan.monthlyPrice}
                          </span>
                        )}
                        <span className="text-white/40 text-xs leading-none">/mo</span>
                      </div>
                    </>
                  )}
                </div>

                <p className="text-white/40 text-xs mb-6">{plan.description}</p>

                {/* Feature list */}
                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 flex-shrink-0 text-purple-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-white/70">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleCta(plan.id)}
                  className={`w-full py-3 rounded-full text-sm font-bold transition-all duration-200 ${
                    plan.variant === "gradient"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-500/30"
                      : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee + full pricing link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8 space-y-3"
        >
          <p className="text-white/30 text-sm">
            🔒 14-day money-back guarantee · No contracts · Cancel anytime
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-sm text-purple-400/70 hover:text-purple-400 transition-colors duration-200"
          >
            See Full Pricing Details →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
