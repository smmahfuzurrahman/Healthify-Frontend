import { baseApi } from "../api";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReport: builder.mutation({
      query: (payload) => {
        return {
          url: "/reports",
          method: "POST",
          body: payload,
        };
      },
    }),
    getReports: builder.query({
      query: () => {
        return {
          url: "/reports",
          method: "GET",
        };
      },
    }),
    getSingleReport: builder.query({
      query: (payload) => {
        return {
          url: `/reports/${payload.id}`,
          method: "GET",
        };
      },
    }),
    removeReport: builder.mutation({
      query: (payload) => {
        return {
          url: `/reports/${payload.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useAddReportMutation,
  useGetReportsQuery,
  useGetSingleReportQuery,
  useRemoveReportMutation,
} = reportApi;
