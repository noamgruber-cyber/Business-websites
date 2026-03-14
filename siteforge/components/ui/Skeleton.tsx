"use client";

/**
 * Skeleton loading placeholder components.
 * Uses the .skeleton CSS class with pulsing animation from globals.css.
 */

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

export function SkeletonBusinessCard() {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
      {/* Cover */}
      <div className="h-40 skeleton rounded-none" />

      {/* Info */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <Skeleton className="h-5 w-36 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <Skeleton className="h-3 w-20 rounded-md" />
        <Skeleton className="h-3 w-44 rounded-md" />

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="flex-1 h-9 rounded-xl" />
          <Skeleton className="flex-1 h-9 rounded-xl" />
          <Skeleton className="w-9 h-9 rounded-xl flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonDashboardGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBusinessCard key={i} />
      ))}
    </div>
  );
}
