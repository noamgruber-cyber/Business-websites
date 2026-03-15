'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { type HelpArticle } from '@/lib/helpArticles';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Props = {
  article: HelpArticle;
  related: HelpArticle[];
  toc: { id: string; text: string }[];
  categoryMeta: { icon: string; label: string; labelHe: string };
};

function addIdsToHeadings(html: string): string {
  return html.replace(/<h2>(.*?)<\/h2>/g, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<h2 id="${id}">${text}</h2>`;
  });
}

export default function HelpArticleClient({ article, related, toc, categoryMeta }: Props) {
  const { lang } = useLanguage();
  const [helpful, setHelpful] = useState<'yes' | 'no' | null>(null);

  const title   = lang === 'he' ? article.titleHe : article.title;
  const content = addIdsToHeadings(lang === 'he' ? article.contentHe : article.content);
  const catLabel = lang === 'he' ? categoryMeta.labelHe : categoryMeta.label;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0f] pt-16">

        {/* ── Breadcrumb ── */}
        <div className="border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-xs text-white/35 flex-wrap">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/help" className="hover:text-white/60 transition-colors">
              {lang === 'he' ? 'מרכז עזרה' : 'Help Center'}
            </Link>
            <span>›</span>
            <span className="text-white/50 flex items-center gap-1">
              {categoryMeta.icon} {catLabel}
            </span>
            <span>›</span>
            <span className="text-white/60 truncate max-w-xs">{title}</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex gap-10">

            {/* ── Main content ── */}
            <article className="flex-1 min-w-0">

              {/* Article header */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 font-medium border border-purple-500/20">
                    {categoryMeta.icon} {catLabel}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                  {title}
                </h1>
                <div className="flex items-center gap-5 text-white/30 text-xs">
                  <span>Last updated: March 2025</span>
                  <span>·</span>
                  <span>{article.views.toLocaleString()} views</span>
                  <span>·</span>
                  <span>{article.helpful} found this helpful</span>
                </div>
              </motion.div>

              {/* Article content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="help-prose"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* ── Was this helpful? ── */}
              <div className="mt-12 pt-8 border-t border-white/[0.07]">
                <p className="text-white/50 text-sm mb-4">
                  {lang === 'he' ? 'האם המאמר הזה עזר לך?' : 'Was this article helpful?'}
                </p>
                <AnimatePresence mode="wait">
                  {helpful ? (
                    <motion.p
                      key="thanks"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm font-medium"
                    >
                      {lang === 'he' ? '🙏 תודה על המשוב שלך!' : '🙏 Thanks for your feedback!'}
                    </motion.p>
                  ) : (
                    <motion.div
                      key="buttons"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <button
                        onClick={() => setHelpful('yes')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-green-500/15 border border-white/10 hover:border-green-500/30 text-white/50 hover:text-green-400 text-sm font-medium transition-all"
                      >
                        👍 {lang === 'he' ? 'כן' : 'Yes'}
                      </button>
                      <button
                        onClick={() => setHelpful('no')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-white/50 hover:text-red-400 text-sm font-medium transition-all"
                      >
                        👎 {lang === 'he' ? 'לא' : 'No'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-white/25 text-xs mt-6">
                  {lang === 'he' ? 'עדיין צריך עזרה?' : 'Still need help?'}{' '}
                  <Link href="/contact" className="text-purple-400 hover:text-purple-300">
                    {lang === 'he' ? 'צור קשר ←' : 'Contact us →'}
                  </Link>
                </p>
              </div>
            </article>

            {/* ── Sidebar ── */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">

                {/* TOC */}
                {toc.length > 0 && (
                  <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">
                      {lang === 'he' ? 'במאמר זה' : 'In this article'}
                    </p>
                    <ul className="space-y-2">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="text-white/45 hover:text-purple-300 text-xs leading-snug block transition-colors py-0.5"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related articles */}
                {related.length > 0 && (
                  <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">
                      {lang === 'he' ? 'מאמרים קשורים' : 'Related articles'}
                    </p>
                    <ul className="space-y-3">
                      {related.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={`/help/${r.slug}`}
                            className="text-white/50 hover:text-white text-xs leading-snug block transition-colors hover:translate-x-0.5"
                          >
                            → {lang === 'he' ? r.titleHe : r.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Article-specific styles */}
      <style jsx global>{`
        .help-prose h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin: 2rem 0 0.75rem;
          padding-left: 0.75rem;
          border-left: 3px solid #8b5cf6;
          scroll-margin-top: 80px;
        }
        .help-prose h3 {
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          margin: 1.5rem 0 0.5rem;
        }
        .help-prose p {
          font-size: 0.9375rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          margin-bottom: 1rem;
        }
        .help-prose ul, .help-prose ol {
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .help-prose ul { list-style-type: disc; }
        .help-prose ol { list-style-type: decimal; }
        .help-prose li {
          font-size: 0.9375rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          margin-bottom: 0.25rem;
        }
        .help-prose strong {
          color: rgba(255,255,255,0.85);
          font-weight: 600;
        }
        .help-prose code {
          background: rgba(139,92,246,0.15);
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: 6px;
          padding: 2px 6px;
          font-family: monospace;
          font-size: 0.85em;
          color: #c4b5fd;
        }
        .help-prose .tip {
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 12px;
          padding: 12px 16px;
          margin: 1.25rem 0;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
        }
      `}</style>

      <Footer />
    </>
  );
}
