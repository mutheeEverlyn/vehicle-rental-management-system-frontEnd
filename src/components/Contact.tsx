import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <>
      <div  className=" py-14 ">
        <div className="w-full max-w-full ">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-blue-400 py-8 px-6">
            <div className="col-span-2 space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Let's collaborate on your upcoming vehicle rental venture to have an amaizing momment
              </h1>
              <p className="text-gray-800">
                If you have any questions or suggestions fell free to contact us
              </p>
            </div>
            <div className="sm:grid sm:place-items-center">
              <button className="inline-block font-semibold  hover:bg-primary/80 transition duration-500 py-2 px-6 bg-blue-500 text-white tracking-widest uppercase rounded-md" >
               <Link to='/contactUs'>Contact Us</Link> 
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
