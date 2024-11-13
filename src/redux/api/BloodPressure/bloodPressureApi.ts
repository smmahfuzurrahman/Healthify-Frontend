import { baseApi } from "../api";

const bloodPressureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBloodPressure: builder.mutation({
      query: (payload) => {
        return {
          url: "/blood-pressure",
          method: "POST",
          body: payload,
        };
      },
    }),
    getBloodPressures: builder.query({
      query: () => {
        return {
          url: "/blood-pressure",
          method: "GET",
        };
      },
    }),
    removeBloodPressure: builder.mutation({
      query: (payload) => {
        return {
          url: `/blood-pressure/${payload.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useAddBloodPressureMutation,
  useGetBloodPressuresQuery,
  useRemoveBloodPressureMutation,
} = bloodPressureApi;
