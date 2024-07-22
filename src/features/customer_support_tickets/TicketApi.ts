import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Tticket{
    ticket_id:number;
    user_id:number;
    subject:string;
    description:string;
    status:string;
    created_at:string;
    updated_at:string
  }

// Define the API slice
export const TicketAPI = createApi({
  reducerPath: 'ticketAPI',
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
  tagTypes: ['customerSupportTickets'],
  endpoints: (builder) => ({
   
    getCustomerSupportTickets: builder.query<Tticket[], void>({
      query: () => 'customerSupportTickets',
      providesTags: ['customerSupportTickets'],
    }),
    createCustomerSupportTickets: builder.mutation<Tticket, Partial<Tticket>>({
      query: (newCustomerSupportTickets) => ({
        url: 'customerSupportTickets',
        method: 'POST',
        body: newCustomerSupportTickets,
      }),
      invalidatesTags: ['customerSupportTickets'],
    }),
    updateCustomerSupportTickets: builder.mutation<Tticket, Partial<Tticket>>({
      query: ({ ticket_id, ...rest }) => ({
        url: `customerSupportTickets/${ticket_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['customerSupportTickets'],
    }),
    deleteCustomerSupportTickets: builder.mutation<{ success: boolean; ticket_id: number }, number>({
      query: (ticket_id) => ({
        url: `customerSupportTickets/${ticket_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['customerSupportTickets'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetCustomerSupportTicketsQuery,
  useCreateCustomerSupportTicketsMutation,
  useUpdateCustomerSupportTicketsMutation,
  useDeleteCustomerSupportTicketsMutation,
}:any = TicketAPI;
