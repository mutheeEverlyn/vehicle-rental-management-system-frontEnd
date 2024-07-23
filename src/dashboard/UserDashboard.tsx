import React, { useState } from 'react';
import hamburger from '../assets/icon-hamburger.svg';
import close from '../assets/icon-close.svg';
import UserPhoneDashboard from './UserPhoneDashboard';
import { NavLink, Outlet,Link } from 'react-router-dom';
import { RiLogoutCircleLine } from "react-icons/ri";
import Footer from '../components/Footer';
import { FaUserCircle } from "react-icons/fa";
import { LayoutDashboard, Car, CarFront, TicketCheck, TicketPlus } from 'lucide-react';
import { useGetUserByIdQuery } from '../features/users_management/UsersApi';

const UserDashboard: React.FC = () => {
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
        <button onClick={handleLogout} type="submit" className="bg-blue-400 text-white hover:bg-primary/80 transition duration-500 rounded-md w-20 h-10 float-right md:ml-auto m-2" >
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
        <UserPhoneDashboard showItems={showMenu} />
      </div>
      <div className="flex min-h-screen">
        <div className="md:w-1/5 w-full bg-gray-800 p-4 text-white hidden md:block">
          <div className="flex items-center pb-3 justify-start gap-3">
            <FaUserCircle size={50} />
            <div>
              <h1 className="pt-2">Welcome {data.full_name}</h1>
            </div>
          </div>
          <ul>
            <li className="mb-2">
              <NavLink
                to=""
                className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}
              >
                <LayoutDashboard className="text-white mr-2" />
                Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="book-vehicle"
                className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}
              >
                <Car className="text-white mr-2" />
                Book a Vehicle
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="bookings"
                className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}
              >
                <CarFront className="text-white mr-2" />
                My Bookings
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="my-tickets"
                className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}
              >
                <TicketCheck className="text-white mr-2" />
                My Tickets
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="new-ticket"
                className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}
              >
                <TicketPlus className="text-white mr-2" />
                New Ticket
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="profile"
                className={({ isActive }) => `flex items-center text-white ${isActive ? 'text-blue-500' : ''}`}
              >
                <FaUserCircle size={30} className="text-white mr-2" />
                My Profile
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-3/4 p-4">
          <Outlet context={{ user_id }} /> {/* Pass user_id via context */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
