import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        isSidebarOpen={sidebarOpen}
        user={user}
        logout={logout}
      />

      {/* Main Body Area */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          role={user?.role || 'client'} 
        />

        {/* Content View Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all duration-300">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}