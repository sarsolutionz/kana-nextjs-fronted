import { apiSlice } from "../api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardInfo: builder.query({
      query: ({ from, to }) => ({
        url: `dashboard/summary/?from=${from}&to=${to}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardInfoQuery } = dashboardApi;
