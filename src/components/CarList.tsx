import { Link } from "react-router-dom";
import whiteCar from "../assets/white-car.png";
import car2 from "../assets/car5.png";
import car3 from "../assets/car6.png";
const carList = [
  {
    name: "BMW UX",
    price: 100,
    image: whiteCar
  },
  {
    name: "KIA UX",
    price: 140,
    image: car2
  },
  {
    name: "BMW UX",
    price: 100,
    image: car3
  },
];

const CarList = () => {
  return (
    <div className="pb-24">
      <div className="container">
        
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3 text-center" >some of the cars we have </h1>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {carList.map((data) => (
              <div className="space-y-3 border-2 border-gray-300 hover:border-blue-400 p-3 rounded-xl relative group" >
                <div className="w-full h-[120px]">
                  <img
                    src={data.image}
                    alt="car"
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${data.price}/Day</p>
                    {/* <a href="#">Details</a> */}
                  </div>
                </div>
                <p className="text-xl font-semibold absolute top-0 left-3">
                  12Km
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className=" place-items-center mt-8 flex gap-4 items-center m-auto w-96">
          <button  className="bg-blue-400 p-2  hover:bg-primary/80 transition duration-500  rounded-md">
           <Link to='/register'>Rent Yours Today</Link> 
          </button>
          <button className="bg-blue-400 p-2 rounded-md"><Link to='/'>Go back</Link></button> 
        </div>
      </div>
    </div>
  );
};

export default CarList;
