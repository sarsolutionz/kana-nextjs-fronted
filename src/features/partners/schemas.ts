import { z } from "zod";

export const partnerFormSchema = z.object({
    name: z.string().trim().min(1, "Required"),
    number: z.string().regex(/^\d{10}$/, "Number must be a valid 10-digit phone number"),
    email: z.string().email(),
    is_deleted: z.boolean().default(false).optional(),
})

export const partnerSignUpSchema = z.object({
    full_name: z.string().trim().min(1, "Required"),
    number: z.string().regex(/^\d{10}$/, "Number must be a valid 10-digit phone number"),
    email: z.string().email(),
})