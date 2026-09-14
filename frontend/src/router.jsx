// src/router.jsx
import { createBrowserRouter } from "react-router-dom";


// Pages publiques
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";



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
    path: "/technician/TechnicienDashboard",
    element:(
      <ProtectedRoute role="technician">
        <TechnicianDashboard />
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