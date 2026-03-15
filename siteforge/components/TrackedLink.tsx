'use client';

import { recordClick } from '@/lib/analytics';

type ClickType = 'whatsapp' | 'instagram' | 'phone' | 'facebook';

interface TrackedLinkProps {
  slug: string;
  type: ClickType;
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

/**
 * Drop-in replacement for <a> that fire-and-forgets a click event
 * to Firestore analytics before navigating normally.
 */
export default function TrackedLink({
  slug,
  type,
  href,
  children,
  className,
  target,
  rel,
  style,
  'aria-label': ariaLabel,
}: TrackedLinkProps) {
  const handleClick = () => {
    // Fire and forget — do not block navigation
    recordClick(slug, type).catch(() => {});
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
