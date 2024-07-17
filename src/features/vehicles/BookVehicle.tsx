
import { Link } from "react-router-dom";
import { useGetCarsQuery,TCar } from "./CarsAPI";

const BookVehicle = () => {
  const { data: cars, error, isLoading } = useGetCarsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cars.</p>;

  return (
    <div className="pb-24">
      <div className="container">
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">
          Book a vehicle to enjoy your next ride
        </h1>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {cars?.map((car:TCar) => (
              <div
                key={car.vehicle_id}
                className="space-y-3 border-2 border-gray-300 hover:border-blue-400 p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px]">
                  <img
                    src={car.image || "default-image-path"} // Add a default image path if no image is provided
                    alt={car.model}
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{car.manufacturer} {car.model}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${car.rental_rate}/Day</p>
                    <a href="#">Details</a>
                  </div>
                </div>
                <p className="text-xl font-semibold absolute top-0 left-3">
                  {car.seating_capacity} Seats
                </p>
                <div className="grid place-items-center mt-8">
                  <button className="bg-blue-400 p-2 hover:bg-primary/80 transition duration-500 rounded-md">
                    <Link to='/userDashboard/bookings'>Book</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookVehicle;
