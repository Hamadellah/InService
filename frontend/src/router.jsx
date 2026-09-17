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
export const router = createBrowserRouter([
  // Public Routes (Bla Navbar/Sidebar dyal Dashboard)
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

  // Protected Routes (Kamlin ghadin ysharku f l-Layout)
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
      }
    ],
  },
]);