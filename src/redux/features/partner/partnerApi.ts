import { apiSlice } from "../api/apiSlice";

export const partnerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDriverInfo: builder.query({
            query: () => ({
                url: "mobile-auth/driver-info/",
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: ["Driver"],
        }),
        editPartnerById: builder.mutation({
            query: ({ id, data }) => ({
                url: `mobile-auth/update-driver?driver_id=${id}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Driver"],
        }),
        getPartnerById: builder.query({
            query: (id) => ({
                url: `mobile-auth/get-driver?driver_id=${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: ["Driver"],
        }),
        partnerSignUp: builder.mutation({
            query: (data) => ({
                url: "mobile-auth/signup/1/",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            invalidatesTags: ["Driver"],
        }),
    }),
});

export const {
    useGetDriverInfoQuery,
    useEditPartnerByIdMutation,
    useGetPartnerByIdQuery,
    usePartnerSignUpMutation,
} = partnerApi;
