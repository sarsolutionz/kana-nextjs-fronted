"use client";

import { useEffect, useState } from "react";

import { FiltersInfo } from "@/features/members/components/filters-info";

export const Modals = () => {
    const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <FiltersInfo />
    </>
  );
}