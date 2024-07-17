import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface registerUser {
    full_name: string;
    email: string;
    password: string;
    contact_phone:string;
    address:string;
    role:string;
}

// Create the login API
export const registerApi = createApi({
  reducerPath: 'registerAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<registerUser, Partial<registerUser>>({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
      }),
    }),
    
  }),
});

// Export hooks for the API endpoints
export const { useRegisterUserMutation }:any = registerApi;
