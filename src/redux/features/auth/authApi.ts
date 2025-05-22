import { apiSlice } from "../api/apiSlice";
import { setMember, unSetMember } from "./authSlice";
import { setMemberInfo } from "./memberSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        signUp: builder.mutation({
            query: (data) => ({
                url: "user/SignUp",
                method: "POST",
                body: data,
                credentials: "include" as const,
                headers: {
                    "Content-type": "application/json"
                }
            }),
            invalidatesTags: ["user"],
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: "user/SignIn",
                method: "POST",
                body: data,
                credentials: "include" as const,
                headers: {
                    "Content-type": "application/json"
                }
            }),
            invalidatesTags: ["user"],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        setMember({
                            access_token: result.data.token,
                            user: result.data.user,
                            email: result.data.email,
                        })
                    )
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.log(error)
                }
            }
        }),
        signOut: builder.mutation({
            query: (access_token) => ({
                url: "user/logout",
                method: "POST",
                credentials: "include" as const,
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            }),
            invalidatesTags: ["user"],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;  // Wait for the query to complete
                    dispatch(
                        unSetMember()
                    );
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.log("Logout failed:", error)
                }
            }
        }),
        getMemberInfo: builder.mutation({
            query: (access_token) => ({
                url: "user/profile",
                method: "GET",
                credentials: "include" as const,
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            }),
            invalidatesTags: ["user"],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        setMemberInfo({
                            email: result.data.email,
                            name: result.data.name,
                        })
                    )
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.log(error)
                }
            }
        }),
        deleteDriverById: builder.mutation({
            query: (id) => ({
                url: `mobile-auth/delete-user?driver_id=${id}`,
                method: "POST",
                credentials: "include" as const,
            }),
            invalidatesTags: ["user"],
        }),
    }),
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation, useGetMemberInfoMutation, useDeleteDriverByIdMutation } = authApi;