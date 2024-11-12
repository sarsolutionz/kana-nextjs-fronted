import { apiSlice } from "../api/apiSlice";
import { setMember, unSetMember } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        signUp: builder.mutation({
            query: (data) => ({
                url: "SignUp",
                method: "POST",
                body: data,
                credentials: "include" as const,
                headers: {
                    "Content-type": "application/json"
                }
            }),
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: "SignIn",
                method: "POST",
                body: data,
                credentials: "include" as const,
                headers: {
                    "Content-type": "application/json"
                }
            }),
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
                url: "logout",
                method: "POST",
                credentials: "include" as const,
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            }),
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
    }),
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } = authApi;