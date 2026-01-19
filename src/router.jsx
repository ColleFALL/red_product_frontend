import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import HotelsList from "./pages/hotels/HotelsList";
import HotelCreate from "../src/pages/hotels/HotelCreate";


export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
   { path: "/login", element: <Login /> }, //  AJOUT
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },

  //  Layout dashboard + pages internes
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> }, // /dashboard
      {
      path: "hotels",
      element: <HotelsList />,
      children: [
        { path: "new", element: <HotelCreate /> }, //  modal
     
    ],
  
      }
    ]
  },

  { path: "hotels/create", element: <Navigate to="/dashboard/hotels/new" replace /> },

]);
