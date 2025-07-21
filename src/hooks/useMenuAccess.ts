/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    UserPenIcon,
    Users,
    Settings,
    NotebookTextIcon,
    LayoutGrid,
    UserCog,
    Wrench,
    Palette,
    AppWindow
} from "lucide-react";
import { useMemo } from "react";
import { useGetMemberInfoQuery } from "@/redux/features/auth/authApi";
import { useGetDisplayUrlQuery } from "@/redux/features/vehicle/vehicleApi";

export const useMenuAccess = () => {
    const { data: getRole } = useGetMemberInfoQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const { data: getDisplay } = useGetDisplayUrlQuery({
        role: getRole?.role,
    }, {
        skip: !getRole?.role,
        refetchOnMountOrArgChange: true,
    });

    const availableItems = useMemo(() =>
        getDisplay?.data[0]?.items?.map((item: any) => item.toLowerCase()) || [],
        [getDisplay]
    );

    const isRouteAllowed = (pathname: string) => {
        const menuData = [
            {
                groupLabel: "",
                menus: [
                    {
                        href: "/dashboard",
                        label: "Dashboard",
                        icon: LayoutGrid,
                    }
                ]
            },
            {
                groupLabel: "Contents",
                menus: [
                    {
                        href: "/members",
                        label: "Members",
                        icon: NotebookTextIcon
                    },
                    {
                        href: "/teams",
                        label: "Teams",
                        icon: UserPenIcon
                    }
                ]
            },
            {
                groupLabel: "Settings",
                menus: [
                    {
                        href: "/partners",
                        label: "Partners",
                        icon: Users
                    },
                    {
                        href: "/settings",
                        label: "Settings",
                        icon: Settings,
                        submenus: [
                            {
                                href: "/settings",
                                label: "Profile",
                                icon: UserCog
                            },
                            {
                                href: "/settings/account",
                                label: "Account",
                                icon: Wrench,
                            },
                            {
                                href: "/settings/appearance",
                                label: "Appearance",
                                icon: Palette,
                            },
                            // {
                            //   href: "/settings/notifications",
                            //   label: "Notifications",
                            //   icon: BellRing,
                            // },
                            {
                                href: "/settings/display",
                                label: "Display",
                                icon: AppWindow,
                            },
                        ]
                    }
                ]
            }
        ];

        // Check if pathname exists in menu and is available
        return menuData.some(group =>
            group.menus.some(menu => {
                const menuMatch = pathname === menu.href &&
                    availableItems.includes(menu.label.toLowerCase());
                const submenuMatch = menu.submenus?.some(
                    sub => pathname === sub.href &&
                        availableItems.includes(sub.label.toLowerCase())
                );
                return menuMatch || submenuMatch;
            })
        );
    };

    return { isRouteAllowed, availableItems };
}