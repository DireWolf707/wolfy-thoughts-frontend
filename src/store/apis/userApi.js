import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export default createApi({
  reducerPath: "user",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/user`,
    credentials: "include",
  }),

  endpoints(builder) {
    return {
      fetchProfile: builder.query({
        providesTags: ["profile"],
        query: () => ({
          url: "/me",
          method: "GET",
        }),
      }),

      updateProfile: builder.mutation({
        invalidatesTags: (resp, err, arg) => (err ? [] : ["profile"]),
        query: (data) => ({
          url: "/profile",
          method: "POST",
          body: data,
        }),
      }),

      updateAvatar: builder.mutation({
        invalidatesTags: (resp, err, arg) => (err ? [] : ["profile"]),
        query: (data) => ({
          url: "/avatar",
          method: "POST",
          body: data,
        }),
      }),

      deleteAvatar: builder.mutation({
        invalidatesTags: (resp, err, arg) => (err ? [] : ["profile"]),
        query: () => ({
          url: "/avatar",
          method: "DELETE",
        }),
      }),

      logout: builder.mutation({
        invalidatesTags: (resp, err, arg) => (err ? [] : ["profile"]),
        query: () => ({
          url: "/logout",
          method: "POST",
        }),
      }),
    }
  },
})
