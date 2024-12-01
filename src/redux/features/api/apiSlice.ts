import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../auth/authSlice";

// Helper function to get CSRF token from cookies
function getCSRFToken() {
    const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
    if (csrfToken) {
        return csrfToken.split('=')[1];
    }
    return null;
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://46.202.162.117:8000/api/",
        prepareHeaders(headers, { getState }) {
            const accessToken = (getState() as RootState)?.auth?.access_token?.access;

            // Add Authorization header if the access token is available
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }

            // Add CSRF token if available
            const csrfToken = getCSRFToken();
            if (csrfToken) {
                headers.set('X-CSRFToken', csrfToken); // Add CSRF token to request header
            }

            return headers;
        },
    }),
    tagTypes: ["Vehicle"],
    // No endpoints defined, so remove this part if unused
});
