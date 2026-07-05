"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Sound } from "@/lib/sound";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-semibold text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          onFocus={() => Sound.play("focus")}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-black/50 border text-white",
            "placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent",
            "transition-all duration-200",
            error ? "border-red-500 ring-1 ring-red-500" : "border-gray-700 hover:border-gray-600",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-semibold text-gray-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          onFocus={() => Sound.play("focus")}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-black/50 border text-white",
            "focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent",
            "transition-all duration-200",
            error ? "border-red-500 ring-1 ring-red-500" : "border-gray-700 hover:border-gray-600",
            className
          )}
          {...props}
        >
          <option value="">Selecciona una opción</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-red-400 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-semibold text-gray-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          onFocus={() => Sound.play("focus")}
          className={cn(
            "w-full px-4 py-3 rounded-lg resize-none",
            "bg-black/50 border text-white",
            "placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent",
            "transition-all duration-200",
            error ? "border-red-500 ring-1 ring-red-500" : "border-gray-700 hover:border-gray-600",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
