import { api } from "../api";

export const calendarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCalendarDetails: builder.query({
      query: ({}) => {
        return {
          url: `/api/calendar`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result.data);
        } catch (error: any) {
          console.log("error while updating workspace tags");
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLazyGetCalendarDetailsQuery } = calendarApi;
