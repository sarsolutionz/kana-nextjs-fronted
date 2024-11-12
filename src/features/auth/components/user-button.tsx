/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Loader, LogOut } from "lucide-react";
import { useCallback, useEffect } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import {
  useGetMemberInfoMutation,
  useSignOutMutation,
} from "@/redux/features/auth/authApi";

export const UserButton = () => {
  const router = useRouter();
  const access_token = useSelector((state: any) => state.auth.access_token);
  const memberInfo = useSelector((state: any) => state.user);

  const [signOut, { isLoading: isSignOutLoading }] = useSignOutMutation();
  const [getMemberInfo, { isLoading: isMemberLoading }] =
    useGetMemberInfoMutation();

  const fetchMemberInfo = useCallback(async () => {
    try {
      await getMemberInfo(access_token.access);
    } catch (error: any) {
      toast.error(error);
    }
  }, [getMemberInfo]);

  useEffect(() => {
    fetchMemberInfo();
  }, [fetchMemberInfo]);

  const isLoading = isSignOutLoading || isMemberLoading;

  if (isLoading) {
    <div className="h-full flex items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  };

  const handleLogout = async () => {
    await signOut(access_token.access);
    router.push("/sign-in");
    toast.success("Log out successfully");
  };

  if (!memberInfo.email) {
    return null;
  }

  const avatarFallback = memberInfo?.name
    ? memberInfo?.name.charAt(0).toUpperCase()
    : memberInfo?.email.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {memberInfo.name || "User"}
            </p>
            <p className="text-xs text-neutral-500">{memberInfo.email}</p>
          </div>
        </div>
        <Separator className="mb-1" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="h-10 flex items-center justify-center text-amber-70 font-medium cursor-pointer"
        >
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
