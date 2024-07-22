import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Tlocation{
    location_id:number;
    name:string;
    address:string;
    contact_phone:string;
    created_at:string;
    updated_at:string
  }

// Define the API slice
export const LocationAPI = createApi({
  reducerPath: 'locationAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-api-5bvc.onrender.com',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails')||'{}');
      const token=userDetails?.token;
      console.log('Token:', token);
      if (token) {
        headers.set('Authorization', `${token}`);
        
      }
      return headers;
    },
  }),
  tagTypes: ['locationBranches'],
  endpoints: (builder) => ({
    getLocation: builder.query<Tlocation[], void>({
      query: () => 'locationBranches',
      providesTags: ['locationBranches'],
    }),
    createLocation: builder.mutation<Tlocation, Partial<Tlocation>>({
      query: (newLocationBranches) => ({
        url: 'locationBranches',
        method: 'POST',
        body: newLocationBranches,
      }),
      invalidatesTags: ['locationBranches'],
    }),
    updateLocation: builder.mutation<Tlocation, Partial<Tlocation>>({
      query: ({ location_id, ...rest }) => ({
        url: `locationBranches/${location_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['locationBranches'],
    }),
    deleteLocation: builder.mutation<{ success: boolean; location_id: number }, number>({
      query: (location_id) => ({
        url: `locationBranches/${location_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['locationBranches'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetLocationQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
}:any = LocationAPI;
