import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Footer from '../components/Footer';
import { FaUserCircle } from "react-icons/fa";

const UserDashboard: React.FC = () => {
  return (
    <>
      <div className="bg-black h-16 flex items-center justify-between px-4">
        <div className="flex items-center text-white">
          <FaHome className="text-white mr-2" />
          <button type='submit' className='py-5'><Link to='/' className='hover:border-b-2 hover:text-blue-400 text-white'>HOME</Link></button>
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white hover:bg-primary/80 transition duration-500 rounded-md w-20 h-10 float-right m-2"
        >
          Logout
        </button>
      </div>
      <div className="flex">
        <div className="w-1/4 bg-gray-800 h-screen p-4 text-white">
        <div className="flex items-center pb-3 justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1 className="pt-2  text-blue-400">Hello user</h1>
          </div>
        </div>
          <ul>
            <li className="mb-2"><Link to="">Dashboard</Link></li>
            <li className="mb-2"><Link to="book-vehicle">Book a Vehicle</Link></li>
            <li className="mb-2"><Link to="booked-vehicles">Booked Vehicles</Link></li>
            <li className="mb-2"><Link to="my-tickets">My Tickets</Link></li>
            <li className="mb-2"><Link to="new-ticket">New Ticket</Link></li>
          </ul>
        </div>
        <div className="w-3/4 p-4">
          <Outlet /> {/* This renders the matched child route */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
