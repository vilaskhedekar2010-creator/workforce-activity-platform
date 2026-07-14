/**
 * ============================================================
 * WAMP Enterprise Platform
 * Institute Validation Schema
 * ============================================================
 */

import { z } from "zod";

export const createInstituteSchema = z.object({
  code: z
    .string()
    .trim()
    .min(2, "Institute code must contain at least 2 characters.")
    .max(20, "Institute code cannot exceed 20 characters.")
    .regex(
      /^[A-Z0-9_-]+$/,
      "Institute code may contain only uppercase letters, numbers, hyphen and underscore."
    ),

  name: z
    .string()
    .trim()
    .min(3, "Institute name must contain at least 3 characters.")
    .max(200, "Institute name cannot exceed 200 characters."),

  shortName: z
    .string()
    .trim()
    .max(50, "Short name cannot exceed 50 characters.")
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters.")
    .optional(),

  email: z
    .string()
    .trim()
    .email("Invalid email address.")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number cannot exceed 20 characters.")
    .optional(),

  website: z
    .string()
    .trim()
    .url("Invalid website URL.")
    .optional()
    .or(z.literal("")),

  addressLine1: z
    .string()
    .trim()
    .max(255)
    .optional(),

  addressLine2: z
    .string()
    .trim()
    .max(255)
    .optional(),

  city: z
    .string()
    .trim()
    .max(100)
    .optional(),

  state: z
    .string()
    .trim()
    .max(100)
    .optional(),

  country: z
    .string()
    .trim()
    .max(100)
    .optional(),

  postalCode: z
    .string()
    .trim()
    .max(20)
    .optional(),
});

export const updateInstituteSchema = createInstituteSchema.extend({
  id: z.string().uuid("Invalid Institute ID."),
});

export type CreateInstituteSchema = z.infer<typeof createInstituteSchema>;
export type UpdateInstituteSchema = z.infer<typeof updateInstituteSchema>;