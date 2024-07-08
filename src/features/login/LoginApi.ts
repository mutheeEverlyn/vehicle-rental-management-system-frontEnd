import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface logInUser {
    email: string;
    password: string;
}

export const loginApi = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/users' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<logInUser, Partial<logInUser>>({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
            }),
        }),
        logout: builder.mutation<logInUser, Partial<logInUser>>({
            query: (user) => ({
                url: 'logout',
                method: 'POST',
                body: user,
            }),
        })

    }),
});

export const { useLoginUser, useLogout } = loginApi;