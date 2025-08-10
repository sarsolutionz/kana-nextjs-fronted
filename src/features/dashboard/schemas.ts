import * as z from "zod";

export const Creators = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  number:  z.string().nullable().optional(),
});

export const dashboardFormSchema = z.object({
  id: z.string(),
  created_by: Creators.optional(),
  source: z.string(),
  destination: z.string(),
  vehicle_model: z.string().optional(),
  driver_number: z.string().optional(),
  vehicle_number: z.string().optional(),
  driver_name: z.string().optional(),
  rate: z.number(),
  weight: z.number(),
  message: z.string(),
  contact: z.string(),
  is_read: z.boolean(),
  date: z.coerce.date(),
  created_at: z.string().optional(),
  is_accepted: z.boolean().optional(),
  is_reserved: z.boolean().optional(),
  model: z.string().optional(),
  reserved_by: z.string().nullable().optional(),
});
