import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/layout/ProtectedRoute";
import Layout from "./components/layout/Layout";

import TechnicienDashboard from "./pages/technicien/TechnicienDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MesService from "./pages/technicien/MesService";
import Demandes from "./pages/technicien/Demandes";
import Demandesc from "./pages/client/Demandesc";
import MessageTechnicien from "./pages/technicien/MessageTechnicien";
import Profile from "./pages/Profile";
import Favorites from "./pages/client/Favorites";
import ClientMessage from "./pages/client/ClientMessage";
export const router = createBrowserRouter([
 
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    element: <Layout />,
    children: [
      {
        path: "/technicien/TechnicienDashboard",
        element: (
          <ProtectedRoute role="technicien">
            <TechnicienDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/client/ClientDashboard",
        element: (
          <ProtectedRoute role="client">
            <ClientDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/AdminDashboard",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path:"/technicien/MesService",
        element: (
          <ProtectedRoute role="technicien">
            <MesService />
          </ProtectedRoute>
        ),
      },
      {
       path:"/technicien/Demandes",
       element: (
         <ProtectedRoute role="technicien">
           <Demandes />
         </ProtectedRoute>
       ),
      },
      {
        path:"/client/Demandesc",
        element: (
          <ProtectedRoute role="client">
            <Demandesc />
          </ProtectedRoute>
        ),
      },
      {
        path:"/technicien/MessageTechnicien",
        element: (
          <ProtectedRoute role="technicien">
            <MessageTechnicien />
          </ProtectedRoute>
        ),
      },
      {
        path:"/Profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path:"/client/Favorites",
        element: (
          <ProtectedRoute role="client">
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "/client/ClientMessage",
        element: (
          <ProtectedRoute role="client">
            <ClientMessage />
          </ProtectedRoute>
        ),
      },
      
    ],
  },
]);