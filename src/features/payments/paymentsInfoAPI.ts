import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface TPaymentsInfo {
    payment_id: number;
    transaction_id:string;
    payment_method:string;
    amount:number;
    payment_status:string;
    payment_date:string;
   created_at: string;
   updated_at: string;
  booking:{
    user_id: number;
    booking_id: number;
    location_id: number;
    vehicle_id: number;
    booking_date: string;
    return_date: string;
    total_amount: number;
    booking_status: string;
    created_at: string;
    updated_at: string;
  }
}

// Define the API slice
export const PaymentsInfoAPI = createApi({
  reducerPath: 'paymentsInfoAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://vehicle-api-5bvc.onrender.com',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const token = userDetails?.token;
      console.log('Token:', token);
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['paymentsInfo'],
  endpoints: (builder) => ({
    getPaymentsInfo: builder.query<TPaymentsInfo[], void>({
      query: () => 'paymentsData',
      providesTags: ['paymentsInfo'],
    }),
    createPaymentsInfo: builder.mutation<TPaymentsInfo, Partial<TPaymentsInfo>>({
      query: (newPaymentsInfo) => ({
        url: 'payments',
        method: 'POST',
        body: newPaymentsInfo,
      }),
      invalidatesTags: ['paymentsInfo'],
    }),
    updatePaymentsInfo: builder.mutation<TPaymentsInfo, Partial<TPaymentsInfo>>({
      query: ({ payment_id, ...rest }) => ({
        url: `payments/${payment_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['paymentsInfo'],
    }),
    deletePaymentsInfo: builder.mutation<{ success: boolean; payment_id: number }, number>({
      query: (payment_id) => ({
        url: `payments/${payment_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['paymentsInfo'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetPaymentsInfoQuery,
  useCreatePaymentsInfoMutation,
  useUpdatePaymentsInfoMutation,
  useDeletePaymentsInfoMutation,
}: any = PaymentsInfoAPI;
