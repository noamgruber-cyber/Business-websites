import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, helpArticles, getRelatedArticles, CATEGORY_META } from '@/lib/helpArticles';
import HelpArticleClient from './HelpArticleClient';

type Props = { params: Promise<{ articleSlug: string }> };

export function generateStaticParams() {
  return helpArticles.map((a) => ({ articleSlug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { articleSlug } = await params;
  const article = getArticleBySlug(articleSlug);
  if (!article) return { title: 'Article Not Found — SiteForge Help' };
  return {
    title: `${article.title} — SiteForge Help Center`,
    description: article.content.replace(/<[^>]+>/g, '').slice(0, 155),
  };
}

export default async function HelpArticlePage({ params }: Props) {
  const { articleSlug } = await params;
  const article = getArticleBySlug(articleSlug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, article.category, 3);
  const meta    = CATEGORY_META[article.category];

  // Extract TOC from h2 tags
  const tocRegex = /<h2>(.*?)<\/h2>/g;
  const toc: { id: string; text: string }[] = [];
  let match;
  while ((match = tocRegex.exec(article.content)) !== null) {
    toc.push({
      id: match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      text: match[1],
    });
  }

  return (
    <HelpArticleClient
      article={article}
      related={related}
      toc={toc}
      categoryMeta={meta}
    />
  );
}
