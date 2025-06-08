/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  UserPenIcon,
  Users,
  Settings,
  NotebookTextIcon,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
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

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        // {
        //   href: "",
        //   label: "Posts",
        //   icon: SquarePen,
        //   submenus: [
        //     {
        //       href: "/posts",
        //       label: "All Posts"
        //     },
        //     {
        //       href: "/posts/new",
        //       label: "New Post"
        //     }
        //   ]
        // },
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
          href: "/account",
          label: "Account",
          icon: Settings
        }
      ]
    }
  ];
}
