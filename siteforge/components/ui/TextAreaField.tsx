'use client';

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  className?: string;
};

/**
 * Reusable dark-themed textarea with character counter and error state.
 */
export default function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  required = false,
  maxLength,
  rows = 4,
  className = '',
}: TextAreaFieldProps) {
  const nearLimit = maxLength ? value.length > maxLength * 0.85 : false;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label row with optional character counter */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white/80">
          {label}
          {required && <span className="text-purple-400 ml-1">*</span>}
        </label>
        {maxLength !== undefined && (
          <span
            className={`text-xs tabular-nums transition-colors ${
              nearLimit ? 'text-amber-400' : 'text-white/30'
            }`}
          >
            {value.length} / {maxLength}
          </span>
        )}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={`
          bg-white/5 border rounded-xl px-4 py-3 text-white text-sm w-full
          placeholder:text-white/25 outline-none transition-all duration-200
          resize-none
          ${
            error
              ? 'border-red-500/60 focus:border-red-500'
              : 'border-white/10 focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]'
          }
        `}
        style={{ minHeight: `${Math.max(rows * 28, 120)}px` }}
      />

      {helperText && !error && (
        <p className="text-xs text-white/35">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
