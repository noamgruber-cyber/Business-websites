'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { useEditorStore } from '@/lib/businessStore';
import StepIndicator from '@/components/editor/StepIndicator';
import Step1_BasicInfo from '@/components/editor/Step1_BasicInfo';
import Step2_Photos from '@/components/editor/Step2_Photos';
import Step3_Services from '@/components/editor/Step3_Services';
import Step4_Contact from '@/components/editor/Step4_Contact';
import Step5_Publish from '@/components/editor/Step5_Publish';
import LivePreview from '@/components/editor/LivePreview';

type Props = {
  params: { businessId: string };
};

const STEP_COMPONENTS = [
  Step1_BasicInfo,
  Step2_Photos,
  Step3_Services,
  Step4_Contact,
];

export default function EditPage({ params }: Props) {
  const { businessId } = params;
  const router = useRouter();
  const { businessData, currentStep, setStep } = useEditorStore();

  // Wait for client hydration before checking store
  const [mounted, setMounted] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [direction, setDirection] = useState(1); // 1=forward, -1=backward

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // If store is uninitialized or has a different ID, redirect to /create
    if (!businessData.id || businessData.id !== businessId) {
      router.replace('/create');
    }
  }, [mounted, businessData.id, businessId, router]);

  if (!mounted || !businessData.id) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Step 5 is full-screen
  if (currentStep === 5) {
    return <Step5_Publish />;
  }

  const step1Invalid = currentStep === 1 && businessData.businessName.trim() === '';
  const canGoNext = !step1Invalid;
  const canGoBack = currentStep > 1;

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setStep(currentStep + dir);
  };

  const StepComponent = STEP_COMPONENTS[currentStep - 1];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">

      {/* ── Top bar ── */}
      <header className="border-b border-white/[0.07] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          {/* Logo */}
          <span className="text-white font-black text-lg hidden sm:block">
            Site<span className="text-purple-400">Forge</span>
          </span>

          {/* Step indicator */}
          <div className="flex-1 flex justify-center">
            <StepIndicator currentStep={currentStep} />
          </div>

          {/* Step label (mobile) */}
          <span className="text-white/35 text-xs sm:hidden">
            {currentStep}/4
          </span>
        </div>
      </header>

      {/* ── Main content ── */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex gap-8">

        {/* LEFT: Form (60%) */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Animated step form */}
          <div className="flex-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={{
                  initial: (d: number) => ({ opacity: 0, x: d * 32 }),
                  animate: { opacity: 1, x: 0 },
                  exit:    (d: number) => ({ opacity: 0, x: d * -32 }),
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {StepComponent && <StepComponent />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.07]">
            <button
              onClick={() => canGoBack && navigate(-1)}
              disabled={!canGoBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <span className="text-white/20 text-xs hidden sm:block">
              Step {currentStep} of 5
            </span>

            <button
              onClick={() => canGoNext && navigate(1)}
              disabled={!canGoNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-bold transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
            >
              {currentStep === 4 ? 'Review & Publish' : 'Next'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT: Live Preview (40%) — hidden on mobile */}
        <aside className="hidden lg:block w-[380px] xl:w-[420px] flex-shrink-0">
          <LivePreview />
        </aside>
      </div>

      {/* ── Mobile: floating Preview button ── */}
      <button
        onClick={() => setPreviewOpen(true)}
        className="lg:hidden fixed bottom-6 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-xl shadow-purple-500/40 transition-all duration-200"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        Preview
      </button>

      {/* ── Mobile preview modal ── */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col"
            onClick={() => setPreviewOpen(false)}
          >
            <div
              className="m-4 mt-14 flex-1 overflow-hidden rounded-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full overflow-y-auto p-4 bg-[#0a0a0f]">
                <LivePreview />
              </div>
            </div>
            <button
              onClick={() => setPreviewOpen(false)}
              className="mx-auto mb-6 mt-2 px-6 py-2 rounded-full bg-white/10 text-white text-sm"
            >
              Close Preview
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
