"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

// ── Scroll Progress Bar ────────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
        style={{ width: `${progress}%` }}
        transition={{ ease: "linear", duration: 0.05 }}
      />
    </div>
  );
}

// ── Count-Up Number ──────────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = duration / target;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Template Carousel ─────────────────────────────────────────────────────────
const CAROUSEL_TEMPLATES = [
  { name: "Barbershop", emoji: "💈", color: "#c8a96e", bg: "#0d0d0d", accent: "#1a1a1a", slug: "demo-barbershop" },
  { name: "Restaurant", emoji: "🍕", color: "#e07b39", bg: "#0f0a07", accent: "#1a100a", slug: "demo-restaurant" },
  { name: "Nail Salon", emoji: "💅", color: "#e879a0", bg: "#0f0a0d", accent: "#1a0f15", slug: "demo-nail-salon" },
  { name: "Gym",        emoji: "🏋️", color: "#4ade80", bg: "#071009", accent: "#0d1a0f", slug: "demo-gym" },
  { name: "Café",       emoji: "☕", color: "#d4a574", bg: "#0f0d09", accent: "#1a1510", slug: "demo-cafe" },
  { name: "Photography",emoji: "📸", color: "#60a5fa", bg: "#080c14", accent: "#0f1420", slug: "demo-photography" },
];

function TemplateCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_TEMPLATES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setCurrent((c) => (c - 1 + CAROUSEL_TEMPLATES.length) % CAROUSEL_TEMPLATES.length);
  const next = () => setCurrent((c) => (c + 1) % CAROUSEL_TEMPLATES.length);
  const tpl = CAROUSEL_TEMPLATES[current];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ background: tpl.bg }}
        >
          {/* Mockup header */}
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${tpl.color}30` }}>
            <span className="font-bold text-white flex items-center gap-2">
              <span>{tpl.emoji}</span> My {tpl.name}
            </span>
            <div className="flex gap-3 text-xs" style={{ color: `${tpl.color}99` }}>
              <span>Services</span><span>Gallery</span><span>Contact</span>
            </div>
          </div>

          {/* Hero area */}
          <div className="h-48 flex flex-col items-center justify-center text-center px-6" style={{ background: `linear-gradient(135deg, ${tpl.bg}, ${tpl.accent})` }}>
            <div className="text-5xl mb-3">{tpl.emoji}</div>
            <h3 className="text-xl font-black text-white mb-1">Beautiful {tpl.name}</h3>
            <p style={{ color: tpl.color }} className="text-sm mb-4">Professional · Responsive · Live in 5 minutes</p>
            <div className="px-5 py-2 rounded-full text-sm font-bold text-white" style={{ background: tpl.color }}>
              Book Now
            </div>
          </div>

          {/* Services strip */}
          <div className="grid grid-cols-3 gap-3 p-4">
            {["Service 1", "Service 2", "Service 3"].map((s, i) => (
              <div key={i} className="rounded-xl p-3 text-center" style={{ background: tpl.accent }}>
                <div className="text-xs text-white/60">{s}</div>
                <div className="font-bold text-sm mt-1" style={{ color: tpl.color }}>₪{60 + i * 20}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
        aria-label="Previous template"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
        aria-label="Next template"
      >
        →
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {CAROUSEL_TEMPLATES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-purple-400 w-6" : "bg-white/25"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* CTA below */}
      <div className="text-center mt-5">
        <p className="text-white/60 text-sm mb-3 font-medium">{tpl.emoji} {tpl.name} template</p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full shimmer-btn text-white text-sm font-bold shadow-lg shadow-purple-500/25"
        >
          Try This Template →
        </Link>
      </div>
    </div>
  );
}

// ── FAQ Accordion ────────────────────────────────────────────────────────────
const HOW_FAQS = [
  {
    q: "Do I need any technical skills?",
    a: "None at all. If you can fill in a form and upload a photo from your phone, you can build your website with SiteForge. No coding, no design experience, nothing technical required.",
  },
  {
    q: "Can I edit my website after publishing?",
    a: "Yes, whenever you want. Just log in to your dashboard, click 'Edit', make your changes, and save. Changes go live instantly — no waiting, no approval process.",
  },
  {
    q: "What if I don't have professional photos?",
    a: "Your website will still look great with regular phone photos. We recommend good lighting and a clean background. You can always update photos later — many businesses launch with phone photos and add professional ones over time.",
  },
  {
    q: "Will my website show up on Google?",
    a: "Yes. Every SiteForge website is SEO-optimized with proper meta tags, page titles, and descriptions. Your site is automatically indexed by Google — just add your website URL to your Google Business Profile to speed up discovery.",
  },
  {
    q: "Can I share my website link on WhatsApp or Instagram?",
    a: "Absolutely — that's exactly what most of our users do. Copy your link and paste it in your Instagram bio, WhatsApp status, or send it directly to customers. Your link works on every device.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-white font-semibold group-hover:text-purple-300 transition-colors">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-purple-400 text-xl flex-shrink-0 font-light"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-white/55 pb-5 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Vertical Step Tour ────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "Sign in with Google",
    time: "30 seconds",
    description: "No lengthy signup forms. Just click 'Sign in with Google' and you're instantly in your dashboard. Your account is created automatically — no passwords to remember.",
    details: ["One click — no passwords to remember", "Your Google profile photo is used automatically", "Completely free, no credit card ever required"],
    visual: (
      <div className="glass rounded-2xl p-8 flex flex-col items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl">⚡</div>
        <p className="text-white/40 text-sm">Sign in to continue</p>
        <motion.button
          className="flex items-center gap-3 bg-white text-[#1a1a1a] font-semibold px-6 py-3 rounded-full text-sm shadow-xl"
          animate={{ boxShadow: ["0 0 0 0 rgba(139,92,246,0)", "0 0 0 8px rgba(139,92,246,0.3)", "0 0 0 0 rgba(139,92,246,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </motion.button>
      </div>
    ),
  },
  {
    num: "02",
    title: "Choose Your Template",
    time: "1 minute",
    description: "Pick the template that matches your business type. Each template is designed specifically for that industry — the layout, colors, and sections are all pre-configured.",
    details: ["6 industry-specific templates available", "Each template is mobile-responsive automatically", "You can change your template later without losing your content"],
    visual: (
      <div className="glass rounded-2xl p-6 grid grid-cols-3 gap-3">
        {[["💈","Barbershop","#c8a96e"],["🍕","Restaurant","#e07b39"],["💅","Nail Salon","#e879a0"],["🏋️","Gym","#4ade80"],["☕","Café","#d4a574"],["📸","Photography","#60a5fa"]].map(([emoji, name, color], i) => (
          <motion.div
            key={name}
            className={`rounded-xl p-3 text-center cursor-pointer border transition-all duration-200 ${i === 0 ? "border-purple-500/60 bg-purple-500/10" : "border-white/10 hover:border-white/20"}`}
            whileHover={i !== 0 ? { scale: 1.05 } : {}}
          >
            <div className="text-2xl mb-1">{emoji}</div>
            <div className="text-xs font-semibold text-white/80">{name}</div>
            {i === 0 && <div className="mt-1 text-xs font-bold" style={{ color }}> ✓ Selected</div>}
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    title: "Fill In Your Details",
    time: "2–3 minutes",
    description: "Add your business name, services and prices, contact info, and opening hours. As you type, your website updates in real time on the preview panel to the right.",
    details: ["Upload your logo and cover photo", "Add up to 12 services with prices", "Set your opening hours for each day of the week", "Add your WhatsApp, Instagram, and Facebook links"],
    visual: (
      <div className="glass rounded-2xl p-5 space-y-3">
        {[["Business Name", "Cohen's Barbershop"], ["Phone / WhatsApp", "+972 54-123-4567"], ["City", "Tel Aviv"], ["Services", "Haircut ₪60 · Beard Trim ₪40"]].map(([label, value], i) => (
          <div key={label}>
            <div className="text-xs text-white/40 mb-1">{label}</div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white flex items-center justify-between">
              <span>{value}</span>
              {i === 0 && (
                <motion.span
                  className="w-0.5 h-4 bg-purple-400 inline-block"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "04",
    title: "Publish Instantly",
    time: "10 seconds",
    description: "Hit the publish button and your website is live immediately. No waiting, no approval process. You get a shareable link that works on any device.",
    details: ["Your site is live at siteforge.com/b/your-business-name", "Share the link on WhatsApp, Instagram bio, or Google Maps", "Your website is indexed by Google automatically"],
    visual: (
      <div className="glass rounded-2xl p-8 flex flex-col items-center gap-4">
        <div className="text-4xl">🚀</div>
        <p className="text-white/50 text-sm text-center">Your website is ready to publish</p>
        <motion.button
          className="shimmer-btn text-white font-bold px-8 py-3.5 rounded-full shadow-xl shadow-purple-500/30 text-sm"
          whileTap={{ scale: 0.96 }}
        >
          Publish My Website ⚡
        </motion.button>
        <div className="text-xs text-white/30 text-center">Free forever · No credit card required</div>
      </div>
    ),
  },
  {
    num: "05",
    title: "Edit Anytime",
    time: "ongoing",
    description: "Your website is never finished — and that's okay. Update your prices, add new photos, change your hours for holidays. Log back into your dashboard and edit anything in minutes.",
    details: ["Log in from any device — phone, tablet, or desktop", "Changes go live instantly, no review process", "Your website history is saved automatically"],
    visual: (
      <div className="glass rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-semibold text-sm">My Websites</span>
          <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">1 Live</span>
        </div>
        <div className="bg-white/5 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">Cohen&apos;s Barbershop</p>
              <p className="text-white/40 text-xs mt-0.5">siteforge.com/b/cohens-barbershop</p>
            </div>
            <motion.button
              className="text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1.5 rounded-lg"
              animate={{ boxShadow: ["0 0 0 0 rgba(139,92,246,0)", "0 0 0 6px rgba(139,92,246,0.3)", "0 0 0 0 rgba(139,92,246,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Edit →
            </motion.button>
          </div>
        </div>
      </div>
    ),
  },
];

function StepTour() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActiveStep(index);
          }
        });
      },
      { threshold: 0.55, rootMargin: "-10% 0px -30% 0px" }
    );
    const refs = stepRefs.current;
    refs.forEach((ref) => ref && observer.observe(ref));
    return () => {
      refs.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  return (
    <div className="relative">
      {/* Vertical connector line */}
      <div className="absolute start-[28px] top-12 bottom-12 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent hidden md:block" />

      <div className="space-y-20">
        {STEPS.map((step, i) => {
          const isActive = activeStep === i;
          return (
            <div
              key={step.num}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start"
            >
              {/* Left: step info */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0.4 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Step number */}
                <div className="flex items-center gap-4 mb-5">
                  <motion.div
                    animate={{
                      background: isActive
                        ? "linear-gradient(135deg, #8b5cf6, #3b82f6)"
                        : "rgba(255,255,255,0.08)",
                      boxShadow: isActive
                        ? "0 0 20px rgba(139,92,246,0.5)"
                        : "none",
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  >
                    {step.num}
                  </motion.div>
                  <div>
                    <p className="text-xs text-purple-400 font-semibold tracking-widest uppercase">{step.time}</p>
                    <h3 className="text-2xl font-black text-white">{step.title}</h3>
                  </div>
                </div>

                <p className="text-white/60 leading-relaxed mb-5">{step.description}</p>

                <ul className="space-y-2">
                  {step.details.map((d, di) => (
                    <motion.li
                      key={di}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }}
                      transition={{ delay: di * 0.08, duration: 0.3 }}
                      className="flex items-start gap-2 text-sm text-white/55"
                    >
                      <span className="text-purple-400 mt-0.5">•</span>
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                {step.visual}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const PAIN_POINTS = [
  "Hire a web designer — ₪3,000–₪15,000",
  "Wait 4–8 weeks for delivery",
  "Pay monthly maintenance fees",
  "Need to call developer for every small change",
  "Most small businesses just... give up",
];
const SOLUTIONS = [
  "Build it yourself — free forever",
  "Live in 5 minutes",
  "Edit anytime, instantly",
  "No developers needed",
  "Every business deserves a website",
];

const STATS = [
  { value: 5, suffix: " min", label: "Average time to publish" },
  { value: 6, suffix: "",    label: "Industry templates" },
  { value: 0, suffix: "₪",   label: "Cost to get started", prefix: "₪" },
  { value: 100, suffix: "%", label: "Mobile responsive" },
];

export default function HowItWorksPage() {
  return (
    <>
      <ScrollProgress />

      <main className="min-h-screen bg-[#0a0a0f] text-white pt-16">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
          {/* Orbs */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="orb-1 absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[120px]" />
            <div className="orb-2 absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[120px]" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-sm text-white/70"
            >
              📖 The Full Story
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
            >
              From Zero to Live Website
              <br />
              <span className="gradient-text">in 5 Minutes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/55 max-w-2xl mx-auto mb-10"
            >
              Here&apos;s exactly how SiteForge works — step by step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/create" className="shimmer-btn text-white font-bold px-8 py-3.5 rounded-full shadow-xl shadow-purple-500/25 text-base">
                Create My Free Website →
              </Link>
              <a href="#how-it-actually-works" className="text-white/60 hover:text-white text-base font-medium transition-colors">
                See how it works ↓
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── PROBLEM SECTION ──────────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                The Old Way Was <span className="gradient-text">Broken</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {/* Before */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl p-8"
                style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <h3 className="text-xl font-black text-red-400 mb-6">❌ Before SiteForge</h3>
                <ul className="space-y-4">
                  {PAIN_POINTS.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                      className="flex items-start gap-3 text-white/70"
                    >
                      <span className="text-red-400 mt-0.5 font-bold flex-shrink-0">✗</span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* After */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl p-8"
                style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}
              >
                <h3 className="text-xl font-black text-green-400 mb-6">✅ With SiteForge</h3>
                <ul className="space-y-4">
                  {SOLUTIONS.map((sol, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                      className="flex items-start gap-3 text-white/70"
                    >
                      <motion.span
                        className="text-green-400 mt-0.5 flex-shrink-0"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 400, damping: 15 }}
                      >
                        ✓
                      </motion.span>
                      {sol}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Bold stat */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-2xl sm:text-3xl font-black gradient-text leading-tight">
                &ldquo;87% of customers check a business online before visiting.
                Don&apos;t be invisible.&rdquo;
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── STEP TOUR ────────────────────────────────────────────────────── */}
        <section id="how-it-actually-works" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">Interactive Tour</p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                How It <span className="gradient-text">Actually Works</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto mt-4">
                Scroll through each step. See exactly what happens.
              </p>
            </motion.div>

            <StepTour />
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/8 blur-[100px] rounded-full" />
          </div>
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                SiteForge <span className="gradient-text">by the Numbers</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <p className="text-4xl sm:text-5xl font-black gradient-text mb-2">
                    {stat.prefix}
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/45 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEMPLATE CAROUSEL ────────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">Live Preview</p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                See a Template <span className="gradient-text">in Action</span>
              </h2>
              <p className="text-white/50 text-lg mt-4">Auto-advances every 5 seconds. Hover to pause.</p>
            </motion.div>

            <TemplateCarousel />
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Still Have <span className="gradient-text">Questions?</span>
              </h2>
            </motion.div>

            <div className="glass rounded-2xl px-6 divide-y divide-white/10">
              {HOW_FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center"
              style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.2) 100%)", border: "1px solid rgba(139,92,246,0.3)" }}
            >
              {/* Glow */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-purple-500/20 blur-3xl" />
              </div>

              <div className="relative z-10">
                <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-4">Ready?</p>
                <h2 className="text-4xl sm:text-5xl font-black mb-5">
                  Create Your <span className="gradient-text">Free Website</span>
                </h2>
                <p className="text-white/55 text-lg max-w-xl mx-auto mb-8">
                  Join thousands of businesses already live on SiteForge. No credit card, no commitment — just your website, ready in minutes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Link href="/create" className="shimmer-btn text-white font-bold px-10 py-4 rounded-full shadow-xl shadow-purple-500/30 text-base block">
                      Create Your Free Website →
                    </Link>
                  </motion.div>
                  <Link href="/examples" className="text-white/60 hover:text-white font-medium transition-colors text-base">
                    View Examples first
                  </Link>
                </div>
                <p className="text-white/30 text-sm mt-6">✓ Free forever plan · ✓ No credit card · ✓ Live in 5 minutes</p>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}
