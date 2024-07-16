import React from 'react';
import { useGetBookingsQuery, useDeleteBookingsMutation, useUpdateBookingsMutation, TBookedVehicles } from './BookingsApi';
import { Toaster, toast } from 'sonner';
import { Link } from 'react-router-dom';

const Bookings: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  const user_id = userDetails?.user_id;
  const { data:bookings, error, isLoading, isError, refetch } = useGetBookingsQuery();

 
  const [updateBooking] = useUpdateBookingsMutation();
  const [deleteBooking, { data: deleteMsg }] = useDeleteBookingsMutation();

  const handleUpdate = (booking_id: number) => {
    const updateBookingData = {
      booking_status: 'booking updated',
    };
    updateBooking({ booking_id, ...updateBookingData });
  };
const MyBookings=bookings?.filter((booking:TBookedVehicles)=>booking.user_id===user_id)
  const handleDelete = async (booking_id: number) => {
    await deleteBooking(booking_id);
    toast.success(deleteMsg?.msg || 'Booking deleted successfully');
    // Refetch bookings after deletion
    refetch();
  };



  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="overflow-x-auto bg-gray-800 text-white rounded-lg p-4 min-h-screen">
        <h1 className="text-xl my-4">My bookings</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              {/* <th className="text-white">Booking_id</th> */}
              {/* <th className="text-white">user_id</th> */}
              {/* <th className="text-white">vehicle_id</th> */}
              {/* <th className="text-white">location_id</th> */}
              <th className="text-white">booking_date</th>
              <th className="text-white">return_date</th>
              <th className="text-white">total_amount</th>
              <th className="text-white">booking_status</th>
              <th className="text-white">created_at</th>
              <th className="text-white">updated_at</th>
              <th className="text-white">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={11}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={11}>Error: {error?.message || 'An error occurred'}</td>
              </tr>
            ) : (
              MyBookings?.map((booking: TBookedVehicles) => (
                <tr key={booking.booking_id}>
                  {/* <td>{booking.booking_id}</td> */}
                  {/* <td>{booking.user_id}</td> */}
                  {/* <td>{booking.vehicle_id}</td> */}
                  {/* <td>{booking.location_id}</td> */}
                  <td>{booking.booking_date}</td>
                  <td>{booking.return_date}</td>
                  <td>{booking.total_amount}</td>
                  <td>{booking.booking_status}</td>
                  <td>{booking.created_at}</td>
                  <td>{booking.updated_at}</td>
                  <td className="flex gap-2">
                      <button className="btn btn-sm btn-outline btn-success"><Link to='/payment'>Pay</Link></button>
                    <button className="btn btn-sm btn-outline btn-info" onClick={() => handleUpdate(booking.booking_id)}>
                      Update
                    </button>
                    <button className="btn btn-sm btn-outline btn-warning" onClick={() => handleDelete(booking.booking_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-white" colSpan={11}>
                {MyBookings ? `${MyBookings.length} records` : '0 records'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Bookings;
