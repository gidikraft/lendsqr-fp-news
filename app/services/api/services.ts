import { api } from './api';
import { NewsItem } from '@/types';

// Define a service using a base URL and expected endpoints
export const servicesApi = api.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<NewsItem[], void>({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    getUsers: builder.query<NewsItem[], void>({
      query: () => 'users',
    }),
    addPost: builder.mutation<NewsItem, Omit<NewsItem, 'id'>>({
      query: body => ({
        url: 'post',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    editPost: builder.mutation<
      NewsItem,
      Partial<NewsItem> & Pick<NewsItem, 'id'>
    >({
      query: body => ({
        url: `post/${body.id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    // getNotifications: builder.query<NotificationResponse, string>({
    //   query: name => `${name}`,
    // }),
  }),
  overrideExisting: true,
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useGetUsersQuery,
} = servicesApi;
