'use client';

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  type?: string;
  readOnly?: boolean;
  className?: string;
};

/**
 * Reusable dark-themed input field with label, helper text, and error state.
 */
export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  required = false,
  type = 'text',
  readOnly = false,
  className = '',
}: InputFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-purple-400 ml-1">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`
          bg-white/5 border rounded-xl px-4 py-3 text-white text-sm w-full
          placeholder:text-white/25 outline-none transition-all duration-200
          ${readOnly ? 'cursor-default opacity-60' : ''}
          ${
            error
              ? 'border-red-500/60 focus:border-red-500'
              : 'border-white/10 focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]'
          }
        `}
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
