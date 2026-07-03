"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi2";
import { newsletterSchema, type NewsletterInput } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { Sound } from "@/lib/sound";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterInput) => {
    setStatus("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      Sound.play("success");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      Sound.play("error");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="email"
            placeholder="tu@email.com"
            {...register("email")}
            className={cn(
              "w-full px-4 py-3 rounded-lg bg-black/50 border text-white placeholder:text-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent",
              errors.email ? "border-red-500" : "border-gray-700"
            )}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={status === "loading"}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
          onMouseEnter={() => Sound.play("hover")}
        >
          {status === "loading" ? "..." : "Suscribirse"}
        </motion.button>
      </div>
      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 text-green-400 text-sm mt-2"
        >
          <HiCheckCircle /> ¡Suscrito correctamente!
        </motion.p>
      )}
    </form>
  );
}
