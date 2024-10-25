import { baseApi } from "../api";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    storeMessage: builder.mutation({
      query: (payload) => {
        return {
          url: "/messages",
          method: "POST",
          body: payload,
        };
      },
    }),
    getUserConversation: builder.query({
      query: (userId) => {
        return {
          url: `/conversations/${userId}`,
          method: "GET",
        };
      },
    }),
    getSingleConversation: builder.query({
      query: (id) => {
        return {
          url: `/conversations/c/${id}`,
          method: "GET",
        };
      },
    }),
    createConversation: builder.mutation({
      query: (payload) => {
        return {
          url: "/conversations",
          method: "POST",
          body: payload,
        };
      },
    }),
    storeMessageInConversation: builder.mutation({
      query: (payload) => {
        return {
          url: `/conversations/${payload?.id}`,
          method: "PUT",
          body: {
            messageId: payload.messageId,
          },
        };
      },
    }),
  }),
});

export const {
  useStoreMessageInConversationMutation,
  useStoreMessageMutation,
  useCreateConversationMutation,
  useGetUserConversationQuery,
  useGetSingleConversationQuery
} = messageApi;
