import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCarsQuery, TCar } from "./CarsAPI";
import { useCreateBookingsMutation, useGetBookingsQuery, TBookedVehicles } from './BookingsApi';
import { useGetLocationQuery, Tlocation } from "../location/LocationApi";
import { Toaster, toast } from 'sonner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookVehicle = () => {
  const { data: cars, error, isLoading } = useGetCarsQuery();
  const { data: locations, isLoading: isLocationsLoading, error: locationsError } = useGetLocationQuery();
  const { data: bookings, isLoading: isBookingsLoading, error: bookingsError } = useGetBookingsQuery();
  const [createBooking] = useCreateBookingsMutation();
  const navigate = useNavigate();
  const [selectedLocation_id, setSelectedLocation_id] = useState<number | null>(null);
  const [selectedCar, setSelectedCar] = useState<TCar | null>(null);
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const userDetailsString = localStorage.getItem('userDetails') || '{}';
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  const handleBook = async () => {
    if (!selectedLocation_id) {
      toast.error("Please select a location.");
      return;
    }

    if (!user_id) {
      toast.error("User not logged in.");
      return;
    }

    if (!selectedCar || !selectedCar.vehicle_id || selectedCar.availability === 'unavailable') {
      toast.error("Invalid or unavailable vehicle selected.");
      return;
    }

    if (!bookingDate || !returnDate) {
      toast.error("Please select both booking and return dates.");
      return;
    }

    // Check for date overlaps
    const isOverlapping = bookings?.some((booking: TBookedVehicles) =>
      booking.vehicle_id === selectedCar.vehicle_id &&
      ((new Date(booking.booking_date) <= bookingDate && new Date(booking.return_date) >= bookingDate) ||
        (new Date(booking.booking_date) <= returnDate && new Date(booking.return_date) >= returnDate) ||
        (new Date(booking.booking_date) >= bookingDate && new Date(booking.return_date) <= returnDate))
    );

    if (isOverlapping) {
      toast.error("Selected dates overlap with an existing booking for this vehicle.");
      return;
    }

    const bookingDays = Math.ceil((returnDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = bookingDays * selectedCar.rental_rate;

    console.log('Booking details:', {
      user_id,
      vehicle_id: selectedCar.vehicle_id,
      location_id: selectedLocation_id,
      booking_date: bookingDate.toISOString(),
      return_date: returnDate.toISOString(),
      total_amount: totalAmount,
      booking_status: 'Pending'
    });

    try {
      const response = await createBooking({
        user_id,
        vehicle_id: selectedCar.vehicle_id,
        location_id: selectedLocation_id,
        booking_date: bookingDate.toISOString(),
        return_date: returnDate.toISOString(),
        total_amount: totalAmount,
        booking_status: 'Pending'
      });

      console.log('Booking response:', response);

      if (response?.data?.msg === 'bookings created successfully') {
        toast.success("Vehicle booked successfully!");
        navigate('/userDashboard/bookings');
      } else {
        console.error('Error booking the vehicle:', response?.error);
        toast.error("Failed to book the vehicle.");
      }
    } catch (error) {
      console.error('Error booking the vehicle:', error);
      toast.error("Failed to book the vehicle.");
    }
  };

  const handleShowDetails = (car: TCar) => {
    console.log('Selected car:', car);  // Debugging
    if (car.availability === 'available') {
      setSelectedCar(car);
    } else {
      toast.error("This vehicle is not available.");
    }
  };

  const handleCloseDetails = () => {
    setSelectedCar(null);
  };

  if (isLoading || isLocationsLoading || isBookingsLoading) return <p>Loading...</p>;
  if (error || locationsError || bookingsError) return <p>Error loading data.</p>;

  // Debugging logs
  console.log('Cars:', cars);
  console.log('Selected Car:', selectedCar);

  return (
    <div className="pb-24">
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'bg-green-400',
          },
        }}
      />
      <div className="container">
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">
          Book a vehicle to enjoy your next ride
        </h1>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Select Location</label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={selectedLocation_id || ''}
            onChange={(e) => setSelectedLocation_id(Number(e.target.value))}
          >
            <option value="" disabled>Select a location</option>
            {locations?.map((location: Tlocation) => (
              <option key={location.location_id} value={location.location_id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {cars?.map((car: TCar) => (
            <div key={car.vehicle_id} className="space-y-3 border-2 border-gray-300 hover:border-blue-400 p-3 rounded-xl relative group">
              <div className="w-full h-[120px]">
                <img src={car.images || "default-image-path"} alt={car.specification.model} className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"/>
              </div>
              <div className="space-y-2">
                <h1 className="text-primary font-semibold">{car.specification.manufacturer} {car.specification.model}</h1>
                <div className="flex justify-between items-center text-xl font-semibold">
                  <p>${car.rental_rate}/Day</p>
                  <button onClick={() => handleShowDetails(car)} className="text-blue-600 hover:underline focus:outline-none">
                    Details
                  </button>
                </div>
                {car.availability === 'unavailable' && <p className="text-red-500">Not Available</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCar && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 max-w-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{selectedCar.specification.manufacturer} {selectedCar.specification.model}</h2>
            <p><strong>Rental Rate:</strong> ${selectedCar.rental_rate}/Day</p>
            <p><strong>Seating Capacity:</strong> {selectedCar.specification.seating_capacity} Seats</p>
            <p><strong>Color:</strong> {selectedCar.specification.color}</p>
            <p><strong>Transmission:</strong> {selectedCar.specification.transmission}</p>
            <p><strong>Features:</strong> {selectedCar.specification.features}</p>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Booking Date</label>
              <DatePicker
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                minDate={new Date()}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Return Date</label>
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                minDate={bookingDate || new Date()}
              />
            </div>
            {bookingDate && returnDate && (
              <p className="mb-4"><strong>Total Amount:</strong> ${Math.ceil((returnDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24)) * selectedCar.rental_rate}</p>
            )}
            <div className="flex justify-between mt-4">
              <button onClick={handleCloseDetails} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Close</button>
              {selectedCar.availability === 'available' ? (
                <button onClick={handleBook} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Book</button>
              ) : (
                <p className="text-red-500">Not Available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookVehicle;
