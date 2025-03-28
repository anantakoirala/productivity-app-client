import { api } from "../api";
import { setImage } from "../User/userSlice";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteUserProfileImage: builder.query({
      query: ({}) => {
        return {
          url: `/api/user/delete-user-image`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setImage(result.data.user.image));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLazyDeleteUserProfileImageQuery } = userApi;
