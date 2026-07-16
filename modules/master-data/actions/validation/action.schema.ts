import { z } from "zod";

export const createActionSchema = z.object({
  module: z
    .string()
    .trim()
    .min(2)
    .max(100),

  action: z
    .string()
    .trim()
    .min(2)
    .max(100),

  code: z
    .string()
    .trim()
    .min(3)
    .max(150),

  description: z
    .string()
    .trim()
    .max(1000)
    .optional(),
});

export const updateActionSchema =
  createActionSchema.extend({
    id: z.string().uuid(),
  });

export type CreateActionSchema =
  z.infer<typeof createActionSchema>;

export type UpdateActionSchema =
  z.infer<typeof updateActionSchema>;