// f src/components/layout/Sidebar.jsx
import React from 'react';
import { 
  Home, Wrench, Calendar, MessageSquare, Heart, 
  LayoutGrid, Users, ShieldCheck, Star, Clock 
} from 'lucide-react'; // <--- Beddel FolderGrid b LayoutGrid hna

export default function Sidebar({ isOpen, setIsOpen, role }) {
  
  const navConfig = {
    client: [
      { name: 'Services', icon: Wrench, href: '/services' },
      { name: 'Mes Demandes', icon: Calendar, href: '/demandes' },
      { name: 'Favoris', icon: Heart, href: '/favoris' },
      { name: 'Messagerie', icon: MessageSquare, href: '/messages' },
    ],
    technicien: [
      { name: 'Dashboard', icon: Home, href: '/technicien/TechnicienDashboard' },
      { name: 'Mes Services', icon: Wrench, href: '/technicien/services' },
      { name: 'Demandes reçues', icon: Calendar, href: '/technicien/demandes' },
      { name: 'Disponibilités', icon: Clock, href: '/technicien/disponibilites' },
      { name: 'Messagerie', icon: MessageSquare, href: '/messages' },
    ],
    admin: [
      { name: 'Dashboard', icon: Home, href: '/admin/AdminDashboard' },
      { name: 'Utilisateurs', icon: Users, href: '/admin/users' },
      { name: 'Catégories', icon: LayoutGrid, href: '/admin/categories' }, // <--- Utillisiha hna
      { name: 'Services', icon: ShieldCheck, href: '/admin/services' },
      { name: 'Avis & Modération', icon: Star, href: '/admin/avis' },
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
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition group"
              >
                <Icon size={18} className="text-slate-400 group-hover:text-cyan-400 transition" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>
      </aside>
    </>
  );
}