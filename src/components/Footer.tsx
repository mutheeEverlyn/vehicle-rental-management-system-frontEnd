import { FaFacebook,FaInstagram,FaLinkedin, FaMobileAlt,} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-sm  bottom-0 left-0 w-full flex  md:text-lg py-5 items-center max-w-full gap-5 justify-center bg-black text-white  mt-auto">
      <div className="flex items-center  gap-3">
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt />
              <p>+254 73456789</p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="#">
                <FaInstagram className="text-3xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaLinkedin className="text-3xl hover:text-primary duration-300" />
              </a>
            </div>
          </div>
    
      <p>www.junevaCarRentals.com</p>
      <p>copyright &copy;2024.All rights reserved.</p>
    </div>
  )
}

export default Footer
