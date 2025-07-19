import * as z from "zod";

export const dashboardFormSchema = z.object({
  id: z.string(),
  source: z.string(),
  destination: z.string(),
  vehicle_model: z.string().optional(),
  driver_number: z.string().optional(),
  driver_name: z.string().optional(),
  rate: z.number(),
  weight: z.number(),
  message: z.string(),
  contact: z.string(),
  is_read: z.boolean(),
  date: z.coerce.date(),
  created_at: z.string().optional(),
});
