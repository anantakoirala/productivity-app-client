import { api } from "../api";
import { setImage, setUserData } from "../User/userSlice";
import {
  setActiveWorkspace,
  setMyWOrkSpaceAsAdmin,
  setSettingWorkspace,
  setWorkspaces,
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
        console.log("id", id);
        return {
          url: `/api/workspace/${id}`,
          method: "GET",
          credentials: "include" as const,
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("result workspace", result.data.workspace);
          dispatch(
            setActiveWorkspace({
              id: result.data.workspace.id,
              name: result.data.workspace.name,
            })
          );
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
        console.log("data api", data);
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
        console.log("data", data);
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
  }),
});

export const {
  useCreateWorkspaceMutation,
  useLazyGetAllWorkspacesQuery,
  useLazyGetWorkspaceQuery,
  useLazyGetWorkspaceSettingQuery,
  useSaceWorkspaceImageMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
} = workspaceApi;
