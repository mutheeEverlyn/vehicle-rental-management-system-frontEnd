import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { RiLogoutCircleLine } from "react-icons/ri";
import Footer from '../components/Footer';
import { FaUserCircle } from "react-icons/fa";
import { LayoutDashboard } from 'lucide-react';
import { Car } from 'lucide-react';
import { CarFront } from 'lucide-react';
import { TicketCheck } from 'lucide-react';
import { TicketPlus } from 'lucide-react';
import { useGetUserByIdQuery } from '../features/users_management/UsersApi';
const UserDashboard: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    return <div>Error: No user is logged in.</div>;
  }

  const parsedUserDetails = JSON.parse(userDetails);
  const user_id = parsedUserDetails.user_id;
  const { data, error, isLoading } = useGetUserByIdQuery(user_id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  return (
    <>
    <div className="bg-black h-16 flex items-center  px-4">
        <button type="submit" className="bg-blue-400 text-white hover:bg-primary/80 transition duration-500 rounded-md w-20 h-10 float-right ml-auto m-2 " ><div className="flex items-center text-white">
          <RiLogoutCircleLine className='text-white'/>
         <Link to='/'>Logout</Link> 
         </div>
        </button>
        
      </div> 
      <div className="flex">
        <div className="w-1/4 bg-gray-800 h-screen p-4 text-white">
        <div className="flex items-center pb-3 justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1 className="pt-2  text-blue-400">Welcome {data.full_name}</h1>
          </div>
        </div>
          <ul>
          <li className="mb-2"><div className="flex items-center text-white"><LayoutDashboard className="text-white mr-2" /><Link to="">Dashboard</Link></div></li>
            <li className="mb-2"><div className="flex items-center text-white"> <Car className="text-white mr-2"/><Link to="book-vehicle">Book a Vehicle</Link></div></li>
            <li className="mb-2"><div className="flex items-center text-white"><CarFront className="text-white mr-2"  /><Link to="bookings">My bookings</Link></div></li>
            <li className="mb-2"><div className="flex items-center text-white"><TicketCheck  className="text-white mr-2"/><Link to="my-tickets">My Tickets</Link></div></li>
            <li className="mb-2"><div className="flex items-center text-white"><TicketPlus className="text-white mr-2" /><Link to="new-ticket">New Ticket</Link></div></li>
            <li className="mb-2"><div className="flex items-center text-white"><TicketPlus className="text-white mr-2" /><Link to="profile">My profile</Link></div></li>
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
