"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

// ── Animated SVG Checkmark ────────────────────────────────────────────────────
function AnimatedCheckmark() {
  return (
    <svg
      className="w-20 h-20 mx-auto"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx="40" cy="40" r="36"
        stroke="url(#check-gradient)"
        strokeWidth="3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.path
        d="M24 40 L35 51 L56 29"
        stroke="#4ade80"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="check-gradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Dark labeled input field ──────────────────────────────────────────────────
function Field({
  label, value, onChange, type = "text", placeholder, error, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; error?: string; required?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prevErr = useRef<string | undefined>();

  // Shake on new error
  if (error && error !== prevErr.current && ref.current) {
    ref.current.classList.remove("shake");
    void ref.current.offsetWidth;
    ref.current.classList.add("shake");
  }
  prevErr.current = error;

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/75">
        {label}{required && <span className="text-purple-400 ms-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-all duration-200 ${
          error
            ? "border-red-500/60 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
            : "border-white/10 focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
        }`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ── Map Placeholder ───────────────────────────────────────────────────────────
function MapPlaceholder() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex items-center justify-center"
      style={{ background: "#111118", height: "200px", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
        {/* Diagonal roads */}
        <line x1="0" y1="80" x2="100%" y2="120" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <line x1="30%" y1="0" x2="60%" y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
        <line x1="0" y1="140" x2="100%" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
      </svg>

      {/* Pin */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50 flex items-center justify-center text-white text-sm">
            📍
          </div>
          <div className="w-0.5 h-4 bg-purple-400/60" />
          <div className="w-2 h-0.5 rounded-full bg-purple-400/40" />
        </motion.div>
        <div className="mt-3 glass rounded-full px-3 py-1 text-xs text-white/60 font-medium">
          Tel Aviv, Israel
        </div>
      </div>
    </div>
  );
}

// ── Main Contact Page ─────────────────────────────────────────────────────────
export default function ContactPage() {
  const { lang } = useLanguage();
  const text = t[lang].contact;

  // Form state
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [subject, setSubject]   = useState("");
  const [message, setMessage]   = useState("");
  const [honeypot, setHoneypot] = useState(""); // spam guard

  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim())                        errs.name    = lang === "he" ? "שם נדרש" : "Name is required";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
                                             errs.email   = lang === "he" ? "אימייל לא תקין" : "Invalid email address";
    if (!subject)                            errs.subject = lang === "he" ? "בחר נושא" : "Please select a subject";
    if (message.trim().length < 20)          errs.message = lang === "he" ? "ההודעה חייבת להכיל לפחות 20 תווים" : "Message must be at least 20 characters";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    console.log("[contact form]", { name, email, subject, message, honeypot });

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSuccess(true);
  };

  const resetForm = () => {
    setName(""); setEmail(""); setSubject(""); setMessage("");
    setErrors({}); setSuccess(false); setHoneypot("");
  };

  // Smooth scroll to form
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const successMsg = text.successMsg
    .replace("{name}", name)
    .replace("{email}", email);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pt-16">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="orb-1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px]" />
          <div className="orb-2 absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
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
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5"
          >
            {text.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/55 text-lg leading-relaxed"
          >
            {text.subheadline}
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT OPTION CARDS ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {text.optionCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="glass rounded-2xl p-7 flex flex-col gap-3 hover:border-purple-500/40 transition-colors duration-300 cursor-default group"
            >
              <div className="text-4xl">{card.icon}</div>
              <h3 className="font-bold text-white text-lg group-hover:text-purple-200 transition-colors">{card.title}</h3>
              <p className="text-white/50 text-sm">{card.desc}</p>

              {i === 0 ? (
                <button
                  onClick={scrollToForm}
                  className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors text-start mt-auto"
                >
                  {card.action}
                </button>
              ) : i === 1 ? (
                <a
                  href="https://wa.me/972501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors mt-auto"
                >
                  {card.action}
                </a>
              ) : (
                <a
                  href="mailto:hello@siteforge.co.il"
                  className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors mt-auto"
                >
                  {card.action}
                </a>
              )}

              <p className="text-white/25 text-xs">{card.time}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────────────── */}
      <section id="contact-form" className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-black mb-8"
          >
            {text.formTitle}
          </motion.h2>

          <AnimatePresence mode="wait">
            {success ? (
              /* ── SUCCESS STATE ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <AnimatedCheckmark />
                <h3 className="text-2xl font-black text-white mt-6 mb-3">{text.successTitle}</h3>
                <p className="text-white/55 mb-7 leading-relaxed">{successMsg}</p>
                <button
                  onClick={resetForm}
                  className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors underline underline-offset-2"
                >
                  {text.successReset}
                </button>
              </motion.div>
            ) : (
              /* ── FORM ── */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-7 sm:p-9 space-y-5"
                noValidate
              >
                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  style={{ display: "none" }}
                  aria-hidden="true"
                  autoComplete="off"
                />

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label={text.namePlaceholder}
                    value={name}
                    onChange={setName}
                    placeholder="Cohen"
                    error={errors.name}
                    required
                  />
                  <Field
                    label={text.emailPlaceholder}
                    value={email}
                    onChange={setEmail}
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email}
                    required
                  />
                </div>

                {/* Subject dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-white/75">
                    {text.subjectLabel}<span className="text-purple-400 ms-1">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`bg-white/5 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 appearance-none ${
                      errors.subject
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                    }`}
                  >
                    <option value="" disabled className="bg-[#111118]">
                      {lang === "he" ? "בחר נושא..." : "Select a subject..."}
                    </option>
                    {text.subjectOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#111118]">{opt}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="text-xs text-red-400">{errors.subject}</p>}
                </div>

                {/* Message textarea */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-white/75">
                      {lang === "he" ? "הודעה" : "Message"}<span className="text-purple-400 ms-1">*</span>
                    </label>
                    <span className={`text-xs transition-colors ${message.length > 900 ? "text-red-400" : "text-white/30"}`}>
                      {message.length}/1000
                    </span>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => e.target.value.length <= 1000 && setMessage(e.target.value)}
                    placeholder={text.messagePlaceholder}
                    rows={5}
                    className={`bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 outline-none transition-all duration-200 resize-none ${
                      errors.message
                        ? "border-red-500/60 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
                        : "border-white/10 focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileTap={sending ? {} : { scale: 0.97 }}
                  whileHover={sending ? {} : { y: -1 }}
                  className="w-full shimmer-btn text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {sending ? text.sending : text.submitBtn}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            {/* Left: info */}
            <div>
              <h2 className="text-2xl font-black mb-6">{text.locationTitle}</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white/65">
                  <span className="text-xl">📍</span>
                  <span>{text.address}</span>
                </li>
                <li className="flex items-center gap-3 text-white/65">
                  <span className="text-xl">🕐</span>
                  <span>{text.hours}</span>
                </li>
                <li className="flex items-center gap-3 text-white/65">
                  <span className="text-xl">✉️</span>
                  <a href={`mailto:${text.email}`} className="hover:text-purple-300 transition-colors">
                    {text.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Right: styled map */}
            <MapPlaceholder />
          </motion.div>
        </div>
      </section>

    </main>
  );
}
