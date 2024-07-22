import React, { useState, useEffect } from "react";
import { useGetCarsQuery, useCreateCarMutation, useUpdateCarMutation, useDeleteCarMutation, TCar } from "./CarsAPI";
import { Toaster, toast } from 'sonner';

const Vehicles: React.FC = () => {
  const { data: cars, isLoading, isError } = useGetCarsQuery();
  const [createCar] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  
  // Form state
  const [availability, setAvailability] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number | string>('');
  const [fuel_type, setFuel_type] = useState('');
  const [engine_capacity, setEngine_capacity] = useState('');
  const [transmission, setTransmission] = useState('');
  const [seating_capacity, setSeating_capacity] = useState<number | string>('');
  const [color, setColor] = useState('');
  const [rental_rate, setRental_rate] = useState<number | string>('');
  const [features, setFeatures] = useState('');
  const [images, setImages] = useState<string>('');
  
  // Edit state
  const [editCarId, setEditCarId] = useState<number | null>(null);
  
  useEffect(() => {
    if (editCarId !== null && cars) {
      const carToEdit = cars?.find((car: TCar) => car.vehicle_id === editCarId);
      if (carToEdit) {
        setAvailability(carToEdit.availability);
        setManufacturer(carToEdit.specification.manufacturer);
        setModel(carToEdit.specification.model);
        setYear(carToEdit.specification.year);
        setFuel_type(carToEdit.specification.fuel_type);
        setEngine_capacity(carToEdit.specification.engine_capacity);
        setTransmission(carToEdit.specification.transmission);
        setSeating_capacity(carToEdit.specification.seating_capacity);
        setColor(carToEdit.specification.color);
        setRental_rate(carToEdit.rental_rate);
        setFeatures(carToEdit.specification.features);
        setImages(carToEdit.images);
      }
    }
  }, [editCarId, cars]);

  const handleCreateCar = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newCar = {
      availability,
      manufacturer,
      model,
      year: parseInt(year.toString(), 10),
      fuel_type,
      engine_capacity,
      transmission,
      seating_capacity: parseInt(seating_capacity.toString(), 10),
      color,
      rental_rate: parseFloat(rental_rate.toString()),
      features,
      images, // Use image URL directly
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  
    try {
      await createCar(newCar).unwrap(); // Removed the 'result' variable
      toast.success('Car added successfully');
      // Reset form fields
      resetForm();
    } catch (error: any) {
      if (error.data) {
        toast.error(`Failed to add car: ${error.data.message}`);
      } else {
        toast.error('Failed to add car');
      }
    }
  };
  

  const handleEditCar = (car: TCar) => {
    setEditCarId(car.vehicle_id);
    setAvailability(car.availability);
    setManufacturer(car.specification.manufacturer);
    setModel(car.specification.model);
    setYear(car.specification.year);
    setFuel_type(car.specification.fuel_type);
    setEngine_capacity(car.specification.engine_capacity);
    setTransmission(car.specification.transmission);
    setSeating_capacity(car.specification.seating_capacity);
    setColor(car.specification.color);
    setRental_rate(car.rental_rate);
    setFeatures(car.specification.features);
    setImages(car.images); // Set image URL
  };

  const handleUpdateCar = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (editCarId === null) {
      toast.error('No car selected for update');
      return;
    }
  
    const updatedCar = {
      availability,
      manufacturer,
      model,
      year: parseInt(year.toString(), 10),
      fuel_type,
      engine_capacity,
      transmission,
      seating_capacity: parseInt(seating_capacity.toString(), 10),
      color,
      rental_rate: parseFloat(rental_rate.toString()),
      features,
      images,
      updated_at: new Date().toISOString(),
    };
  
    try {
      await updateCar({ vehicle_id: editCarId, ...updatedCar }).unwrap();
      toast.success('Car updated successfully');
      setEditCarId(null);
      // Reset form fields
      resetForm();
    } catch (error: any) {
      if (error.data) {
        toast.error(`Failed to update car: ${error.data.message || 'Unknown error'}`);
      } else {
        toast.error('Failed to update car');
      }
    }
  };

  const handleDeleteCar = async (id: number) => {
    try {
      await deleteCar(id).unwrap();
      toast.success('Car deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete car');
    }
  };

  const resetForm = () => {
    setAvailability('');
    setManufacturer('');
    setModel('');
    setYear('');
    setFuel_type('');
    setEngine_capacity('');
    setTransmission('');
    setSeating_capacity('');
    setColor('');
    setRental_rate('');
    setFeatures('');
    setImages('');
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
      <div className="p-4">
        <h1 className="text-xl my-4">{editCarId ? 'Edit Car' : 'Add New Car'}</h1>
        <form onSubmit={editCarId ? handleUpdateCar : handleCreateCar} className="mb-4">
          <div className="mb-2">
            <label htmlFor="availability" className="block">Availability:</label>
            <select
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            >
              <option value="">Select Availability</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="manufacturer" className="block">Manufacturer:</label>
            <input
              id="manufacturer"
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="model" className="block">Model:</label>
            <input
              id="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="year" className="block">Year:</label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="fuel_type" className="block">Fuel Type:</label>
            <input
              id="fuel_type"
              type="text"
              value={fuel_type}
              onChange={(e) => setFuel_type(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="engine_capacity" className="block">Engine Capacity:</label>
            <input
              id="engine_capacity"
              type="text"
              value={engine_capacity}
              onChange={(e) => setEngine_capacity(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="transmission" className="block">Transmission:</label>
            <input
              id="transmission"
              type="text"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="seating_capacity" className="block">Seating Capacity:</label>
            <input
              id="seating_capacity"
              type="number"
              value={seating_capacity}
              onChange={(e) => setSeating_capacity(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="color" className="block">Color:</label>
            <input
              id="color"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="rental_rate" className="block">Rental Rate:</label>
            <input
              id="rental_rate"
              type="number"
              step="0.01"
              value={rental_rate}
              onChange={(e) => setRental_rate(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="features" className="block">Features:</label>
            <input
              id="features"
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="images" className="block">Images (URL):</label>
            <input
              id="images"
              type="text"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {editCarId ? 'Update Car' : 'Add Car'}
          </button>
        </form>

        {isLoading && <p>Loading cars...</p>}
        {isError && <p>Error loading cars.</p>}
        
        <table className="w-full bg-gray-800 text-white border border-gray-700">
          <thead>
            <tr>
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">Manufacturer</th>
              <th className="p-2 border-b">Model</th>
              <th className="p-2 border-b">Year</th>
              <th className="p-2 border-b">Availability</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars && cars.map((car: TCar) => (
              <tr key={car.vehicle_id}>
                <td className="p-2 border-b">{car.vehicle_id}</td>
                <td className="p-2 border-b">{car.specification.manufacturer}</td>
                <td className="p-2 border-b">{car.specification.model}</td>
                <td className="p-2 border-b">{car.specification.year}</td>
                <td className="p-2 border-b">{car.availability}</td>
                <td className="p-2 border-b">
                  <button
                    onClick={() => handleEditCar(car)}
                    className="btn btn-sm btn-outline btn-info mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCar(car.vehicle_id)}
                    className="btn btn-sm btn-outline btn-warning"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Vehicles;
