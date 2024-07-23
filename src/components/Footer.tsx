import { FaFacebook, FaInstagram, FaLinkedin, FaMobileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-sm bottom-0 left-0 w-full flex flex-col md:flex-row md:text-lg py-5 items-center max-w-full gap-5 justify-center bg-black text-white mt-auto">
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-3">
          <FaMobileAlt />
          <p className="mb-3 md:mb-0">+254 73456789</p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
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

      <div className="text-center md:text-left">
        <p className="mb-3">www.junevaCarRentals.com</p>
        </div>
        <div className="text-center md:text-left">
        <p>Copyright &copy; 2024. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
