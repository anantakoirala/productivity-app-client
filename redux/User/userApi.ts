import { api } from "../api";
import { setImage, setUserData } from "../User/userSlice";

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
    updateUserInfo: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/update-user-info`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            setUserData({
              email: result.data.user.email,
              name: result.data.user.name,
              image: result.data.user.image || null,
              completeOnBoarding: result.data.user.completeOnBoarding,
              username: result.data.user.username,
            })
          );
        } catch (error: any) {
          console.log("update user info error", error);
          console.log(error);
        }
      },
    }),

    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: `/api/user/change-password`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            setUserData({
              email: result.data.user.email,
              name: result.data.user.name,
              image: result.data.user.image || null,
              completeOnBoarding: result.data.user.completeOnBoarding,
              username: result.data.user.username,
            })
          );
        } catch (error: any) {
          console.log("update user info error", error);
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLazyDeleteUserProfileImageQuery,
  useUpdateUserInfoMutation,
  useChangePasswordMutation,
} = userApi;
