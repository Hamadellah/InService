import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="h-screen overflow-hidden bg-[#f5f7f6] font-sans text-slate-900 selection:bg-emerald-400 selection:text-[#0d1f1a]">

      {/* SIDEBAR FIXED */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        role={user?.role || "client"}
      />

      {/* RIGHT SIDE */}
      <div className="flex h-screen flex-col lg:ml-[280px]">

        {/* NAVBAR FIXED IN RIGHT AREA */}
        <div className="shrink-0">
          <Navbar
            toggleSidebar={() =>
              setSidebarOpen(!sidebarOpen)
            }
            isSidebarOpen={sidebarOpen}
            user={user}
            logout={logout}
          />
        </div>

        {/* ONLY THIS PART SCROLLS */}
        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">

          <Outlet />

        </main>

      </div>

    </div>
  );
}