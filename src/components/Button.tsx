"use client";

import { motion } from "framer-motion";
import { Sound } from "@/lib/sound";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationEnd"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  withSound?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25 hover:shadow-red-600/40",
  secondary:
    "bg-white text-red-600 hover:bg-gray-100 shadow-lg",
  outline:
    "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
  ghost:
    "text-red-400 hover:text-red-300 hover:bg-white/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  withSound = true,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (withSound) Sound.play("click");
    onClick?.(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center font-bold rounded-lg",
        "transition-colors duration-200 cursor-pointer",
        "tracking-wide uppercase",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      onMouseEnter={() => withSound && Sound.play("hover")}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Procesando...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
