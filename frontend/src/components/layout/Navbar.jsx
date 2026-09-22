import React, { useState } from "react";

import {
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Wrench,
  X,
  CheckCircle2
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Navbar({
  toggleSidebar,
  isSidebarOpen,
  user,
  logout
}) {
  const [profileDropdown, setProfileDropdown] =
    useState(false);

  const [notifDropdown, setNotifDropdown] =
    useState(false);

  const initial =
    user?.name?.[0]?.toUpperCase() || "U";

  const roleLabel = {
    technicien: "Technicien",
    client: "Client",
    admin: "Administrateur"
  };

  return (
    <header className="sticky top-0 z-30 h-[76px] border-b border-slate-200/70 bg-[#f5f7f6]/90 backdrop-blur-xl">

      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* MOBILE MENU */}
          <button
            onClick={toggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 lg:hidden"
          >
            {isSidebarOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>

          {/* MOBILE LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2.5 lg:hidden"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0d1f1a] text-xs font-black text-emerald-400">
              iS
            </div>

            <span className="hidden text-base font-black tracking-tight text-slate-900 sm:block">
              In
              <span className="text-emerald-600">
                Service
              </span>
            </span>

          </Link>

          {/* DESKTOP PAGE INFO */}
          <div className="hidden lg:block">

            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-600">
              InService Platform
            </p>

            <p className="mt-0.5 text-sm font-bold text-slate-700">
              Bienvenue,{" "}
              <span className="text-slate-950">
                {user?.name || "Utilisateur"}
              </span>
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* ROLE */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 md:flex">

            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
              {roleLabel[user?.role] ||
                user?.role ||
                "Utilisateur"}
            </span>

          </div>

          {/* NOTIFICATIONS */}
          <div className="relative">

            <button
              onClick={() => {
                setNotifDropdown(!notifDropdown);
                setProfileDropdown(false);
              }}
              className={`
                relative flex h-10 w-10
                items-center justify-center
                rounded-xl border
                transition-all

                ${
                  notifDropdown
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                }
              `}
            >
              <Bell size={18} />

              <span className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />

            </button>

            {/* NOTIFICATION DROPDOWN */}
            {notifDropdown && (

              <div className="absolute right-0 mt-3 w-[310px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)] sm:w-[350px]">

                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                  <div>

                    <p className="text-sm font-black text-slate-900">
                      Notifications
                    </p>

                    <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                      Vos dernières activités
                    </p>

                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Bell size={14} />
                  </div>

                </div>

                <div className="p-2">

                  <div className="group flex cursor-pointer gap-3 rounded-2xl p-3 transition hover:bg-[#f5f7f6]">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-[#0d1f1a]">
                      <Wrench size={16} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <p className="text-xs font-bold leading-5 text-slate-800">
                          Nouvelle demande
                        </p>

                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

                      </div>

                      <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                        Nouvelle demande d'intervention reçue.
                      </p>

                      <p className="mt-2 text-[9px] font-bold uppercase tracking-wide text-emerald-600">
                        Maintenant
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* PROFILE */}
          <div className="relative">

            <button
              onClick={() => {
                setProfileDropdown(!profileDropdown);
                setNotifDropdown(false);
              }}
              className={`
                flex h-11 items-center gap-2
                rounded-2xl border
                bg-white p-1.5 pr-2
                transition-all

                ${
                  profileDropdown
                    ? "border-emerald-200 shadow-sm"
                    : "border-slate-200 hover:border-emerald-200"
                }
              `}
            >

              {/* AVATAR */}
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0d1f1a] text-xs font-black text-emerald-300">
                {initial}
              </div>

              <div className="hidden min-w-0 text-left sm:block">

                <p className="max-w-[110px] truncate text-[11px] font-black leading-4 text-slate-800">
                  {user?.name || "Utilisateur"}
                </p>

                <p className="text-[9px] font-bold capitalize leading-3 text-slate-400">
                  {roleLabel[user?.role] ||
                    user?.role}
                </p>

              </div>

              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform duration-200 ${
                  profileDropdown
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>

            {/* PROFILE DROPDOWN */}
            {profileDropdown && (

              <div className="absolute right-0 mt-3 w-[240px] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)]">

                {/* USER */}
                <div className="bg-[#0d1f1a] p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-emerald-400 text-sm font-black text-[#0d1f1a]">
                      {initial}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-black text-white">
                        {user?.name ||
                          "Utilisateur"}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">

                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                        <p className="text-[9px] font-black uppercase tracking-wide text-emerald-300">
                          {roleLabel[user?.role] ||
                            user?.role}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* ACTIONS */}
                <div className="p-2">

                  <Link
                    to="/profile"
                    onClick={() =>
                      setProfileDropdown(false)
                    }
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >

                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-emerald-100 group-hover:text-emerald-700">
                      <User size={14} />
                    </div>

                    Mon profil

                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={logout}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-50"
                  >

                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-500">
                      <LogOut size={14} />
                    </div>

                    Déconnexion

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}