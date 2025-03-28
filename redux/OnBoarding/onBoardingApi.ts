import { api } from "../api";
import { setImage } from "../User/userSlice";
import { setProfileImage } from "./onBoardingSlice";

export const onBoardingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    saveProfileImage: builder.mutation({
      query: (data) => {
        console.log("data api", data);
        return {
          url: `/api/user/upload-profile-image`,
          method: "POST",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result.data);
          dispatch(setProfileImage(result.data.image));
          dispatch(setImage(result.data.image));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
  }),
});

export const { useSaveProfileImageMutation } = onBoardingApi;
