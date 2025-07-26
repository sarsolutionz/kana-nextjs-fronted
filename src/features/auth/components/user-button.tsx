/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { Loader, LogOut } from "lucide-react";
import { useEffect, useMemo } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import {
    useGetMemberInfoQuery,
    useSignOutMutation,
} from "@/redux/features/auth/authApi";

import { RootState } from "@/redux/store";
import { unsetMemberInfo } from "@/redux/features/auth/memberSlice";
import { unSetMember } from "@/redux/features/auth/authSlice";

export const UserButton = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const access_token = useSelector(
        (state: RootState) => state.auth.access_token?.access
    );

    const [signOut, { isLoading: isSignOutLoading }] = useSignOutMutation();

    const isAuthenticated = Boolean(access_token);
    const { data, isLoading: isMemberLoading, refetch } = useGetMemberInfoQuery(undefined, {
        skip: !isAuthenticated,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data, refetch]);

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
        try {
            if (access_token) {
                await signOut(access_token);
            }
        } catch (error) {
            console.error("Failed to log out:", error);
        }
        dispatch(unSetMember());
        dispatch(
            unsetMemberInfo({
                email: "",
                name: "",
            })
        );
        router.push("/sign-in");
        toast.success("Log out successfully");
    };

    const isLoading = isSignOutLoading || isMemberLoading;

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const avatarFallback = data?.name
        ? data?.name.charAt(0).toUpperCase()
        : data?.email.charAt(0).toUpperCase() ?? "U";

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition border border-[#4982a0]">
                    <AvatarFallback className="bg-[#1b5b7d] font-medium text-white flex items-center justify-center">
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
                    <Avatar className="size-[52px] border border-[#4982a0]">
                        <AvatarFallback className="bg-[#1b5b7d] text-xl font-medium text-white flex items-center justify-center">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm font-medium text-neutral-900">
                            {data.name || "User"}
                        </p>
                        <p className="text-xs text-neutral-500">{data.email}</p>
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
