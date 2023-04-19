import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
  }),
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "post",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "post",
        body: user,
      }),
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post",
        method: "post",
        body: data,
      }),
      invalidatesTags: [{ type: "auth" }],
    }),
    getAllPosts: builder.query({
      query: () => {
        return "/post";
      },
      providesTags: [{ type: "auth" }],
    }),
    getPostById: builder.query({
      query: (id) => {
        return `/post/${id}`;
      },
      providesTags: [{ type: "auth" }],
    }),
    editPostById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/post/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: [{ type: "auth" }],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useEditPostByIdMutation,
} = authApi;
