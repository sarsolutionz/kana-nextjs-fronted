"use client";

import { Table } from "@tanstack/react-table";

import { useEffect, useState } from "react";

import { FiltersInfo } from "@/features/members/components/filters-info";

interface TableProps<TData> {
  table?: Table<TData>;
}

export const Modals = <TData,>({ table }: TableProps<TData>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <FiltersInfo table={table} />
    </>
  );
};
