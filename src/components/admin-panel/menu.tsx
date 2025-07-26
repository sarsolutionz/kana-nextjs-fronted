/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Loader, Ellipsis, LogOut } from "lucide-react";


import { GetMenuList } from "@/lib/menu-list";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { jwtDecode, JwtPayload } from "jwt-decode";

import { RootState } from "@/redux/store";
import { unSetMember } from "@/redux/features/auth/authSlice";
import { authApi, useSignOutMutation } from "@/redux/features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";

import { unsetMemberInfo } from "@/redux/features/auth/memberSlice";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = GetMenuList(pathname);

  const router = useRouter();
  const dispatch = useDispatch();

  const access_token = useSelector(
    (state: RootState) => state.auth.access_token?.access
  );
  const [signOut, { isLoading }] = useSignOutMutation();

  const tokenExpiration = useMemo(() => {
    if (!access_token) return null;
    try {
      const decoded: JwtPayload = jwtDecode(access_token);
      return decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
    } catch {
      return null;
    }
  }, [access_token]);

  useEffect(() => {
    if (!tokenExpiration) return;

    const timeLeft = tokenExpiration - Date.now();
    if (timeLeft <= 0) {
      handleLogout();
    } else {
      const timeout = setTimeout(() => {
        handleLogout();
      }, timeLeft);

      return () => clearTimeout(timeout); // Cleanup timer
    }
  }, [tokenExpiration]);

  const handleLogout = async () => {
    dispatch(unSetMember());
    dispatch(unsetMemberInfo({ email: "", name: "" }));
    await dispatch(authApi.util.resetApiState());

    try {
      if (access_token) {
        await signOut(access_token);
      }
    } catch (error) {
      console.error("Failed to log out:", error);
    }

    router.push("/sign-in");
    toast.success("Log out successfully");
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-72px)] lg:min-h-[calc(100vh-72px-40px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  !submenus || submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={
                                (active === undefined &&
                                  pathname.startsWith(href)) ||
                                  active
                                  ? "secondary"
                                  : "ghost"
                              }
                              className="w-full justify-start h-10 mb-1"
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={
                          active === undefined
                            ? pathname.startsWith(href)
                            : active
                        }
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-center h-10 mt-5"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
