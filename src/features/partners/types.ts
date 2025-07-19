import { VehicleData } from "../members/types";

export enum NotificationStatus {
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    REJECTED = "REJECTED",
};

export type Notification = {
    id: string,
    created_by?: Creators,
    source: string,
    destination: string,
    vehicle: VehicleData,
    rate: number,
    weight: number,
    message: string,
    contact: string,
    is_read: boolean,
    is_accepted?: boolean,
    date: Date,
    created_at: string,
};

export type Partner = {
    id: string,
    name: string,
    email: string,
    number: number,
    is_deleted: boolean,
    created_at: Date,
    updated_at: Date,
}

export type Creators = {
    id: string,
    name: string,
    email: string,
    number: string,
}