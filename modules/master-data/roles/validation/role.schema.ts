import { z } from "zod";

export const createRoleSchema = z.object({
  code: z
    .string()
    .trim()
    .min(2)
    .max(30),

  name: z
    .string()
    .trim()
    .min(3)
    .max(200),

  description: z
    .string()
    .trim()
    .max(1000)
    .optional(),
});

export const updateRoleSchema =
  createRoleSchema.extend({
    id: z.string().uuid(),
  });

export type CreateRoleSchema =
  z.infer<typeof createRoleSchema>;

export type UpdateRoleSchema =
  z.infer<typeof updateRoleSchema>;