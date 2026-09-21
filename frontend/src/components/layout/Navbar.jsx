import React, { useState } from 'react';
import { Menu, X, Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ toggleSidebar, isSidebarOpen, user, logout }) {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden transition"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-500/20">
              iS
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              In<span className="text-blue-600">Service</span>
            </span>
          </Link>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setNotifDropdown(!notifDropdown);
                setProfileDropdown(false);
              }}
              className="relative p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-transparent"
            >
              <Bell size={19} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
            </button>

            {notifDropdown && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100 text-xs font-bold text-slate-800">
                  Notifications
                </div>
                <div className="p-3.5 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer transition">
                  Nouvelle demande d'intervention reçue.
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={() => {
                setProfileDropdown(!profileDropdown);
                setNotifDropdown(false);
              }}
              className="flex items-center gap-2.5 p-1.5 pl-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition"
            >
              <div className="w-7 h-7 rounded-md bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-xs font-semibold hidden md:inline-block text-slate-800">
                {user?.name || 'Utilisateur'}
              </span>
              <ChevronDown size={14} className="text-slate-500" />
            </button>

            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 animate-in fade-in duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                  <p className="text-[10px] text-blue-600 capitalize font-medium">{user?.role}</p>
                </div>
                
                <Link 
                  to="/profile" 
                  onClick={() => setProfileDropdown(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <User size={14} className="text-slate-500" /> Profil
                </Link>

                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={14} /> Déconnexion
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}