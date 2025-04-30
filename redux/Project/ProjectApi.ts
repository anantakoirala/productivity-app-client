import { api } from "../api";
import { setProject, setTasks, setTotalPages } from "./ProjectSlice";

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => {
        return {
          url: `/api/project`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      invalidatesTags: ["singleWorkspace"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result);
          //dispatch(setWorkspaceTags(result.data.tags));
        } catch (error: any) {
          console.log("error while creating project", error);
          console.log(error);
        }
      },
    }),
    getIndividualProject: builder.query({
      query: ({ projectId, workspaceId, page = 1, limit = 10 }) => {
        return {
          url: `/api/project/${workspaceId}/${projectId}?page=${page}&limit=${limit}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result.data.pagination);
          dispatch(setTasks(result.data.project.tasks));
          dispatch(setTotalPages(result.data.pagination.totalPages));
        } catch (error: any) {
          console.log("error while updating workspace tags");
          console.log(error);
        }
      },
    }),
    deleteProject: builder.mutation({
      query: (data) => {
        return {
          url: `/api/project/delete-project`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      invalidatesTags: ["singleWorkspace"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result);
          //dispatch(setWorkspaceTags(result.data.tags));
        } catch (error: any) {
          console.log("error while creating project", error);
          console.log(error);
        }
      },
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/project/${id}`,
          method: "PATCH",
          body: data,
          credentials: "include" as const,
        };
      },
      invalidatesTags: ["singleWorkspace"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result);
          //dispatch(setWorkspaceTags(result.data.tags));
        } catch (error: any) {
          console.log("error while creating project", error);
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useLazyGetIndividualProjectQuery,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projectApi;
