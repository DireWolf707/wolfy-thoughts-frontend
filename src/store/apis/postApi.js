import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export default createApi({
  reducerPath: "post",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/post`,
    credentials: "include",
  }),

  endpoints(builder) {
    return {
      fetchFeed: builder.query({
        query: () => ({
          url: "/feed",
          method: "GET",
        }),
      }),

      fetchPost: builder.query({
        query: ({ postId }) => ({
          url: `/${postId}`,
          method: "GET",
        }),
      }),

      createPost: builder.mutation({
        query: ({ data }) => ({
          url: "/create",
          body: data,
          method: "POST",
        }),
      }),

      likePost: builder.mutation({
        query: ({ postId }) => ({
          url: `/${postId}/like`,
          method: "POST",
        }),
      }),

      unLikePost: builder.mutation({
        query: ({ postId }) => ({
          url: `/${postId}/like`,
          method: "DELETE",
        }),
      }),

      createComment: builder.mutation({
        query: ({ data, postId }) => ({
          url: `/${postId}/comment`,
          body: data,
          method: "POST",
        }),
      }),
    }
  },
})
