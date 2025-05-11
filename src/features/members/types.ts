export enum VehicleType {
    DEFAULT = "",
    OPEN = "open",
    CLOSE = "close",
}

export enum FileTypes {
    Image = "image",
    Pdf = "pdf",
    Audio = "audio",
    Video = "video",
    Other = "other",
}

export type Testimonial = {
    id: string;
    name: string;
    imgSrc: string;
    pdfSrc?: string;
    videoSrc?: string;
};

export enum VehicleStatus {
    DEFAULT = "",
    IN_PROGRESS = "IN_PROGRESS",
    IN_COMPLETE = "IN_COMPLETE",
    COMPLETED = "COMPLETED",
}

export enum LoactionStatus {
    DEFAULT = "",
    ON_LOCATION = "ON_LOCATION",
    OFF_LOCATION = "OFF_LOCATION",
    IN_TRANSIT = "IN_TRANSIT",
}

export enum VehicleName {
    BOLERO = "Bolero",
    BADA_DOST = "Bada Dost",
    INTRA = "Intra",
    FOURTEEN_FT = "14 FT",
    SEVENTEEN_FT = "17 FT",
    TWENTY_FT = "20 FT",
}

export type VehicleData = {
    id: string;
    model: VehicleName;
    name: string;
    number: string;
    alternate_number: string;
    address: string;
    vehicle_type: VehicleType.DEFAULT;
    location_status: LoactionStatus;
    vehicle_number: string;
    capacity: number;
    status: VehicleStatus;
};


export type NotificationData = {
    id: string;
    source: string;
    destination: string;
    rate: number;
    weight: number;
    date: string;
    message: string;
    contact: string;
}