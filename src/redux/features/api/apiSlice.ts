import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://46.202.162.117:8000/api/",
        prepareHeaders(headers, { getState }) {
            // Retrieve access token from state
            const accessToken = (getState() as RootState)?.auth?.access_token?.access;

            // Set the Authorization header if the access token exists
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }

            // Retrieve CSRF token from cookies (adjust cookie name if necessary)
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];

            // Set CSRF token header if it exists
            if (csrfToken) {
                headers.set('X-CSRFToken', csrfToken);
            }

            return headers;
        },
    }),
    tagTypes: ["Vehicle"],
    endpoints: (builder) => ({}),
});

export const { } = apiSlice;
