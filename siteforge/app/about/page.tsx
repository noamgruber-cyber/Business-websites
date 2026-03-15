"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

// ── Counted stat that animates when in view ───────────────────────────────────
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, type: "spring", stiffness: 280, damping: 22 }}
      className="glass rounded-2xl p-6 text-center"
    >
      <p className="text-4xl sm:text-5xl font-black gradient-text mb-2">{value}</p>
      <p className="text-white/45 text-sm">{label}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const { lang } = useLanguage();
  const text = t[lang].about;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-16">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8">
        {/* Warm gradient orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="orb-1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
          <div className="orb-2 absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-700/15 blur-[120px]" />
          <div className="orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-violet-500/10 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-sm text-white/70"
          >
            {text.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6"
          >
            {text.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/55 leading-relaxed"
          >
            {text.subheadline}
          </motion.p>
        </div>
      </section>

      {/* ── ORIGIN STORY ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-black mb-10 gradient-text"
          >
            {text.storyTitle}
          </motion.h2>

          {[text.p1, text.p2, text.p3].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="text-white/65 text-lg leading-[1.85] mb-6"
            >
              {para}
            </motion.p>
          ))}

          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className="text-3xl sm:text-4xl font-black gradient-text leading-tight">
              &ldquo;{text.pullQuote}&rdquo;
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/6 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">Values</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              {text.valuesTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {text.values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="glass rounded-2xl p-7 cursor-default group hover:border-purple-500/40 transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{val.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                  {val.title}
                </h3>
                <p className="text-white/55 leading-relaxed text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">Team</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">{text.teamTitle}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {text.team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.13 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="glass rounded-2xl p-7 text-center group hover:border-purple-500/40 transition-colors duration-300"
              >
                {/* Avatar */}
                <div className="relative inline-flex items-center justify-center mb-5">
                  <motion.div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-black text-lg`}
                    whileHover={{ scale: 1.08 }}
                  >
                    {lang === "he" ? member.initials : member.initials}
                  </motion.div>
                  {/* Glowing ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300`}
                  />
                </div>

                {/* Name */}
                <p className="font-black text-white text-lg leading-tight">
                  {lang === "he" ? member.nameHe : member.nameEn}
                </p>

                {/* Role */}
                <p className="gradient-text text-sm font-bold mt-1 mb-3">{member.role}</p>

                {/* Bio */}
                <p className="text-white/50 text-sm leading-relaxed mb-4">{member.bio}</p>

                {/* Fun fact */}
                <p className="text-amber-400/70 text-xs italic">{member.fact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/8 blur-[100px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">{text.statsTitle}</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {text.stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-8">
              {text.pressTitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-6">
              {text.pressItems.map((name, i) => (
                <motion.span
                  key={name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  className="text-white/25 hover:text-white/70 text-lg sm:text-xl font-black tracking-tight transition-all duration-200 cursor-default"
                  style={{ filter: "grayscale(1)" }}
                >
                  {name}
                </motion.span>
              ))}
            </div>

            <p className="text-white/30 text-sm">{text.pressCaption}</p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center"
            style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(59,130,246,0.18) 100%)", border: "1px solid rgba(139,92,246,0.25)" }}
          >
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-purple-500/20 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black mb-3">{text.ctaHeadline}</h2>
              <p className="text-white/55 mb-8 text-lg">{text.ctaSubline}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/create"
                    className="shimmer-btn text-white font-bold px-9 py-4 rounded-full shadow-xl shadow-purple-500/30 text-base block"
                  >
                    {text.ctaBtn}
                  </Link>
                </motion.div>
                <Link href="/contact" className="text-white/60 hover:text-white text-base font-medium transition-colors">
                  {text.ctaContact}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
