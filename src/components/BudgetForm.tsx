"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi2";
import { budgetSchema, type BudgetInput } from "@/lib/schemas";
import { Input, Select, TextArea } from "./Input";
import { Button } from "./Button";
import { Sound } from "@/lib/sound";

const propertyTypes = [
  { value: "piso", label: "Piso / Apartamento" },
  { value: "casa", label: "Casa / Chalet" },
  { value: "local", label: "Local comercial" },
  { value: "oficina", label: "Oficina" },
  { value: "otro", label: "Otro" },
];

const budgetRanges = [
  { value: "menos-5000", label: "Menos de 5.000€" },
  { value: "5000-15000", label: "5.000€ - 15.000€" },
  { value: "15000-30000", label: "15.000€ - 30.000€" },
  { value: "30000-50000", label: "30.000€ - 50.000€" },
  { value: "mas-50000", label: "Más de 50.000€" },
  { value: "no-estoy-seguro", label: "No estoy seguro" },
];

export function BudgetForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetInput>({
    resolver: zodResolver(budgetSchema),
  });

  const onSubmit = async (data: BudgetInput) => {
    setStatus("loading");
    Sound.play("submit");
    try {
      const res = await fetch("/api/presupuesto", {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          id="budget-name"
          label="Nombre completo"
          placeholder="Tu nombre"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          id="budget-email"
          label="Email"
          type="email"
          placeholder="tu@email.com"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <Input
        id="budget-phone"
        label="Teléfono"
        type="tel"
        placeholder="+34 600 000 000"
        {...register("phone")}
        error={errors.phone?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Select
          id="budget-type"
          label="Tipo de inmueble"
          options={propertyTypes}
          {...register("propertyType")}
          error={errors.propertyType?.message}
        />
        <Input
          id="budget-rooms"
          label="Habitaciones"
          type="number"
          min={0}
          placeholder="Ej: 3"
          {...register("rooms")}
          error={errors.rooms?.message}
        />
        <Input
          id="budget-area"
          label="Metros cuadrados"
          type="number"
          step="0.1"
          placeholder="Ej: 80"
          {...register("squareMeters")}
          error={errors.squareMeters?.message}
        />
      </div>

      <Select
        id="budget-range"
        label="Rango de presupuesto"
        options={budgetRanges}
        {...register("budgetRange")}
      />

      <TextArea
        id="budget-description"
        label="Describe tu proyecto"
        rows={6}
        placeholder="Cuéntanos qué necesitas reformar, materiales que te gustan, estilo deseado..."
        {...register("description")}
        error={errors.description?.message}
      />

      <Button type="submit" loading={status === "loading"} className="w-full sm:w-auto">
        Solicitar Presupuesto
      </Button>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-lg"
        >
          <HiCheckCircle className="flex-shrink-0" />
          Presupuesto solicitado correctamente. Te contactaremos en 24h.
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-lg"
        >
          <HiExclamationCircle className="flex-shrink-0" />
          Error al enviar. Inténtalo de nuevo o llámanos al 900 123 456.
        </motion.div>
      )}
    </form>
  );
}
