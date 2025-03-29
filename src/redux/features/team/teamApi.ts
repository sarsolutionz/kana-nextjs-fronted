import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProfilesInfo: builder.query({
            query: () => ({
                url: "user/get-all-profiles",
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: ["user"],
        }),
        editUserById: builder.mutation({
            query: ({ id, data }) => ({
                url: `user/user-edit?user_id=${id}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `user/get-user?user_id=${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
            providesTags: ["user"],
        }),
    }),
});

export const { useGetAllProfilesInfoQuery, useEditUserByIdMutation, useGetUserByIdQuery } = teamApi;