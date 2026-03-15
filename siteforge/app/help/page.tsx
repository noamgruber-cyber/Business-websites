'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  helpArticles,
  getPopularArticles,
  CATEGORY_META,
  type HelpArticle,
} from '@/lib/helpArticles';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CATEGORIES = Object.keys(CATEGORY_META) as HelpArticle['category'][];

function ArticleCard({ article, lang }: { article: HelpArticle; lang: 'he' | 'en' }) {
  const meta = CATEGORY_META[article.category];
  const title = lang === 'he' ? article.titleHe : article.title;
  const excerpt = (lang === 'he' ? article.contentHe : article.content)
    .replace(/<[^>]+>/g, '')
    .trim()
    .slice(0, 100);

  return (
    <Link href={`/help/${article.slug}`}>
      <motion.div
        whileHover={{ y: -2 }}
        className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors mb-1 leading-snug">
            {title}
          </h3>
          <p className="text-white/35 text-xs leading-relaxed line-clamp-2">{excerpt}…</p>
          <p className="text-white/20 text-[11px] mt-2">{article.helpful} people found this helpful</p>
        </div>
        <span className="text-white/20 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1 text-lg">→</span>
      </motion.div>
    </Link>
  );
}

export default function HelpCenterPage() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return helpArticles.filter((a) => {
      const title = (lang === 'he' ? a.titleHe : a.title).toLowerCase();
      const content = (lang === 'he' ? a.contentHe : a.content)
        .replace(/<[^>]+>/g, '')
        .toLowerCase();
      return title.includes(q) || content.includes(q);
    });
  }, [query, lang]);

  const popular = useMemo(() => getPopularArticles(4), []);

  const articlesByCategory = useMemo(() => {
    const map: Record<string, HelpArticle[]> = {};
    for (const cat of CATEGORIES) {
      map[cat] = helpArticles.filter((a) => a.category === cat);
    }
    return map;
  }, []);

  const heading  = lang === 'he' ? 'מרכז העזרה' : 'Help Center';
  const subline  = lang === 'he' ? 'מצא תשובות לכל השאלות שלך' : 'Find answers to all your questions';
  const placeholder = lang === 'he' ? 'חפש עזרה... לדוגמה "העלאת תמונות"' : "Search for help... e.g. 'upload photos'";
  const popularLabel = lang === 'he' ? 'מאמרים פופולריים' : 'Most Popular';
  const noResults = lang === 'he'
    ? `לא נמצאו מאמרים עבור "${query}" — `
    : `No articles found for "${query}" — `;
  const contactUs = lang === 'he' ? 'צור איתנו קשר →' : 'contact us →';

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0f] pt-16">

        {/* ── Hero + Search ── */}
        <section className="relative py-20 px-4 text-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,92,246,0.12), transparent)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
              {lang === 'he' ? 'תמיכה' : 'Support'}
            </p>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">{heading}</h1>
            <p className="text-white/45 text-lg mb-10">{subline}</p>

            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-white/[0.06] border border-white/12 rounded-2xl pl-12 pr-5 py-4 text-white text-base placeholder-white/25 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all"
              />
            </div>
          </motion.div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 space-y-16">

          {/* ── Search results ── */}
          <AnimatePresence mode="wait">
            {query.trim() && (
              <motion.section
                key="results"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-white font-bold text-lg mb-5">
                  {lang === 'he' ? `תוצאות עבור "${query}"` : `Results for "${query}"`}
                </h2>
                {filtered && filtered.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filtered.map((a) => (
                      <ArticleCard key={a.slug} article={a} lang={lang} />
                    ))}
                  </div>
                ) : (
                  <p className="text-white/40 text-sm">
                    {noResults}
                    <Link href="/contact" className="text-purple-400 hover:text-purple-300">
                      {contactUs}
                    </Link>
                  </p>
                )}
              </motion.section>
            )}
          </AnimatePresence>

          {/* ── Popular articles ── */}
          {!query.trim() && (
            <section>
              <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                🔥 {popularLabel}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {popular.map((a, i) => (
                  <motion.div
                    key={a.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <ArticleCard article={a} lang={lang} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* ── Category sections ── */}
          {!query.trim() && CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const articles = articlesByCategory[cat] ?? [];
            const catLabel = lang === 'he' ? meta.labelHe : meta.label;
            return (
              <motion.section
                key={cat}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                  <span className="text-2xl">{meta.icon}</span>
                  {catLabel}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {articles.map((a) => (
                    <ArticleCard key={a.slug} article={a} lang={lang} />
                  ))}
                </div>
              </motion.section>
            );
          })}

          {/* ── Still need help CTA ── */}
          {!query.trim() && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-14 px-6 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.08))',
                border: '1px solid rgba(139,92,246,0.15)',
              }}
            >
              <div className="text-4xl mb-4">🤔</div>
              <h2 className="text-white font-bold text-2xl mb-2">
                {lang === 'he' ? 'לא מצאת מה שחיפשת?' : "Couldn't find your answer?"}
              </h2>
              <p className="text-white/40 text-sm mb-8">
                {lang === 'he' ? 'הצוות שלנו כאן כדי לעזור' : "Our team is here to help"}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-blue-500 transition-all"
                >
                  💬 {lang === 'he' ? 'צור קשר' : 'Chat With Us'}
                </Link>
                <a
                  href="https://wa.me/972500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/12 text-white/70 hover:text-white font-semibold text-sm transition-all"
                >
                  📱 {lang === 'he' ? 'תמיכה ב-WhatsApp' : 'WhatsApp Support'}
                </a>
              </div>
            </motion.section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
