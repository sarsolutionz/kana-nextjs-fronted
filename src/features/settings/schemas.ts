import * as z from "zod";
import { fontConfig, type FontKey } from "@/lib/fonts"
import { ActiveProfile } from "../teams/types";

export const profileFormSchema = z.object({
    email: z.string().email(),
    name: z.string().trim().min(1, "Required"),
    number: z.string().regex(/^\d{10}$/, "Number must be a valid 10-digit phone number"),
    is_active: z.boolean().default(false).optional(),
    is_admin: z.boolean().default(false).optional(),
    is_blocked: z.boolean().default(false).optional(),
})

export const accountFormSchema = z.object({
    current: z.string().min(8, { message: "Please enter at least 8 characters." }),
    password: z.string().min(8, { message: "Please enter at least 8 characters." }),
    confirm: z.string().min(8, { message: "Please enter at least 8 characters." }),
}).refine((data) => data.password === data.confirm, {
    message: "Password does not match.",
    path: ["confirm"]
});;

export const fonts = Object.keys(fontConfig) as [FontKey, ...FontKey[]]

export const fontSchema = {
    font: fonts[0],
} as const

export type Font = FontKey;

export const appearanceFormSchema = z.object({
    theme: z.enum(['light', 'dark'], {
        required_error: 'Please select a theme.',
    }),
    font: z.enum(fonts, {
        invalid_type_error: 'Select a font',
        required_error: 'Please select a font.',
    }),
});

export const notificationsFormSchema = z.object({
    type: z.enum(['all', 'mentions', 'none'], {
        required_error: 'You need to select a notification type.',
    }),
    mobile: z.boolean().default(false).optional(),
    communication_emails: z.boolean().default(false).optional(),
    social_emails: z.boolean().default(false).optional(),
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
});

export const displayFormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one item.',
    }),
    role: z.nativeEnum(ActiveProfile, { required_error: "Required" })
        .refine((val) => val !== "", { message: "Role is required." }),
});
