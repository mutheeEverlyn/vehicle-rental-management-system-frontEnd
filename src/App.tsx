import React from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './components/About';
import CarList from './components/CarList';
import MoreServices from './components/MoreServices';
import Error from './pages/Error';
import Register from './features/register/Register';
import AdminDashboard from './dashboard/AdminDashboard';
import Login from './features/login/Login';
import ContactUs from './components/ContactUs';
import UserDashboard from './dashboard/UserDashboard';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import BookVehicle from './features/vehicles/BookVehicle';
import Bookings from './features/vehicles/Bookings';
import MyTickets from './features/customer_support_tickets/MyTickets';
import NewTicket from './features/customer_support_tickets/NewTicket';
import Fleet from './features/fleet_Management/Fleet';
import CustomerSupport from './features/customer_support_tickets/CustomerSupport';
import UsersTable from './features/users_management/UsersTable'
import Vehicles from './features/vehicles/Vehicles';
import Location from './features/location/Location';
import Payment from './features/payments/PaymentSuccess';
import Profile from './pages/Profile';
import PaymentsInfo from './components/PaymentsInfo';
import RouteProtection from './components/RouteProtection';
import ContactSuccess from './components/ContactSuccess';
const App: React.FC = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'vehicleImages'
    }
  });
    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image('docs/models'); 

    // Resize to 250 x 250 pixels using the 'fill' crop mode.
    myImage.resize(fill().width(250).height(250));
  
    // Render the image in a React component.
    
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: 'register',
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: 'login',
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: 'about',
      element: <About />,
      errorElement: <Error />,
    },
    {
      path: 'carList',
      element: <CarList />,
      errorElement: <Error />,
    },
    {
      path: 'moreServices',
      element: <MoreServices />,
      errorElement: <Error />,
    } ,
    {
      path: 'adminDashboard/*',
      element: (<RouteProtection element={AdminDashboard} role="admin"/>),
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Admin />,
        },
        {
          path: 'vehicles',
          element: <Vehicles/>,
        },
        {
          path: 'book-vehicle',
          element: <BookVehicle />,
        },
        {
          path: 'users',
          element: <UsersTable/>,
        },
        {
          path: 'location',
          element: <Location/>,
        },
        {
          path: 'customer-support',
          element: <CustomerSupport />,
        },
        {
          path: 'fleet',
          element: <Fleet />,
        },
        {
          path: 'paymentsInfo',
          element: <PaymentsInfo/>,
          errorElement: <Error />,
        },
      ],
    },
    {
      path: 'userDashboard/*',
      element: (<RouteProtection element={UserDashboard} role="user"/>),
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Dashboard />,
        },
        {
          path: 'book-vehicle',
          element: <BookVehicle />,
        },
        {
          path: 'bookings',
          element: <Bookings />,
        },
        {
          path: 'my-tickets',
          element: <MyTickets />,
        },
        {
          path: 'new-ticket',
          element: <NewTicket />,
        },
        {
          path: 'profile',
          element: <Profile />,
          errorElement: <Error />,
        },
   
       
      ],
    },
    {
      path: 'payment-success',
      element: <Payment />,
      errorElement: <Error />,
    },
    {
      path: 'contactUs',
      element: <ContactUs />,
      errorElement: <Error />,
    },
    {
      path: 'contactSuccess',
      element: <ContactSuccess />,
      errorElement: <Error />,
    },
  ]);

  return(
    <div>
    <RouterProvider router={router} />
    <AdvancedImage cldImg={myImage} />
    </div>
    ) 
};

export default App;
