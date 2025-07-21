export type ProfileData = {
    id: string;
    name: string;
    number: string;
    is_active: boolean;
    is_admin: boolean;
    is_blocked: boolean;
    email: string;
};

export const items = [
    {
        id: "dashboard",
        label: "Dashboard",
    },
    {
        id: "members",
        label: "Members",
    },
    {
        id: "teams",
        label: "Teams",
    },
    {
        id: "partners",
        label: "Partners",
    },
    {
        id: "profile",
        label: "Profile",
    },
    {
        id: "account",
        label: "Account",
    },
    {
        id: "appearance",
        label: "Appearance",
    },
    // {
    //     id: "notifications",
    //     label: "Notifications",
    // },
    {
        id: "display",
        label: "Display",
    },
] as const;
