"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

import { SignInCard } from "@/features/auth/components/sign-in-card";

const SignInPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.auth.user);
  if (user) redirect("/");

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <SignInCard />
      <div className="h-full bg-neutral-300 hidden lg:flex items-center justify-center flex-col">
        <Image src="/logo.png" alt="Logo" height={100} width={100} priority />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#113e57]">Kana Logistics</h1>
          <p className="text-[#113e57] text-sm capitalize">
            A division of Dr. kana pvt. ltd.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
