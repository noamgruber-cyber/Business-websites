"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useState, useEffect } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  success?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "shimmer-btn text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50",
  secondary:
    "border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-colors",
  danger:
    "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 transition-colors",
  ghost:
    "text-white/60 hover:text-white hover:bg-white/5 transition-colors",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs font-semibold rounded-lg",
  md: "px-6 py-2.5 text-sm font-bold rounded-xl",
  lg: "px-8 py-3.5 text-base font-bold rounded-2xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  success = false,
  children,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const t = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileTap={isDisabled ? {} : { scale: 0.96 }}
      whileHover={isDisabled ? {} : { y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      disabled={isDisabled}
      className={[
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        "relative inline-flex items-center justify-center gap-2 select-none",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0"
        />
      )}
      {showSuccess && !loading && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex-shrink-0"
        >
          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.span>
      )}
      <span className={loading ? "opacity-70" : ""}>{children}</span>
    </motion.button>
  );
}
