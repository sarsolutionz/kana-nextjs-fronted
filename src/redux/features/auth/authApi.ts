import { apiSlice } from "../api/apiSlice";
import { setMember } from "./authSlice";

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
                        })
                    )
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.log(error)
                }
            }
        })
    })
});

export const { useSignUpMutation, useSignInMutation } = authApi;