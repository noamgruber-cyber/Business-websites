"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getT } from "@/lib/translations";

// ── Social icon SVGs ──────────────────────────────────────────────────────────
const SocialIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z" />
    </svg>
  ),
};

const socialLinks = [
  { name: "Instagram", Icon: SocialIcons.Instagram, href: "#" },
  { name: "Twitter",   Icon: SocialIcons.Twitter,   href: "#" },
  { name: "Facebook",  Icon: SocialIcons.Facebook,  href: "#" },
  { name: "LinkedIn",  Icon: SocialIcons.LinkedIn,  href: "#" },
  { name: "TikTok",    Icon: SocialIcons.TikTok,    href: "#" },
];

export default function Footer() {
  const { lang, toggleLang } = useLanguage();
  const text = getT(lang).footerNew;
  const navText = getT(lang).nav;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative border-t border-transparent">
      {/* Gradient Top Border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #8b5cf6 30%, #3b82f6 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative bg-[#050508]">
        {/* ── Newsletter Band ───────────────────────────────────────────────── */}
        <div
          className="border-b border-white/5"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.05) 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  {text.newsletter.heading}
                </h3>
                <p className="text-white/45 text-sm">{text.newsletter.desc}</p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex items-center gap-2 w-full md:w-auto"
              >
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-green-400 text-sm font-medium px-4 py-2"
                    >
                      {text.newsletter.success}
                    </motion.span>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={text.newsletter.placeholder}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 w-56 transition-colors"
                        required
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="shimmer-btn text-white text-sm font-semibold px-5 py-2.5 rounded-xl whitespace-nowrap"
                      >
                        {text.newsletter.btn}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>

        {/* ── Main Footer Columns ───────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-6 gap-10"
          >
            {/* Brand Column — spans 2 cols on md */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
                <span className="text-2xl">⚡</span>
                <span className="text-xl font-bold">
                  <span className="gradient-text">SiteForge</span>
                </span>
              </Link>
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
                {text.tagline}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5 flex-wrap">
                {socialLinks.map(({ name, Icon, href }) => (
                  <motion.a
                    key={name}
                    href={href}
                    aria-label={name}
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 transition-colors duration-200"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Link columns — 4 cols */}
            {text.columns.map((col, ci) => (
              <motion.div
                key={col.heading}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.07 }}
              >
                <h4 className="text-white font-semibold text-sm mb-4 whitespace-nowrap">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label} className="flex items-center gap-2">
                      <Link
                        href={link.href}
                        className="text-white/40 text-sm hover:text-white/80 transition-colors duration-200 leading-snug"
                      >
                        {link.label}
                      </Link>
                      {"badge" in link && link.badge && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium whitespace-nowrap">
                          {link.badge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Bottom Bar ───────────────────────────────────────────────────── */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Copyright */}
            <p className="text-white/25 text-xs order-2 sm:order-1">
              {text.copyright}
            </p>

            {/* Center: Language toggle */}
            <motion.button
              onClick={toggleLang}
              whileTap={{ scale: 0.95 }}
              whileHover={{ borderColor: "rgba(139,92,246,0.5)" }}
              className="text-xs font-semibold text-white/50 hover:text-white border border-white/10 px-4 py-1.5 rounded-full transition-colors duration-200 order-1 sm:order-2"
              aria-label="Toggle language"
            >
              {navText.langToggle}
            </motion.button>

            {/* Right: Made in Israel / Built with love */}
            <p className="text-white/20 text-xs order-3">
              {text.builtWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
