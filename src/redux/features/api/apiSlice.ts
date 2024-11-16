import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/",
        prepareHeaders(headers, { getState }) {
            const accessToken = getState()?.auth?.access_token?.access;

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`); // Add Bearer token to headers
            }

            return headers;
        },
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (builder) => ({}),
});

export const {} = apiSlice;