import { baseApi } from "../api";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
    }),
    getUserProfile: builder.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
    }),
    usersActivities: builder.query({
      query: () => {
        return {
          url: "/users/activities",
          method: "GET",
        };
      },
    }),
    updateUserProfile: builder.mutation({
      query: (payload) => {
        return {
          url: "/users/me",
          method: "PUT",
          body: payload,
        };
      },
    }),
    promoteUser: builder.mutation({
      query: (userId) => {
        return {
          url: `/users/${userId}`,
          method: "PUT",
        };
      },
    }),
  }),
});
export const {
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUsersActivitiesQuery,
  usePromoteUserMutation
} = userApi;
