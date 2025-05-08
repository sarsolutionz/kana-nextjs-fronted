import { z } from "zod";
import { ActiveProfile } from "./types";

export const createTeamSchema = z.object({
    name: z.string().trim().min(1, "Required"),
    number: z.string().regex(/^\d{10}$/, "Number must be a valid 10-digit phone number"),
    is_active: z.boolean().default(false).optional(),
    is_admin: z.boolean().default(false).optional(),
    role: z.nativeEnum(ActiveProfile, { required_error: "Required" }),
    email: z.string().email(),
});

export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().trim().min(1, "Required"),
    number: z.string().regex(/^\d{10}$/, "Number must be a valid 10-digit phone number"),
    password: z.string().min(8, "Minimum of 8 characters required"),
    password2: z.string().min(8, "Minimum of 8 characters required"),
})
    .refine((data) => data.password === data.password2, {
        message: "Passwords don't match",
        path: ["password2"]
    });