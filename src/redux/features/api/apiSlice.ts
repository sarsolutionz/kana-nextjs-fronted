import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://46.202.162.117:8000/api/",
        prepareHeaders(headers, { getState }) {
            const accessToken = (getState() as RootState)?.auth?.access_token?.access;

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`); // Add Bearer token to headers
            }

            return headers;
        },
    }),
    tagTypes: ["Vehicle"],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (builder) => ({}),
});

export const { } = apiSlice;
