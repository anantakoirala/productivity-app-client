import { api } from "../api";
import { setPomodoroSetting } from "./pomodoroSlice";

export const pomodoroApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPomodoroSetting: builder.query({
      query: ({}) => {
        return {
          url: `/api/pomodoro`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data.pomodoroSetting !== null) {
            dispatch(setPomodoroSetting(result.data.pomodoroSetting));
          }
        } catch (error: any) {
          console.log("error while updating workspace minmap");
          console.log(error);
        }
      },
    }),
    updatePomodoroSetting: builder.mutation({
      query: (data) => {
        return {
          url: `/api/pomodoro`,
          method: "PATCH",
          body: data,
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setPomodoroSetting(result.data.pomodoroSetting));
        } catch (error: any) {
          console.log("update pomodoro setting  error", error);
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLazyGetPomodoroSettingQuery,
  useUpdatePomodoroSettingMutation,
} = pomodoroApi;
