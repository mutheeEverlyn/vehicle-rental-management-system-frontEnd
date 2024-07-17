import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface TPayments{
    checkouturl:string;

}
export const PaymentsAPI = createApi({
  reducerPath: 'paymentsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: ' http://localhost:8000',
  }),
  endpoints: (builder) => ({
    createPayments: builder.mutation<TPayments,{booking_id:number;amount:number}>({
      query: ({booking_id,amount}) => ({
        url: 'create-checkout-session',
        method: 'POST',
        body: {booking_id,amount,success_url:'http:localhost:8000/payment-success',cancel_url:'http://localhost:8000/payment-cancel'},
      }),
    }), 
  }),
});
export const {
 
  useCreatePaymentsMutation

}:any = PaymentsAPI;
