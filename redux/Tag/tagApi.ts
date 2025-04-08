import { api } from "../api";
import { setImage, setUserData } from "../User/userSlice";
import { setWorkspaceTags } from "../Workspace/workspaceSlice";

export const tagApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTag: builder.mutation({
      query: (data) => {
        return {
          url: `/api/tag`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setWorkspaceTags(result.data.tags));
        } catch (error: any) {
          console.log("update user info error", error);
          console.log(error);
        }
      },
    }),
    updateTag: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/tag/${id}`,
          method: "PATCH",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setWorkspaceTags(result.data.tags));
        } catch (error: any) {
          console.log("update workspace tag error", error);
          console.log(error);
        }
      },
    }),
    deleteTag: builder.mutation({
      query: (data) => {
        return {
          url: `/api/tag/delete`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setWorkspaceTags(result.data.tags));
        } catch (error: any) {
          console.log("update workspace tag error", error);
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApi;
