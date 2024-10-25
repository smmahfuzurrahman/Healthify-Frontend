import { baseApi } from "../api";

const medicineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddMedicine: builder.mutation({
      query: (payload) => {
        return {
          url: "/medicines",
          method: "POST",
          body: payload,
        };
      },
    }),
    getUserMedicines: builder.query({
      query: () => {
        return {
          url: "/medicines",
          method: "GET",
        };
      },
    }),
    removeMedicine: builder.mutation({
      query: (payload) => {
        return {
          url: `/medicines/${payload.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useAddMedicineMutation, useGetUserMedicinesQuery , useRemoveMedicineMutation} = medicineApi;
