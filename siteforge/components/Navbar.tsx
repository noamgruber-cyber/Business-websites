"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getT } from "@/lib/translations";

/**
 * Navbar — Logo | Features · Templates · Pricing · More ▼ | Lang + CTA
 * "More" opens a glassmorphism dropdown with How It Works, Examples, Blog, About, Contact
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();
  const { lang, toggleLang } = useLanguage();
  const text = getT(lang).nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainLinks = [
    { label: text.features,  href: "/#how-it-works" },
    { label: text.templates, href: "/#templates" },
    { label: text.pricing,   href: "/pricing" },
  ];

  const moreLinks = [
    {
      label: text.howItWorks,
      href: "/how-it-works",
      icon: "🗺️",
      desc: lang === "he" ? "סיור שלב-אחר-שלב בפלטפורמה" : "A step-by-step platform tour",
    },
    {
      label: text.examples,
      href: "/examples",
      icon: "🖼️",
      desc: lang === "he" ? "אתרים אמיתיים שנבנו עם SiteForge" : "Real websites built with SiteForge",
    },
    {
      label: text.blog,
      href: "/blog",
      icon: "✍️",
      desc: lang === "he" ? "טיפים לצמיחת עסק ברשת" : "Tips to grow your business online",
    },
    {
      label: text.about,
      href: "/about",
      icon: "⚡",
      desc: lang === "he" ? "הסיפור שמאחורי SiteForge" : "The story behind SiteForge",
    },
    {
      label: text.contact,
      href: "/contact",
      icon: "💬",
      desc: lang === "he" ? "נשמח לשמוע ממך" : "We'd love to hear from you",
    },
  ];

  const mobileItemVariants = {
    hidden:  { opacity: 0, x: -16 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.06, duration: 0.2, ease: "easeOut" },
    }),
    exit: (i: number) => ({
      opacity: 0,
      x: -12,
      transition: { delay: i * 0.03, duration: 0.15 },
    }),
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* ===== Logo ===== */}
        <motion.a
          href="/"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.span
            className="text-2xl"
            aria-label="lightning bolt"
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
          >
            ⚡
          </motion.span>
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">SiteForge</span>
          </span>
        </motion.a>

        {/* ===== Desktop Nav Links ===== */}
        <ul className="hidden md:flex items-center gap-8">
          {mainLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 py-1"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 start-0 end-0 h-px bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            </li>
          ))}

          {/* More dropdown */}
          <li>
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((v) => !v)}
                onMouseEnter={() => setHoveredLink(text.more)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 py-1"
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                {text.more}
                <motion.span
                  animate={{ rotate: moreOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] text-white/50 mt-0.5"
                >
                  ▼
                </motion.span>
                {hoveredLink === text.more && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 start-0 end-0 h-px bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>

              {/* Dropdown panel */}
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full mt-3 start-1/2 -translate-x-1/2 w-72 rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(10, 10, 20, 0.85)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1)",
                    }}
                  >
                    <div className="p-2">
                      {moreLinks.map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.15 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMoreOpen(false)}
                            className="group flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors duration-150 border-s-2 border-transparent hover:border-purple-500"
                          >
                            <span className="text-lg mt-0.5 leading-none">{item.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                {item.label}
                              </div>
                              <div className="text-xs text-white/35 mt-0.5 leading-snug">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        </ul>

        {/* ===== Desktop right side: lang toggle + CTA ===== */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            onClick={toggleLang}
            whileTap={{ scale: 0.95 }}
            className="text-xs font-semibold text-white/60 hover:text-white border border-white/15 hover:border-white/30 px-3 py-1.5 rounded-full transition-all duration-200"
            aria-label="Toggle language"
          >
            {text.langToggle}
          </motion.button>

          {!loading && (
            user ? (
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 shimmer-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-purple-500/25"
                >
                  {user.photoURL && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="w-5 h-5 rounded-full" />
                  )}
                  {text.dashboard}
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 shimmer-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-purple-500/25"
                >
                  {text.signIn}
                </Link>
              </motion.div>
            )
          )}
        </div>

        {/* ===== Mobile Hamburger ===== */}
        <motion.button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-0.5 w-6 bg-white origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-6 bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-0.5 w-6 bg-white origin-center"
          />
        </motion.button>
      </nav>

      {/* ===== Mobile Menu Dropdown ===== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-2">
              {/* Main links */}
              {mainLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={link.href}
                    className="text-base font-medium text-white/80 hover:text-white transition-colors block py-1.5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}

              {/* Divider */}
              <motion.li
                custom={mainLinks.length}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="border-t border-white/8 my-1" />
              </motion.li>

              {/* More links (flat in mobile) */}
              {moreLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  custom={mainLinks.length + 1 + i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors py-1.5"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="text-base">{link.icon}</span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}

              {/* CTA row */}
              <motion.li
                custom={mainLinks.length + moreLinks.length + 2}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="pt-2 flex items-center gap-3"
              >
                {user ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1 shimmer-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    {text.dashboard}
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1 shimmer-btn text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    {text.signIn}
                  </Link>
                )}
                <button
                  onClick={() => { toggleLang(); setMenuOpen(false); }}
                  className="text-xs font-semibold text-white/60 hover:text-white border border-white/15 hover:border-white/30 px-3 py-2 rounded-full transition-all duration-200"
                >
                  {text.langToggle}
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
