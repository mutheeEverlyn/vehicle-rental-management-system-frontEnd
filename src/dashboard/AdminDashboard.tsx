import { RiLogoutCircleLine } from "react-icons/ri";
import hamburger from '../assets/icon-hamburger.svg'
import close from '../assets/icon-close.svg'
import { useState } from 'react'
import AdminPhoneDashboard from "./AdminPhoneDashboard";
import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { CircleDollarSign } from 'lucide-react';
import { MdAdminPanelSettings } from "react-icons/md";
import { Car } from 'lucide-react';
import { TicketCheck } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { UserRoundCog } from 'lucide-react';
import { CarFront } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
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
  const handleLogout=()=>{
    localStorage.removeItem('userDetails');

  }
  return (
    <>
    <div className="bg-black h-16 flex items-center justify-between px-4">
        <button onClick={handleLogout} type="submit" className="bg-blue-400 text-white hover:bg-primary/80 transition duration-500 rounded-md w-20 h-10 md:ml-auto m-2 " ><div className="flex items-center text-white">
          <RiLogoutCircleLine className='text-white'/>
         <Link to='/'>Logout</Link> 
         </div>
        </button>
        {showMenu?(
       <button onClick={toggleMenu} className='cursor-pointer transition-all '><img src={close} alt='close icon' className='bg-transparent  m-auto md:hidden h-10 '/></button>
      ):(
        <button onClick={toggleMenu} className=' cursor-pointer transition-all' >< img src={hamburger} alt='icon humburger' className='bg-transparent  m-auto md:hidden h-10 '/></button>
      )}
      <AdminPhoneDashboard showItems={showMenu}/>
      </div> 
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/5 bg-gray-800  p-4 text-white md:block hidden">
      <div className="flex items-center justify-start gap-3 pb-3">
          <MdAdminPanelSettings size={50} />
          <div>
            <h1 className="pt-2">Welcome {data.full_name}</h1>
          </div>
        </div>
        <ul>
          <li className="mb-2"><div className="flex items-center text-white"><LayoutDashboard className="text-white mr-2" /><Link to="">Dashboard</Link></div></li>
          <li className="mb-2"><div className="flex items-center text-white"><CarFront className="text-white mr-2"  /><Link to="vehicles">Manage Vehicles</Link></div></li>
          <li className="mb-2"><div className="flex items-center text-white"><CarFront className="text-white mr-2"  /><Link to="book-vehicle">Vehicles List</Link></div></li>
          <li className="mb-2"><div className="flex items-center text-white"><UserRoundCog  className="text-white mr-2"  /><Link to="users">Manage Users</Link></div></li>
          <li className="mb-2"><div className="flex items-center text-white"><MapPin  className="text-white mr-2" /><Link to="location">Location and Branches</Link></div></li>
          <li className="mb-2"><div className="flex items-center text-white"><TicketCheck  className="text-white mr-2"/><Link to="customer-support">Customer support tickets</Link></div></li>
          <li className="mb-2"><div className="flex items-center text-white"> <Car className="text-white mr-2"/><Link to="fleet">Fleet management</Link></div></li>
          <li className="mb-2"><div className="flex items-center text-white"><CircleDollarSign className="text-white mr-2"/><Link to="paymentsInfo">payments</Link></div></li>
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

export default AdminDashboard
