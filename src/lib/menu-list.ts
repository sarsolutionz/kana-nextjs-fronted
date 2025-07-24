/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import {
  UserPenIcon,
  Users,
  Settings,
  NotebookTextIcon,
  LayoutGrid,
  LucideIcon,
  UserCog,
  Wrench,
  Palette,
  BellRing,
  AppWindow
} from "lucide-react";

import { useGetMemberInfoQuery } from "@/redux/features/auth/authApi";
import { useGetDisplayUrlQuery } from "@/redux/features/vehicle/vehicleApi";

type Submenu = {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function GetMenuList(pathname: string): Group[] {
  const { data: getRole } = useGetMemberInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: getDisplay } = useGetDisplayUrlQuery({
    role: getRole?.role,
  }, {
    refetchOnMountOrArgChange: true,
    skip: !getRole?.role,  // Skip query until role exists
  });

  const availableItems = getDisplay?.data[0]?.items || [];

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

  const filteredMenuData = menuData.map(group => {
    return {
      ...group,
      menus: group.menus
        .map(menu => {
          if (menu.submenus) {
            menu.submenus = menu.submenus.filter(submenu =>
              availableItems.includes(submenu.label.toLowerCase())
            );
          }
          return menu;
        })
        .filter(menu => {
          const isMenuValid = availableItems.includes(menu.label.toLowerCase());
          const isSubmenuValid = menu.submenus && menu.submenus.length > 0;
          return isMenuValid || isSubmenuValid;
        })
    };
  })
    .filter(group => group.menus.length > 0);

  return filteredMenuData;
}
