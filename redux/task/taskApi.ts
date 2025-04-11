import { Tag } from "@/types/Tag";
import { api } from "../api";

import { setWorkspaceTags } from "../Workspace/workspaceSlice";
import { setTaskInfo } from "./taskSlice";

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => {
        return {
          url: `/api/task`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setTaskInfo(result.data.task));
        } catch (error: any) {
          console.log("update user info error", error);
          console.log(error);
        }
      },
    }),
    getIndividualTask: builder.query({
      query: ({ taskId, workspaceId }) => {
        return {
          url: `/api/task/${workspaceId}/${taskId}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setTaskInfo(result.data.task));
          //dispatch(setWorkspaceTags(result.data.tags));
        } catch (error: any) {
          console.log("error while updating workspace tags");
          console.log(error);
        }
      },
    }),

    updateTask: builder.mutation({
      query: ({ taskId, data }) => {
        return {
          url: `/api/task/${taskId}`,
          method: "PATCH",
          body: data,
          credentials: "include" as const,
        };
      },
      invalidatesTags: ["singleWorkspace"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const taskTags = result.data.task.taskTags;

          dispatch(setTaskInfo(result.data.task));
        } catch (error: any) {
          console.log("error while updating workspace tags");
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useLazyGetIndividualTaskQuery,
  useUpdateTaskMutation,
} = taskApi;
