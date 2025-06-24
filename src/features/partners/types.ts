export enum NotificationStatus {
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    REJECTED = "REJECTED",
};

export type Notification = {
    id: string,
    source: string,
    destination: string,
    rate: number,
    weight: number,
    message: string,
    contact: string,
    is_read: boolean,
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