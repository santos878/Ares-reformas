"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi2";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { Input, TextArea } from "./Input";
import { Button } from "./Button";
import { Sound } from "@/lib/sound";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    Sound.play("submit");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error");
      Sound.play("success");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      Sound.play("error");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        id="contact-name"
        label="Nombre completo"
        placeholder="Tu nombre"
        {...register("name")}
        error={errors.name?.message}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          id="contact-email"
          label="Email"
          type="email"
          placeholder="tu@email.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          id="contact-phone"
          label="Teléfono (opcional)"
          type="tel"
          placeholder="+34 600 000 000"
          {...register("phone")}
        />
      </div>
      <TextArea
        id="contact-message"
        label="Mensaje"
        rows={5}
        placeholder="Cuéntanos en qué podemos ayudarte..."
        {...register("message")}
        error={errors.message?.message}
      />

      <Button type="submit" loading={status === "loading"} className="w-full sm:w-auto">
        Enviar Mensaje
      </Button>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-lg"
        >
          <HiCheckCircle className="flex-shrink-0" />
          Mensaje enviado correctamente. Te responderemos pronto.
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg"
        >
          <HiExclamationCircle className="flex-shrink-0" />
          Error al enviar. Inténtalo de nuevo o llámanos.
        </motion.div>
      )}
    </form>
  );
}
