import { RiLogoutCircleLine } from "react-icons/ri";
import hamburger from '../assets/icon-hamburger.svg';
import close from '../assets/icon-close.svg';
import { useState } from 'react';
import AdminPhoneDashboard from "./AdminPhoneDashboard";
import { NavLink, Outlet,Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { CircleDollarSign, LayoutDashboard, CarFront, UserRoundCog, MapPin, TicketCheck, Car } from 'lucide-react';
import { MdAdminPanelSettings } from "react-icons/md";
import { useGetUserByIdQuery } from '../features/users_management/UsersApi';

const AdminDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No user is logged in.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const { data, error, isLoading } = useGetUserByIdQuery(user_id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
  };

  return (
    <>
      <div className="bg-black h-16 flex items-center justify-between px-4">
        <button
          onClick={handleLogout}
          type="submit"
          className="bg-blue-400 text-white hover:bg-primary/80 transition duration-500 rounded-md w-20 h-10 md:ml-auto m-2"
        >
          <div className="flex items-center text-white">
            <RiLogoutCircleLine className='text-white' />
            <Link to='/'>Logout</Link>
          </div>
        </button>
        {showMenu ? (
          <button onClick={toggleMenu} className='cursor-pointer transition-all'>
            <img src={close} alt='close icon' className='bg-transparent m-auto md:hidden h-10' />
          </button>
        ) : (
          <button onClick={toggleMenu} className='cursor-pointer transition-all'>
            <img src={hamburger} alt='hamburger icon' className='bg-transparent m-auto md:hidden h-10' />
          </button>
        )}
        <AdminPhoneDashboard showItems={showMenu} />
      </div>
      <div className="flex min-h-screen">
        <div className="w-full md:w-1/5 bg-gray-800 p-4 text-white md:block hidden">
          <div className="flex items-center justify-start gap-3 pb-3">
            <MdAdminPanelSettings size={50} />
            <div>
              <h1 className="pt-2">Welcome {data.full_name}</h1>
            </div>
          </div>
          <ul>
            <li className="mb-2">
              <NavLink to="" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}>
                <LayoutDashboard className="text-white mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="vehicles" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}>
                <CarFront className="text-white mr-2" />
                Manage Vehicles
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="book-vehicle" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}>
                <CarFront className="text-white mr-2" />
                Vehicles List
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="users" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}>
                <UserRoundCog className="text-white mr-2" />
                Manage Users
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="location" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}>
                <MapPin className="text-white mr-2" />
                Location and Branches
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="customer-support" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}>
                <TicketCheck className="text-white mr-2" />
                Customer support tickets
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="fleet" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}>
                <Car className="text-white mr-2" />
                Fleet management
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="paymentsInfo" className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}>
                <CircleDollarSign className="text-white mr-2" />
                Payments
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-3/4 p-4">
          <Outlet /> {/* This renders the matched child route */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
