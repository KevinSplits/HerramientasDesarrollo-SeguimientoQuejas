import { z } from "zod";

export const createCinemaSchema = z.object({
  name: z.string().min(3),
  address: z.string(),
  city: z.string(),
  phone: z.string(),
});
