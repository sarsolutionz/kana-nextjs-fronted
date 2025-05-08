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
    location_status: z.nativeEnum(LoactionStatus, { required_error: "Required" }),
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
    location_status: z.nativeEnum(LoactionStatus),
    vehicle_number: z.string(),
    capacity: z.number(),
});