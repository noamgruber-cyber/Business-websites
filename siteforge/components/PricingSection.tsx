"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

type Billing = "monthly" | "yearly";

const PLANS_DATA = [
  {
    id: "starter",
    monthlyPrice: "₪0",
    yearlyPrice: "₪0",
    popular: false,
    ctaStyle: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
    disabledFeatures: true,
  },
  {
    id: "business",
    monthlyPrice: "₪49",
    yearlyPrice: "₪39",
    popular: true,
    ctaStyle: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-500/30",
    disabledFeatures: false,
  },
  {
    id: "agency",
    monthlyPrice: "₪179",
    yearlyPrice: "₪143",
    popular: false,
    ctaStyle: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
    disabledFeatures: false,
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
  const { lang } = useLanguage();
  const text = t[lang];

  const [billing, setBilling] = useState<Billing>("monthly");

  const handleCta = (planId: string) => {
    if (planId === "agency") return;
    router.push(user ? "/create" : "/login");
  };

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
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">
            {text.pricing.label}
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            {text.pricing.title}{" "}
            <span className="gradient-text">{text.pricing.titleHighlight}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {text.pricing.subtitle}
          </p>
        </motion.div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium transition-colors ${billing === "monthly" ? "text-white" : "text-white/40"}`}>
            {text.pricing.monthly}
          </span>
          <button
            onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
            className="relative w-14 h-7 bg-white/10 border border-white/15 rounded-full hover:bg-white/15 transition-colors"
            aria-label="Toggle billing period"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className={`absolute top-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg ${
                billing === "yearly" ? "left-8" : "left-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${billing === "yearly" ? "text-white" : "text-white/40"}`}>
            {text.pricing.yearly}
            <span className="ms-2 text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
              {text.pricing.saveLabel}
            </span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {PLANS_DATA.map((planData, index) => {
            const plan = text.pricing.plans[planData.id as keyof typeof text.pricing.plans];
            const price = billing === "monthly" ? planData.monthlyPrice : planData.yearlyPrice;

            return (
              <motion.div
                key={planData.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  planData.popular
                    ? "bg-[#0d0d1a] border-2 border-purple-500/70 shadow-2xl shadow-purple-500/20 md:py-12 md:-my-4"
                    : "glass"
                }`}
              >
                {planData.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-purple-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {text.pricing.mostPopular}
                    </span>
                  </div>
                )}

                <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">
                  {plan.tier}
                </p>

                {/* Animated price */}
                <div className="flex items-end gap-1 mb-2 h-14">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${planData.id}-${billing}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`text-5xl font-black ${planData.popular ? "gradient-text" : "text-white"}`}
                    >
                      {price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-white/40 text-sm pb-2">{text.pricing.perMonth}</span>
                </div>

                <p className="text-white/45 text-sm mb-8">{plan.description}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/80">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {planData.disabledFeatures && plan.disabledFeatures?.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/25">
                      <CheckIcon disabled />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleCta(planData.id)}
                  className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-200 ${planData.ctaStyle}`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Money-back guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-white/35 text-sm mt-10"
        >
          {text.pricing.guarantee}
        </motion.p>

        {/* Link to full pricing page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-4"
        >
          <Link
            href="/pricing"
            className="text-sm text-purple-400/70 hover:text-purple-400 transition-colors"
          >
            {text.pricing.seeFullPricing} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
