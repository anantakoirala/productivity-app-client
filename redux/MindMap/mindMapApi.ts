import { api } from "../api";
import { setMindMapInfo, setUserToMindmapAssignee } from "./mindMapSlice";

export const mindMapApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createMindMap: builder.mutation({
      query: (data) => {
        return {
          url: `/api/mindmap`,
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
          //   dispatch(setWorkspaceTags(result.data.tags));
        } catch (error: any) {
          console.log("update user info error", error);
          console.log(error);
        }
      },
    }),
    getMindMap: builder.query({
      query: ({ mindMapId, workspaceId }) => {
        return {
          url: `/api/mindmap/${workspaceId}/${mindMapId}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setMindMapInfo(result.data.mindmap));
        } catch (error: any) {
          console.log("error while updating workspace minmap");
          console.log(error);
        }
      },
    }),
    updateMindMap: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/api/mindmap/${id}`,
          method: "PATCH",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setMindMapInfo(result.data.mindmap));
        } catch (error: any) {
          console.log("update workspace tag error", error);
          console.log(error);
        }
      },
    }),
    updateMindMapTags: builder.mutation({
      query: ({ workspaceId, mindMapId, data }) => {
        return {
          url: `/api/mindmap/${workspaceId}/${mindMapId}`,
          method: "PATCH",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("resut", result);
          // dispatch(setMindMapInfo(result.data.mindmap));
        } catch (error: any) {
          console.log("update workspace tag error", error);
          console.log(error);
        }
      },
    }),
    updateMindMapInfo: builder.mutation({
      query: ({ workspaceId, mindMapId, data }) => {
        return {
          url: `/api/mindmap/update-info/${workspaceId}/${mindMapId}`,
          method: "PATCH",
          body: data,
          credentials: "include" as const,
        };
      },
      invalidatesTags: ["singleWorkspace"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setMindMapInfo(result.data.mindmap));
        } catch (error: any) {
          console.log("update workspace tag error", error);
          console.log(error);
        }
      },
    }),
    deleteMindMap: builder.mutation({
      query: ({ workspaceId, mindMapId }) => ({
        url: `/api/mindmap/${workspaceId}/${mindMapId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: ["singleWorkspace"],
    }),
    asignUserToMindmap: builder.mutation({
      query: (data) => {
        return {
          url: `/api/mindmap/asign-user`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUserToMindmapAssignee(result.data.assignment));
        } catch (error: any) {
          console.log("error while updating mindmap assignee");
          console.log(error);
        }
      },
    }),
    removeUserFromMindmap: builder.mutation({
      query: (data) => {
        return {
          url: `/api/mindmap/remove-user`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.log("error while updating workspace tags");
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useCreateMindMapMutation,
  useLazyGetMindMapQuery,
  useUpdateMindMapMutation,
  useUpdateMindMapTagsMutation,
  useUpdateMindMapInfoMutation,
  useDeleteMindMapMutation,
  useAsignUserToMindmapMutation,
  useRemoveUserFromMindmapMutation,
} = mindMapApi;
