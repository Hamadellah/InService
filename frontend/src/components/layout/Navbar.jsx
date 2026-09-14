import React, { useState } from 'react';
import { Menu, X, Bell, ChevronDown, LogOut, User } from 'lucide-react';

export default function Navbar({ toggleSidebar, isSidebarOpen, user, logout }) {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* Left: Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 lg:hidden"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
              iS
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              InService
            </span>
          </a>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setNotifDropdown(!notifDropdown)}
              className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-slate-900"></span>
            </button>

            {notifDropdown && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-800 font-semibold text-xs text-slate-300">
                  Notifications
                </div>
                <div className="p-3 text-xs text-slate-400 hover:bg-slate-800/50 cursor-pointer">
                  Nouvelle demande d'intervention reçue.
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
                {user?.name?.[0] || 'U'}
              </div>
              <span className="text-sm font-medium hidden md:inline-block text-slate-200">{user?.name || 'Utilisateur'}</span>
              <ChevronDown size={16} className="text-slate-400" />
            </button>

            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1 z-50">
                <div className="px-4 py-2 border-b border-slate-800">
                  <p className="text-xs font-semibold text-slate-200">{user?.name}</p>
                  <p className="text-[11px] text-cyan-400 capitalize">{user?.role}</p>
                </div>
                <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 transition">
                  <User size={14} /> Profil
                </a>
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-slate-800 transition"
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