import React, { useState } from "react";
import { useCreateCarMutation } from "./CarsAPI";
import { Toaster, toast } from 'sonner';

const Vehicles: React.FC = () => {
  const [createCar] = useCreateCarMutation();

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
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log("New Car Data:", newCar);

    try {
      const result = await createCar(newCar).unwrap();
      console.log("Car added successfully:", result);
      toast.success('Car added successfully');
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
      setImage(null);
    } catch (error:any) {
      console.error('Failed to add car:', error);
      if (error.data) {
        console.error('Error data:', error.data);
        toast.error(`Failed to add car: ${error.data.message}`);
      } else {
        toast.error('Failed to add car');
      }
    }
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
        <h1 className="text-xl my-4">Add New Car</h1>
        <form onSubmit={handleCreateCar} className="mb-4">
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
              value={rental_rate}
              onChange={(e) => setRental_rate(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="features" className="block">Features:</label>
            <textarea
              id="features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="image" className="block">Vehicle Image:</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {image && <img src={image} alt="Vehicle" className="mt-2 rounded" style={{ maxHeight: '200px' }} />}
          </div>
          <button type="submit" className="btn btn-primary">Add Car</button>
        </form>
      </div>
    </>
  );
};

export default Vehicles;
