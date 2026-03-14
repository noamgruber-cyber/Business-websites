'use client';

const STEP_LABELS = ['Basic Info', 'Photos', 'Services', 'Contact & Hours'];

type StepIndicatorProps = {
  currentStep: number; // 1-based
};

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {STEP_LABELS.map((label, index) => {
        const step = index + 1;
        const isCompleted = currentStep > step;
        const isCurrent   = currentStep === step;

        return (
          <div key={step} className="flex items-center gap-2 sm:gap-3">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  transition-all duration-300
                  ${isCurrent
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                    : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-white/35'
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>

              {/* Label (hidden on xs) */}
              <span
                className={`hidden sm:block text-xs font-medium whitespace-nowrap transition-colors ${
                  isCurrent ? 'text-white' : isCompleted ? 'text-green-400' : 'text-white/30'
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEP_LABELS.length - 1 && (
              <div
                className={`h-px w-6 sm:w-12 mb-4 sm:mb-5 transition-all duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
