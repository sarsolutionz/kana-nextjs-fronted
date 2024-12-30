import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
<<<<<<< HEAD
        baseUrl: "http://api.kanalogistics.co:8000/api/",
=======
        baseUrl: "https://api.kanalogistics.co/api/",
>>>>>>> 9e9e1a2c88769bf101c60610c468266a21804c32
        prepareHeaders(headers, { getState }) {
            const accessToken = (getState() as RootState)?.auth?.access_token?.access;

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`); // Add Bearer token to headers
            }

            return headers;
        },
    }),
    tagTypes: ["Vehicle", "VehicleDocs"],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (builder) => ({}),
});

export const { } = apiSlice;
