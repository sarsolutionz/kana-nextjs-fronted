export enum ActiveProfile {
    DEFAULT = "",
    ADMIN = "admin",
    STAFF = "staff",
}

export type TeamData = {
    id: string;
    name: string;
    number: string;
    is_active?: boolean;
    is_admin?: boolean;
    is_blocked?: boolean;
    role: ActiveProfile;
    email: string;
};