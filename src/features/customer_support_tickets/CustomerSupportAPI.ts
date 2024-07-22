import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TcustomerSupport{
    ticket_id:number;
    user_id:number;
    subject:string;
    description:string;
    status:string;
    created_at:string;
    updated_at:string;
 user:{
     address:string;
    contact_phone:string;
      created_at:string;
      email:string;
      full_name:string;
      updated_at:string;
      }
  }

// Define the API slice
export const customerSupportAPI = createApi({
  reducerPath: 'customerSupportAPI',
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
  tagTypes: ['customerSupportTicketsData'],
  endpoints: (builder) => ({
    getCustomerSupport: builder.query<TcustomerSupport[], void>({
      query: () => 'customerSupportTicketsData',
      providesTags: ['customerSupportTicketsData'],
    }),
    createCustomerSupport: builder.mutation<TcustomerSupport, Partial<TcustomerSupport>>({
      query: (newCustomerSupportTicketsData) => ({
        url: 'customerSupportTicketsData',
        method: 'POST',
        body: newCustomerSupportTicketsData,
      }),
      invalidatesTags: ['customerSupportTicketsData'],
    }),
    updateCustomerSupport: builder.mutation<TcustomerSupport, Partial<TcustomerSupport>>({
      query: ({ ticket_id, ...rest }) => ({
        url: `customerSupportTicketsData/${ticket_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['customerSupportTicketsData'],
    }),
    deleteCustomerSupport: builder.mutation<{ success: boolean; ticket_id: number }, number>({
      query: (ticket_id) => ({
        url: `customerSupportTickets/${ticket_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['customerSupportTicketsData'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetCustomerSupportQuery,
  useCreateCustomerSupportMutation,
  useUpdateCustomerSupportMutation,
  useDeleteCustomerSupportMutation,
}:any = customerSupportAPI;
