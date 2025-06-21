"use client";

import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

import { FaPiggyBank, FaUsers, FaThinkPeaks } from "react-icons/fa";

import { DataCard, DataCardLoading } from "@/components/data-card";
import { useGetSummary } from "@/hooks/use-get-summary";

export const DataGrid = () => {
  const summary = useGetSummary();
  const incomeAmount = summary?.incomeAmount;
  const incomeChange = summary?.incomeChange;
  const activeUsers = summary?.ActiveUsers;
  const ActiveUsersChange = summary?.ActiveUsersChange;
  const isLoading = summary?.isLoading;

  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRangeLabel = formatDateRange({ to, from });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Total Revenue"
        value={incomeAmount}
        percentageChange={incomeChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Active Now"
        value={activeUsers}
        percentageChange={ActiveUsersChange}
        icon={FaThinkPeaks}
        variant="default"
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Subscriptions"
        value={activeUsers}
        percentageChange={ActiveUsersChange}
        icon={FaUsers}
        variant="default"
        dateRange={dateRangeLabel}
      />
    </div>
  );
};
