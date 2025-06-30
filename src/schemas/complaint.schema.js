import { z } from "zod";

export const createComplaintSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  cinema: z.string().min(24), // ID de ObjectId
});
