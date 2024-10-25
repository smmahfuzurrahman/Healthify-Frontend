import { baseApi } from "../api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // sign-up mutation
    signUp: builder.mutation({
      query: (credential) => {
        return {
          url: "/auth/sign-up",
          method: "POST",
          body: credential,
        };
      },
    }),
    // login mutation
    login: builder.mutation({
      query: (credential) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: credential,
        };
      },
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
