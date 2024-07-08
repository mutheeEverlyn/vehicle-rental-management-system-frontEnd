import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Error from './pages/Error';
import Register from './pages/Register';
import AdminDashboard from './dashboard/AdminDashboard';
import Login from './features/login/Login';
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
      path: 'adminDashboard',
      element: <AdminDashboard />,
      errorElement: <Error />,
    },
    {
      path: 'userDashboard',
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
