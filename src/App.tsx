import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Error from './pages/Error';
import Register from './pages/Register';
import AdminDashboard from './dashboard/AdminDashboard';
import Login from './pages/Login';
import Contact from './components/Contact';
import UserDashboard from './dashboard/UserDashboard';

const App: React.FC = () => {
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
      path: 'admin-dashboard',
      element: <AdminDashboard />,
      errorElement: <Error />,
    },
    {
      path: 'user-dashboard',
      element: <UserDashboard />,
      errorElement: <Error />,
    },
    {
      path: 'contact',
      element: <Contact />,
      errorElement: <Error />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
