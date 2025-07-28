import { z } from "zod";
import { VehicleType, VehicleStatus, LoactionStatus, VehicleName } from "./types";

export const VehicleInfoSchema = z.object({
    model: z.nativeEnum(VehicleName, { required_error: "Required" }),
    name: z.string().min(1, "Required"),
    number: z.string().regex(/^\d{10}$/, "Number must be a valid 10-digit phone number"),
    alternate_number: z.string().regex(/^\d{10}$/, "Number must be a valid 10-digit phone number"),
    address: z.string().min(1, "Required"),
    vehicle_type: z.nativeEnum(VehicleType, { required_error: "Required" }),
    status: z.nativeEnum(VehicleStatus, { required_error: "Required" }),
    vehicle_number: z.string().regex(
        /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/,
        "Vehicle number must follow the format (e.g., GJ-05-ES-9658)"
    ),
    capacity: z.number().min(0.1, "Capacity must be at least 0.1"),
})

export const apiSchema = z.object({
    id: z.string().optional(),
    model: z.nativeEnum(VehicleName),
    name: z.string(),
    number: z.string(),
    alternate_number: z.string(),
    address: z.string(),
    vehicle_type: z.nativeEnum(VehicleType),
    status: z.nativeEnum(VehicleStatus),
    location_status: z.nativeEnum(LoactionStatus).optional(),
    vehicle_number: z.string(),
    capacity: z.number(),
});

export const createNotificationSchema = z.object({
    model: z.nativeEnum(VehicleName),
    source: z.string().min(1, "Required"),
    destination: z.string().min(1, "Required"),
    rate: z.number().min(1, "Required"),
    weight: z.number().min(1, "Required"),
    date: z.coerce.date(),
    message: z.string().min(1, "Required"),
    contact: z.string().regex(/^\d{10}$/, "Number must be a valid 10-digit phone number"),
})

export const createNotificationApiSchema = z.object({
    model: z.nativeEnum(VehicleName),
    source: z.string(),
    destination: z.string(),
    rate: z.number(),
    weight: z.number(),
    date: z.coerce.date(),
    message: z.string(),
    contact: z.string(),
})

export const DocumentsFormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one document.",
    }),
}) 