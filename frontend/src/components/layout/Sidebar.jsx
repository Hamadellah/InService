import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Wrench, Calendar, MessageSquare, Heart, 
  LayoutGrid, Users, ShieldCheck, Star, Clock 
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, role }) {
  
  const navConfig = {
    client: [
      { name: 'Services', icon: Wrench, to: '/client/ClientDashboard' },
      { name: 'Mes Demandes', icon: Calendar, to: '/client/Demandesc' },
      { name: 'Favoris', icon: Heart, to: '/client/Favorites' },
    ],
    technicien: [
      { name: 'Dashboard', icon: Home, to: '/technicien/TechnicienDashboard' },
      { name: 'Mes Services', icon: Wrench, to: '/technicien/MesService' },
      { name: 'Demandes reçues', icon: Calendar, to: '/technicien/demandes' },
      { name: 'Disponibilités', icon: Clock, to: '/technicien/Disponibilites' },
      { name: 'Messagerie', icon: MessageSquare, to: '/technicien/MessageTechnicien' },
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
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-slate-200
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col justify-between pt-20 lg:pt-6
      `}>
        <div className="px-4 space-y-1.5">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
            Espace {role}
          </p>

          {currentNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-100 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600 transition"} />
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