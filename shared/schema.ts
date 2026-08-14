import { z } from "zod";

export const insertContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  businessType: z.string().optional(),
  message: z.string().min(1),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = InsertContact & { id: number; createdAt: Date };
