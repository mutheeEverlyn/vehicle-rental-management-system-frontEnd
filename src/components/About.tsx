
import CarPng from "../assets/car1.png";

const About = () => {
  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center w-full max-w-full ">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div  >
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1 className="text-3xl sm:text-4xl font-bold font-serif"> About us</h1>
              <p  className="leading-8 ">
                We offer our customers a wide range of commercial cars and luxury cars for any occassion
              </p>
              <p >
               We believe that everyone deserves to experience the pleasure of driving a reliable and comfortable vehicle,regardless of their budget.
              </p>
              <button  className="button-outline">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
