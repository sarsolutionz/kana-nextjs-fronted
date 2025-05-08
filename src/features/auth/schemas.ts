import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Required"),
});

export const registerSchema = z.object({
    name: z.string().trim().min(1, "Required"),
    number: z.string().regex(/^\d{10}$/, "Number must be a valid 10-digit phone number"),
    email: z.string().email(),
    password: z.string().min(8, "Minimum of 8 characters required"),
    password2: z.string().min(8, "Minimum of 8 characters required"),
});