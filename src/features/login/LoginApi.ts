import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LogInUser {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    user_id: number;
    role: string;
  };
  token: string;
}

export const loginApi = createApi({
  reducerPath: 'loginAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://vehicle-api-5bvc.onrender.com' }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, Partial<LogInUser>>({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginUserMutation, useLogoutMutation }:any = loginApi;
