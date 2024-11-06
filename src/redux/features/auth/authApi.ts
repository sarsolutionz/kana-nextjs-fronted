import { apiSlice } from "../api/apiSlice";

type SignUpResponse = {
    token: string;
    msg: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SignUpData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        signUp: builder.mutation<SignUpResponse, SignUpData>({
            query: (data) => ({
                url: "SignUp",
                method: "POST",
                body: data,
                credentials: "include" as const,
                headers: {
                    "Content-type": "application/json"
                }
            }),
        })
    })
});

export const { useSignUpMutation } = authApi;