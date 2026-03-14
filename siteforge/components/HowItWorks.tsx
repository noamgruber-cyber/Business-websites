"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

/**
 * HowItWorks — 3-step process section with glassmorphism cards.
 * Scroll-triggered fade-in animations via Framer Motion.
 */

const STEP_ICONS = ["🎨", "✏️", "🚀"];
const STEP_NUMBERS = ["01", "02", "03"];

export default function HowItWorks() {
  const { lang } = useLanguage();
  const text = t[lang].howItWorks;

  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full" />
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
            {text.label}
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            {text.title}{" "}
            <span className="gradient-text">{text.titleHighlight}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {text.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group glass rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              {/* Connector line (desktop only) */}
              {index < text.steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 rtl:-left-4 rtl:right-auto w-8 h-[2px] bg-gradient-to-r from-purple-500/40 to-transparent z-10" />
              )}

              {/* Number Badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-black mb-6 shadow-lg shadow-purple-500/30">
                {STEP_NUMBERS[index]}
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4">{STEP_ICONS[index]}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-white/55 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
