import { z } from "zod";

export const bookZod = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean(),
});

export const borrowZod = z.object({
  book: z.string(),
  quantity: z.number(),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "dueDate must be a valid date string",
    }).optional(),
});
