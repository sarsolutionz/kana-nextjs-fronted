"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const WelcomeMsg = () => {
  const memberInfo = useSelector((state: RootState) => state.user);

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome Back{", "}
        {memberInfo?.name} 👋
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your Transport Overview Report
      </p>
    </div>
  );
};
