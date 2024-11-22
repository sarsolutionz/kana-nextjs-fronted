"use client";

import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-[500px] w-full flex items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default LoadingPage;
