'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEditorStore } from '@/lib/businessStore';
import { BusinessCategory, CATEGORIES } from '@/lib/types';

const VALID_CATEGORIES = new Set<BusinessCategory>([
  'barbershop', 'restaurant', 'nail_salon', 'gym', 'cafe', 'photography',
]);

function CreateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initBusiness } = useEditorStore();

  const paramCategory = searchParams.get('category') as BusinessCategory | null;
  const initialCategory = paramCategory && VALID_CATEGORIES.has(paramCategory) ? paramCategory : null;

  const [selected, setSelected] = useState<BusinessCategory | null>(initialCategory);

  useEffect(() => {
    if (initialCategory) setSelected(initialCategory);
  }, [initialCategory]);

  const handleContinue = () => {
    if (!selected) return;
    const id = crypto.randomUUID();
    initBusiness(id, selected);
    router.push(`/edit/${id}`);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-10 flex flex-col">

      {/* Top bar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between mb-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/40 hover:text-white/80 text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                n === 1 ? 'w-6 bg-purple-500' : 'w-3 bg-white/10'
              }`}
            />
          ))}
          <span className="text-white/35 text-xs ml-2">Step 1 of 5</span>
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-5xl mx-auto w-full text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
          What type of business do you have?
        </h1>
        <p className="text-white/45 text-base sm:text-lg">
          Choose your category to see matching templates
        </p>
      </div>

      {/* Category grid */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              className={`
                group relative text-left rounded-2xl border p-6 transition-all duration-200
                bg-white/[0.03] hover:bg-white/[0.06]
                ${isSelected
                  ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]'
                  : 'border-white/10 hover:border-purple-500/50 hover:scale-[1.01]'
                }
              `}
            >
              {/* Checkmark badge */}
              {isSelected && (
                <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}

              {/* Emoji */}
              <div
                className={`text-5xl mb-4 transition-transform duration-200 ${
                  isSelected ? 'scale-110' : 'group-hover:scale-105'
                }`}
              >
                {cat.emoji}
              </div>

              {/* Name */}
              <h2 className={`text-lg font-bold mb-1.5 transition-colors ${
                isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'
              }`}>
                {cat.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-white/40 leading-relaxed">{cat.description}</p>

              {/* Glow overlay when selected */}
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl bg-purple-500/5 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Continue button */}
      <div className="max-w-5xl mx-auto w-full mt-10">
        <div
          className={`transition-all duration-300 ${
            selected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={handleContinue}
            className="mx-auto flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-xl shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02]"
          >
            Continue
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </main>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CreateForm />
    </Suspense>
  );
}
