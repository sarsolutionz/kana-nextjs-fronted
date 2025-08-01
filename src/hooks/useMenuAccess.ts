/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
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

import { useGetMemberInfoQuery } from "@/redux/features/auth/authApi";
import { useGetDisplayUrlQuery } from "@/redux/features/vehicle/vehicleApi";

export const useMenuAccess = () => {
    const access_token = useSelector((state: RootState) => state.auth.access_token?.access);
    const isAuthenticated = Boolean(access_token);
    const { data: getRole } = useGetMemberInfoQuery(undefined, {
        skip: !isAuthenticated,
        refetchOnMountOrArgChange: true,
    });

    const { data: getDisplay } = useGetDisplayUrlQuery({
        role: getRole?.role,
    }, {
        skip: !getRole?.role,
        refetchOnMountOrArgChange: true,
    });

    // Initialize availableItems from localStorage if present
    const [availableItems, setAvailableItems] = useState<string[]>(() => {
        const storedItems = localStorage.getItem("availableItems");
        return storedItems ? JSON.parse(storedItems) : [];
    });

    // Update availableItems when the `getDisplay` data changes
    useEffect(() => {
        if (getDisplay?.data?.length > 0) {
            const fetchedItems = getDisplay.data[0]?.items?.map((item: any) => item.toLowerCase()) || [];
            setAvailableItems(fetchedItems);
            localStorage.setItem("availableItems", JSON.stringify(fetchedItems)); // Persist to localStorage
        }
    }, [getDisplay]);

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