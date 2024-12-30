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