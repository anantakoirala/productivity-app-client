import { api } from "../api";
import { setImage, setUserData } from "../User/userSlice";

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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result.data);
          // dispatch(setProfileImage(result.data.image));
          // dispatch(setImage(result.data.image));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
  }),
});

export const { useCreateWorkspaceMutation } = workspaceApi;
