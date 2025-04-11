import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Custom base query with token refresh logic
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
  credentials: "include",
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const message = (result.error.data as { message?: string })?.message;
    console.log("status aaa", result.error.status);
    if (message === "Unauthorized") {
      try {
        // Try refreshing the token
        const refreshResult = await baseQuery(
          { url: "/api/auth/refresh-token", method: "POST" },
          api,
          extraOptions
        );
        console.log("refrehs redux", refreshResult);
        if (refreshResult.data) {
          const { token } = refreshResult.data as { token: string };

          // Retry the original request
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Redirect to login if refresh fails

          window.location.href = "/signin";
        }
      } catch {
        // Refresh failed, redirect to login

        window.location.href = "/signin";
      }
    } else if (message === "Token not provided") {
      // Redirect to login if token is missing

      window.location.href = "/signin";
    } else {
      window.location.href = "/signin";
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ["workspace", "singleWorkspace"],
});

export const {} = api;
