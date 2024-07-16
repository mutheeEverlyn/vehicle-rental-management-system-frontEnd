import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TBookedVehicles{
    booking_id:number;
    user_id:number;
    vehicle_id:number;
    location_id:number;
    booking_date:string;
    return_date:string;
    total_amount:number;
    booking_status:string;
    created_at:string;
    updated_at:string
  }

export const BookingsAPI = createApi({
  reducerPath: 'bookingsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
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
  tagTypes: ['bookings'],
  endpoints: (builder) => ({
    getBookingsById:builder.query<TBookedVehicles,number>({
      query:(user_id)=>`bookings/${user_id}`,
      providesTags:['bookings'],
    }),
    getBookings: builder.query<TBookedVehicles[], void>({
      query: () => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
        const user_id = userDetails?.user_id;
        return `bookings?user_id=${user_id}`;
      },
      providesTags: ['bookings'],
    }),
    createBookings: builder.mutation<TBookedVehicles, Partial<TBookedVehicles>>({
      query: (newBookings) => ({
        url: 'bookings',
        method: 'POST',
        body: newBookings,
      }),
      invalidatesTags: ['bookings'],
    }),
    updateBookings: builder.mutation<TBookedVehicles, Partial<TBookedVehicles>>({
      query: ({ booking_id, ...rest }) => ({
        url: `bookings/${booking_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['bookings'],
    }),
    deleteBookings: builder.mutation<{ success: boolean; booking_id: number }, number>({
      query: (booking_id) => ({
        url: `bookings/${booking_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bookings'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetBookingsByIdQuery,
  useGetBookingsQuery,
  useCreateBookingsMutation,
  useUpdateBookingsMutation,
  useDeleteBookingsMutation,
}:any = BookingsAPI;
