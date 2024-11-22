"use client";

import { RootState } from "@/redux/store";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const access_token = useSelector(
    (state: RootState) => state.auth.access_token?.access
  );

  if (!user || !access_token) redirect("/sign-in");

  return <div>Dashboard</div>;
}
