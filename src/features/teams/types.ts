export enum ActiveProfile {
    DEFAULT = "",
    ADMIN = "admin",
    STAFF = "staff",
}

export type TeamData = {
    id: string;
    name: string;
    is_active?: boolean;
    is_admin?: boolean;
    role: ActiveProfile.DEFAULT;
    email: string;
};