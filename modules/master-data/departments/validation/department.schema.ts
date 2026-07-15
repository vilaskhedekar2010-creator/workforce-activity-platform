import { z } from "zod";

export const createDepartmentSchema = z.object({
  instituteId: z.string().uuid(),

  code: z
    .string()
    .trim()
    .min(2)
    .max(20),

  name: z
    .string()
    .trim()
    .min(3)
    .max(200),

  shortName: z
    .string()
    .trim()
    .max(50)
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000)
    .optional(),

  email: z
    .string()
    .email()
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .max(20)
    .optional(),
});

export const updateDepartmentSchema =
  createDepartmentSchema.extend({
    id: z.string().uuid(),
  });

export type CreateDepartmentSchema =
  z.infer<typeof createDepartmentSchema>;

export type UpdateDepartmentSchema =
  z.infer<typeof updateDepartmentSchema>;