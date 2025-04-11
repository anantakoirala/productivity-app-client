import { api } from "../api";
import { setImage, setUserData } from "../User/userSlice";
import {
  setActiveWorkspace,
  setMyWOrkSpaceAsAdmin,
  setSettingWorkspace,
  setWorkspaces,
  setWorkspaceSubscribers,
  setWorkspaceTags,
  setWorkspaceTasks,
} from "./workspaceSlice";

export const workspaceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createWorkspace: builder.mutation({
      query: (data) => {
        return {
          url: `/api/workspace`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      invalidatesTags: ["workspace"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // dispatch(setProfileImage(result.data.image));
          // dispatch(setImage(result.data.image));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
    updateWorkspace: builder.mutation({
      query: ({ data, id }) => {
        console.log("data", data);
        return {
          url: `/api/workspace/${id}`,
          method: "PATCH",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            setSettingWorkspace({
              id: result.data.updatedWorkspace.id,
              name: result.data.updatedWorkspace.name,
              image: result.data.updatedWorkspace.image,
            })
          );
        } catch (error: any) {
          console.log("update workspace info error", error);
          console.log(error);
        }
      },
    }),
    getAllWorkspaces: builder.query({
      query: ({}) => {
        return {
          url: `/api/workspace`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      providesTags: ["workspace"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setWorkspaces(result.data.workspaces));
          dispatch(setMyWOrkSpaceAsAdmin(result.data.myworkspacesAsAdmin));
          // dispatch(setImage(result.data.image));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
    getWorkspace: builder.query({
      query: ({ id }) => {
        return {
          url: `/api/workspace/${id}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      providesTags: ["singleWorkspace"],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            setActiveWorkspace({
              id: result.data.workspace.id,
              name: result.data.workspace.name,
            })
          );

          dispatch(setWorkspaceTasks(result.data.workspace.tasks));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
    getWorkspaceSetting: builder.query({
      query: ({ id }) => {
        return {
          url: `/api/workspace/setting/${id}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("result workspace", result.data.workspace);

          dispatch(
            setSettingWorkspace({
              id: result.data.workspace.id,
              name: result.data.workspace.name,
              image: result.data.workspace.image,
            })
          );
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
    saceWorkspaceImage: builder.mutation({
      query: (data) => {
        return {
          url: `/api/workspace/upload-workspace-image`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // dispatch(setProfileImage(result.data.image));
          // dispatch(setImage(result.data.image));
          dispatch(
            setSettingWorkspace({
              id: result.data.updatedWorkspace.id,
              name: result.data.updatedWorkspace.name,
              image: result.data.updatedWorkspace.image,
            })
          );
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
    deleteWorkspace: builder.mutation({
      query: (data) => {
        return {
          url: `/api/workspace/delete-workspace`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      invalidatesTags: ["workspace"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          //dispatch(setImage(result.data.user.image));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),

    getWorkspaceUserRole: builder.query({
      query: ({ workspaceId }) => {
        return {
          url: `/api/workspace/user-role-for-workspace/${workspaceId}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
    }),
    createInvitation: builder.mutation({
      query: (data) => ({
        url: `/api/workspace/create-invitation`,
        method: "POST",
        body: data,
      }),
    }),
    getWorkspaceSubscribers: builder.query({
      query: ({ workspaceId }) => {
        console.log("workspaceId", workspaceId);
        return {
          url: `/api/workspace/subscribers/${workspaceId}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setWorkspaceSubscribers(result.data.subscribers));
        } catch (error: any) {
          console.log("error while updatting workspace subscribers");
          console.log(error);
        }
      },
    }),
    getWorkspaceTags: builder.query({
      query: ({ workspaceId }) => {
        return {
          url: `/api/workspace/tags/${workspaceId}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setWorkspaceTags(result.data.tags));
        } catch (error: any) {
          console.log("error while updating workspace tags");
          console.log(error);
        }
      },
    }),
    getWorkspaceTasks: builder.query({
      query: ({ workspaceId }) => {
        return {
          url: `/api/workspace/tasks/${workspaceId}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result);
          //dispatch(setWorkspaceTags(result.data.tags));
        } catch (error: any) {
          console.log("error while updating workspace tags");
          console.log(error);
        }
      },
    }),
    changeUserRole: builder.mutation({
      query: (data) => {
        console.log("data aaaaa", data);
        return {
          url: `/api/workspace/change-user-role`,
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result change user role", result);
          dispatch(setWorkspaceSubscribers(result.data.subscribers));
        } catch (error: any) {
          console.log("updated error workspace subscribers");
          console.log(error);
        }
      },
    }),

    removeUserFromWorkspace: builder.mutation({
      query: (data) => {
        return {
          url: `/api/workspace/remove-user`,
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result change user role", result);
          dispatch(setWorkspaceSubscribers(result.data.subscribers));
        } catch (error: any) {
          console.log("updated error workspace subscribers");
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useCreateWorkspaceMutation,
  useLazyGetAllWorkspacesQuery,
  useLazyGetWorkspaceQuery,
  useGetWorkspaceQuery,
  useLazyGetWorkspaceSettingQuery,
  useSaceWorkspaceImageMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useCreateInvitationMutation,
  useLazyGetWorkspaceSubscribersQuery,
  useChangeUserRoleMutation,
  useRemoveUserFromWorkspaceMutation,
  useLazyGetWorkspaceTagsQuery,
  useLazyGetWorkspaceTasksQuery,
} = workspaceApi;
