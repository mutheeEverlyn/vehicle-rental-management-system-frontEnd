import React from 'react';
import { useGetBookingsQuery, useDeleteBookingsMutation, TBookedVehicles } from './BookingsApi';
import { Toaster, toast } from 'sonner';
import { useCreatePaymentsMutation } from '../payments/PaymentsApi';

const Bookings: React.FC = () => {
  const userDetailsString = localStorage.getItem('userDetails') || '{}';
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  const { data: bookings, error, isLoading, isError, refetch } = useGetBookingsQuery();
  const [createCheckout] = useCreatePaymentsMutation();
  const [deleteBooking, { data: deleteMsg }] = useDeleteBookingsMutation();

  const handleUpdate = async (booking: TBookedVehicles) => {
    try {
      const { data } = await createCheckout({ booking_id: booking.booking_id, amount: Number(booking.total_amount) });
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error('Checkout url is not given');
        toast.error('provide checkout url');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Error creating checkout session');
    }
  };

  const MyBookings = bookings?.filter((booking: TBookedVehicles) => booking.user_id === user_id);

  const handleDelete = async (booking_id: number) => {
    await deleteBooking(booking_id);
    toast.success(deleteMsg?.msg || 'Booking deleted successfully');
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
              <th className="text-white">Booking Date</th>
              <th className="text-white">Return Date</th>
              <th className="text-white">Total Amount</th>
              <th className="text-white">Booking Status</th>
              <th className="text-white">Created At</th>
              <th className="text-white">Updated At</th>
              <th className="text-white">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7}>Error: {error?.message || 'An error occurred'}</td>
              </tr>
            ) : (
              MyBookings?.map((booking: TBookedVehicles) => (
                <tr key={booking.booking_id}>
                  <td>{booking.booking_date}</td>
                  <td>{booking.return_date}</td>
                  <td>${booking.total_amount}</td>
                  <td>{booking.booking_status}</td>
                  <td>{booking.created_at}</td>
                  <td>{booking.updated_at}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline btn-info" onClick={() => handleUpdate(booking)}>
                      Pay
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
              <td className="text-white" colSpan={7}>
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
