import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Tfleet{
    fleet_id:number;
    vehicle_id:number;
    acquisition_date:string;
    depreciation_rate:number;
    current_value:number;
    maintenance_cost:number;
    status:string;
    created_at:string;
    updated_at:string
  }

// Define the API slice
export const FleetAPI = createApi({
  reducerPath: 'fleetAPI',
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
  tagTypes: ['fleetManagement'],
  endpoints: (builder) => ({
    getFleet: builder.query<Tfleet[], void>({
      query: () => 'fleetManagement',
      providesTags: ['fleetManagement'],
    }),
    createFleet: builder.mutation<Tfleet, Partial<Tfleet>>({
      query: (newFleetManagement) => ({
        url: 'fleetManagement',
        method: 'POST',
        body: newFleetManagement,
      }),
      invalidatesTags: ['fleetManagement'],
    }),
    updateFleet: builder.mutation<Tfleet, Partial<Tfleet>>({
      query: ({ fleet_id, ...rest }) => ({
        url: `fleetManagement/${fleet_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['fleetManagement'],
    }),
    deleteFleet: builder.mutation<{ success: boolean; fleet_id: number }, number>({
      query: (fleet_id) => ({
        url: `fleetManagement/${fleet_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['fleetManagement'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetFleetQuery,
  useCreateFleetMutation,
  useUpdateFleetMutation,
  useDeleteFleetMutation,
}:any = FleetAPI;
