import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Error from './pages/Error';
import Register from './pages/Register';
import Dashboard from './dashboard/Dashboard';
import Login from './pages/Login';

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
      path: 'dashboard',
      element: <Dashboard />,
      errorElement: <Error />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
