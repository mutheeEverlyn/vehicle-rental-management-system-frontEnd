
import yellowCar from "../assets/banner-car.png";
import { Link } from "react-router-dom";
const Hero = ()=> {
  
  return (
    <div >
      <div className="w-full max-w-full min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div className="order-1 sm:order-2" >
            <img
              src={yellowCar}
              alt="car"
              className="sm:scale-125 duration-300 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)] hue-rotate-180"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ">
            <p  className="text-primary text-2xl font-serif">
              Welcome to juneva car rentals
            </p>
            <h1 className="text-3xl lg:text-5xl font-semibold font-serif">
            Rent Your Dream car today
            </h1>
            <p >
              Enjoy every moment with the one's you love by renting a car from our vast collection
            </p>
            <button onClick={() => {
                
              }}
              className="rounded-md bg-blue-400 hover:bg-primary/80 transition duration-500 py-2 px-6 text-black"
            ><Link to='/register'>
              Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
