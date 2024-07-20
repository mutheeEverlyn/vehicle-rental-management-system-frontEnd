import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface TCar {
  vehicle_id: number;
  vehicleSpec_id: number;
  rental_rate:number;
  location_id:number;
  availability:string;
   images:string;
  created_at: string;
  updated_at: string;
  specification:{
     manufacturer: string;
     model: string;
      year: number;
      fuel_type: string;
      engine_capacity: string;
      transmission: string;
      seating_capacity: number;
      color: string;
      features:string;
     
  }
}

// Define the API slice
export const CarsAPI = createApi({
  reducerPath: 'carsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
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
  tagTypes: ['cars'],
  endpoints: (builder) => ({
    getCars: builder.query<TCar[], void>({
      query: () => 'vehicleData',
      providesTags: ['cars'],
    }),
    createCar: builder.mutation<TCar, Partial<TCar>>({
      query: (newCar) => ({
        url: 'vehicle',
        method: 'POST',
        body: newCar,
      }),
      invalidatesTags: ['cars'],
    }),
    updateCar: builder.mutation<TCar, Partial<TCar>>({
      query: ({ vehicle_id, ...rest }) => ({
        url: `vehicle/${vehicle_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['cars'],
    }),
    deleteCar: builder.mutation<{ success: boolean; car_id: number }, number>({
      query: (vehicle_id) => ({
        url: `vehicle/${vehicle_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cars'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetCarsQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
}: any = CarsAPI;
