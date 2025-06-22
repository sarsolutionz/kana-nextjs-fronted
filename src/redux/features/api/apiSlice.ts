import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL!, // Base URL for the API
        prepareHeaders(headers, { getState }) {
            const accessToken = (getState() as RootState)?.auth?.access_token?.access;

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`); // Add Bearer token to headers
            }

            return headers;
        },
    }),
    tagTypes: ["Vehicle", "VehicleDocs", "Dashboard", "Notfication", "user"],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (builder) => ({}),
});

export const { } = apiSlice;
