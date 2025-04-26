import { api } from "../api";
import { setProject } from "./ProjectSlice";

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
          console.log("result", result.data);
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

export const { useCreateProjectMutation, useLazyGetIndividualProjectQuery } =
  projectApi;
