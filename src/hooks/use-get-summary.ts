import { useSearchParams } from "next/navigation";

import { useGetDashboardInfoQuery } from "@/redux/features/dashboard/dashboardApi";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const response = useGetDashboardInfoQuery({ from, to });
  if (response.status) {
    const { data, isLoading, isSuccess, refetch, error } = response;
    const {
      categories = [],
      days = [],
      incomeAmount = 0,
      incomeChange = 0,
      ActiveUsers = 0,
      ActiveUsersChange = 0,
      notifications = [],
    } = data?.data || {};

    return {
      isLoading,
      isSuccess,
      refetch,
      error,
      incomeAmount,
      incomeChange,
      ActiveUsers,
      ActiveUsersChange,
      categories,
      days,
      notifications,
    };
  }
};
