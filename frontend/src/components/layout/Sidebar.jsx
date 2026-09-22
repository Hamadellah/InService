import React from "react";
import { NavLink } from "react-router-dom";

import {
  Home,
  Wrench,
  Calendar,
  MessageSquare,
  Heart,
  LayoutGrid,
  Users,
  ShieldCheck,
  Star,
  Clock,
  ChevronRight,
  Sparkles,
  X
} from "lucide-react";

export default function Sidebar({
  isOpen,
  setIsOpen,
  role
}) {
  const navConfig = {
    client: [
      {
        name: "Services",
        icon: Wrench,
        to: "/client/ClientDashboard"
      },
      {
        name: "Mes Demandes",
        icon: Calendar,
        to: "/client/Demandesc"
      },
      {
        name: "Favoris",
        icon: Heart,
        to: "/client/Favorites"
      }
    ],

    technicien: [
      {
        name: "Dashboard",
        icon: Home,
        to: "/technicien/TechnicienDashboard"
      },
      {
        name: "Mes Services",
        icon: Wrench,
        to: "/technicien/MesService"
      },
      {
        name: "Demandes reçues",
        icon: Calendar,
        to: "/technicien/demandes"
      },
      {
        name: "Disponibilités",
        icon: Clock,
        to: "/technicien/Disponibilites"
      },
      {
        name: "Messagerie",
        icon: MessageSquare,
        to: "/technicien/MessageTechnicien"
      }
    ],

    admin: [
      {
        name: "Dashboard",
        icon: Home,
        to: "/admin/AdminDashboard"
      },
      {
        name: "Utilisateurs",
        icon: Users,
        to: "/admin/users"
      },
      {
        name: "Catégories",
        icon: LayoutGrid,
        to: "/admin/categories"
      },
      {
        name: "Services",
        icon: ShieldCheck,
        to: "/admin/services"
      },
      {
        name: "Avis & Modération",
        icon: Star,
        to: "/admin/avis"
      }
    ]
  };

  const currentNav =
    navConfig[role] || navConfig.client;

  const roleLabel = {
    client: "Espace Client",
    technicien: "Espace Technicien",
    admin: "Administration"
  };

  return (
    <>
      {/* MOBILE BACKDROP */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-[#07110e]/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen w-[280px] flex-col
          bg-[#0d1f1a]
          transition-transform duration-300 ease-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* LOGO */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.07] px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-emerald-400 font-black text-[#0d1f1a] shadow-lg shadow-black/20">
              iS
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight text-white">
                In
                <span className="text-emerald-400">
                  Service
                </span>
              </h1>

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Services Platform
              </p>
            </div>

          </div>

          {/* CLOSE MOBILE */}
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>

        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 py-6">

          <div className="mb-5 px-3">

            <div className="mb-2 flex items-center gap-2">

              <Sparkles
                size={12}
                className="text-emerald-400"
              />

              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-400">
                Navigation
              </span>

            </div>

            <p className="text-xs font-semibold text-slate-500">
              {roleLabel[role] || "Mon espace"}
            </p>

          </div>

          <nav className="space-y-1.5">

            {currentNav.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    group relative flex h-[50px]
                    items-center justify-between
                    overflow-hidden rounded-2xl
                    px-3.5
                    text-sm font-bold
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-emerald-400 text-[#0d1f1a] shadow-lg shadow-black/10"
                        : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">

                        {/* ICON */}
                        <div
                          className={`
                            flex h-9 w-9
                            items-center justify-center
                            rounded-xl
                            transition-all duration-200

                            ${
                              isActive
                                ? "bg-[#0d1f1a] text-emerald-300"
                                : "bg-white/[0.05] text-slate-500 group-hover:bg-white/10 group-hover:text-emerald-400"
                            }
                          `}
                        >
                          <Icon
                            size={17}
                            strokeWidth={2.2}
                          />
                        </div>

                        {/* NAME */}
                        <span>
                          {item.name}
                        </span>

                      </div>

                      {/* ARROW */}
                      <ChevronRight
                        size={15}
                        className={`
                          transition-all duration-200

                          ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }
                        `}
                      />

                    </>
                  )}
                </NavLink>
              );
            })}

          </nav>

        </div>

        {/* BOTTOM */}
        <div className="shrink-0 p-4">

          <div className="relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-white/[0.04] p-4">

            {/* EFFECT */}
            <div className="pointer-events-none absolute -right-7 -top-7 h-20 w-20 rounded-full bg-emerald-400/10 blur-xl" />

            <div className="relative">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <ShieldCheck size={17} />
              </div>

              <p className="text-xs font-black text-white">
                InService
              </p>

              <p className="mt-1 text-[10px] leading-4 text-slate-500">
                Gérez votre activité simplement et efficacement.
              </p>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}