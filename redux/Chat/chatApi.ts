import { api } from "../api";
import { setMessages } from "./chatSlice";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConversation: builder.query({
      query: ({ workspaceId, chatId, page = 1 }) => {
        return {
          url: `/api/chat/${workspaceId}/${chatId}?page=${page}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log("conversation", result.data.conversation.Messages);
          dispatch(setMessages(result.data.conversation.Messages));
        } catch (error: any) {
          console.log("error while updating workspace minmap");
          console.log(error);
        }
      },
    }),
    saveMessage: builder.mutation({
      query: (data) => {
        return {
          url: `/api/chat`,
          method: "POST",
          credentials: "include" as const,
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log("reuslt", result.data);
        } catch (error: any) {
          console.log("error while updating workspace minmap");
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLazyGetConversationQuery, useSaveMessageMutation } = chatApi;
