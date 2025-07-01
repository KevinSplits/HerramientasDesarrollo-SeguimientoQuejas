import { z } from "zod";

// Esquema para crear un cine
export const createCinemaSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  address: z.string().min(1, "La dirección es obligatoria"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  phone: z.string().optional(),
});

// Esquema para actualizar un cine
export const updateCinemaSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  address: z.string().min(1, "La dirección es obligatoria"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  phone: z.string().optional(),
});
