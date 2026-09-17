import React from 'react';
import { NavLink } from 'react-router-dom'; // <--- Zdna NavLink hna
import { 
  Home, Wrench, Calendar, MessageSquare, Heart, 
  LayoutGrid, Users, ShieldCheck, Star, Clock 
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, role }) {
  
  const navConfig = {
    client: [
      { name: 'Services', icon: Wrench, to: '/client/ClientDashboard' },
      { name: 'Mes Demandes', icon: Calendar, to: '/client/Demandesc' },
      { name: 'Favoris', icon: Heart, to: '/favoris' },
      { name: 'Messagerie', icon: MessageSquare, to: '/messages' },
    ],
    technicien: [
      { name: 'Dashboard', icon: Home, to: '/technicien/TechnicienDashboard' },
      { name: 'Mes Services', icon: Wrench, to: '/technicien/MesService' },
      { name: 'Demandes reçues', icon: Calendar, to: '/technicien/demandes' },
      { name: 'Disponibilités', icon: Clock, to: '/technicien/disponibilites' },
      { name: 'Messagerie', icon: MessageSquare, to: '/messages' },
    ],
    admin: [
      { name: 'Dashboard', icon: Home, to: '/admin/AdminDashboard' },
      { name: 'Utilisateurs', icon: Users, to: '/admin/users' },
      { name: 'Catégories', icon: LayoutGrid, to: '/admin/categories' },
      { name: 'Services', icon: ShieldCheck, to: '/admin/services' },
      { name: 'Avis & Modération', icon: Star, to: '/admin/avis' },
    ]
  };

  const currentNav = navConfig[role] || navConfig.client;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-slate-900/60 border-r border-slate-800/80 backdrop-blur-lg
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col justify-between pt-16 lg:pt-0
      `}>
        <div className="px-4 py-6 space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Espace {role}
          </p>

          {currentNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setIsOpen(false)} // Khashha t-sdd Sidebar f Mobile mni t-cliqui 3la lien
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition group
                  ${isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-cyan-400'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-400 transition"} />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
}