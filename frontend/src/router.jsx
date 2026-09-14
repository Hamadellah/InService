// src/router.jsx
import { createBrowserRouter } from "react-router-dom";


import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/layout/ProtectedRoute";


import TechnicienDashboard from "./pages/technicien/TechnicienDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";



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
    path: "/technicien/TechnicienDashboard",
    element:(
      <ProtectedRoute role="technicien">
        <TechnicienDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/client/ClientDashboard",
    element:(
      <ProtectedRoute role="client">
        <ClientDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/AdminDashboard",
    element:(
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    )
  }


]);