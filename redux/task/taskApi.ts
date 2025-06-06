import { api } from "../api";

import { setTaskInfo, setUserToTaskAssignee } from "./taskSlice";

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
      invalidatesTags: ["singleWorkspace"],
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
    asignUser: builder.mutation({
      query: (data) => {
        return {
          url: `/api/task/asign-user`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          //console.log("result", result.data.assignment);

          dispatch(setUserToTaskAssignee(result.data.assignment));
        } catch (error: any) {
          console.log("error while updating workspace tags");
          console.log(error);
        }
      },
    }),
    removeUserFromTask: builder.mutation({
      query: (data) => {
        return {
          url: `/api/task/remove-user`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result.data);

          //dispatch(setUserToTaskAssignee(result.data.assignment));
        } catch (error: any) {
          console.log("error while updating workspace tags");
          console.log(error);
        }
      },
    }),
    getTaskAssignedToMe: builder.query({
      query: ({ workspaceId, page = 1, limit = 10 }) => {
        return {
          url: `/api/task/${workspaceId}?page=${page}&limit=${limit}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // dispatch(
          //   setProject({
          //     projects: result.data.project,
          //     pagination: result.data.pagination,
          //   })
          // );
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
  useAsignUserMutation,
  useRemoveUserFromTaskMutation,
  useLazyGetTaskAssignedToMeQuery,
} = taskApi;
