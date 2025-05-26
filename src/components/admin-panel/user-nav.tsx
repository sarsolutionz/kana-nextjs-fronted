/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, LogOut, User, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import { jwtDecode, JwtPayload } from "jwt-decode";

import {
  useGetMemberInfoMutation,
  useSignOutMutation,
} from "@/redux/features/auth/authApi";

import { RootState } from "@/redux/store";
import { unSetMember } from "@/redux/features/auth/authSlice";
import { setMemberInfo, unsetMemberInfo } from "@/redux/features/auth/memberSlice";

export function UserNav() {
  const router = useRouter();
  const dispatch = useDispatch();

  const access_token = useSelector(
    (state: RootState) => state.auth.access_token?.access
  );
  const memberInfo = useSelector((state: RootState) => state.user);

  const [isFetched, setIsFetched] = useState(false);

  const [signOut, { isLoading: isSignOutLoading }] = useSignOutMutation();
  const [getMemberInfo, { isLoading: isMemberLoading }] =
    useGetMemberInfoMutation();

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

   const fetchMemberInfo = async () => {
    if (!access_token || isFetched) return;

    try {
      const response = await getMemberInfo(access_token).unwrap();
      if (!response?.email || !response?.name) {
        throw new Error("Invalid session. Please log in again.");
      }
      dispatch(setMemberInfo(response)); // Update Redux state
      setIsFetched(true); // Mark as fetched
    } catch {
      toast.error("Session expired. Please log in again.");
      handleLogout(); 
    }
  };

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

  useEffect(() => {
    fetchMemberInfo();
  }, [access_token]);

  const isLoading = isSignOutLoading || isMemberLoading;

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!memberInfo.email) {
    return null;
  }

  const avatarFallback = memberInfo?.name
    ? memberInfo?.name.charAt(0).toUpperCase()
    : memberInfo?.email.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">{avatarFallback}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{memberInfo.name || "John Doe"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {memberInfo.email || "johndoe@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
