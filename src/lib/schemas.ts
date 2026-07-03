import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nombre demasiado corto").max(100),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
});

export const budgetSchema = z.object({
  name: z.string().min(2, "Nombre demasiado corto").max(100),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Teléfono inválido"),
  propertyType: z.enum(["piso", "casa", "local", "oficina", "otro"]),
  rooms: z.coerce.number().int().min(0).max(50).optional(),
  bathrooms: z.coerce.number().int().min(0).max(50).optional(),
  squareMeters: z.coerce.number().positive().optional(),
  description: z.string().min(10, "Describe brevemente el proyecto").max(5000),
  budgetRange: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type BudgetInput = z.infer<typeof budgetSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
