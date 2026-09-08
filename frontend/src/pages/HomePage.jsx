import React, { useState } from 'react';
// 1. Zid Link mn react-router-dom
import { Link } from 'react-router-dom';

import { 
  Search, MapPin, Wrench, Zap, Shield, Star, 
  Heart, ArrowRight, CheckCircle2, MessageSquare, 
  Award, Clock, Users, ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 1, name: 'Électricité', icon: <Zap className="w-6 h-6 text-yellow-500" />, count: '120+ Techs' },
    { id: 2, name: 'Plomberie', icon: <Wrench className="w-6 h-6 text-blue-500" />, count: '95+ Techs' },
    { id: 3, name: 'Climatisation', icon: <Clock className="w-6 h-6 text-cyan-500" />, count: '60+ Techs' },
    { id: 4, name: 'Sécurité & Alarme', icon: <Shield className="w-6 h-6 text-emerald-500" />, count: '40+ Techs' },
  ];

  const topServices = [
    {
      id: 101,
      techName: "Youssef El Amrani",
      techRole: "Électricien Certifié",
      avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=150",
      title: "Installation & Dépannage Électrique Complet",
      category: "Électricité",
      price: "150 DH/h",
      city: "Casablanca",
      rating: 4.9,
      reviewsCount: 38,
      verified: true
    },
    {
      id: 102,
      techName: "Karim Benchakroun",
      techRole: "Plombier Général",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      title: "Réparation Fuites d'eau & Installation Sanitaire",
      category: "Plomberie",
      price: "200 DH/h",
      city: "Rabat",
      rating: 4.8,
      reviewsCount: 52,
      verified: true
    }
  ];

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl font-black text-xl tracking-wider shadow-lg shadow-blue-500/20">
              IS
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              InService
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#services" className="hover:text-blue-600 transition">Services</a>
            <a href="#categories" className="hover:text-blue-600 transition">Catégories</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition">Comment ça marche</a>
          </nav>

          {/* BOUTONS LOGIN / REGISTER */}
          <div className="flex items-center gap-4">
            {/* Bouton Login */}
            <Link 
              to="/login" 
              className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 transition"
            >
              Se connecter
            </Link>

            {/* Bouton Register / Inscription */}
            <Link 
              to="/register" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl transition shadow-md shadow-blue-600/20"
            >
              Rejoindre InService
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <Award className="w-4 h-4" /> Plateforme #1 de Techniciens Qualifiés
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Trouvez le meilleur technicien pour vos travaux en un clic.
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Des experts vérifiés en plomberie, électricité, et climatisation prêts à intervenir rapidement chez vous.
            </p>

            {/* SEARCH BAR */}
            <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <Search className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Quel service cherchez-vous ?" 
                  className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-2">
                <MapPin className="w-5 h-5 text-slate-400" />
                <select className="bg-transparent outline-none text-slate-600 text-sm w-full cursor-pointer">
                  <option value="">Toutes les villes</option>
                  <option value="casablanca">Casablanca</option>
                  <option value="rabat">Rabat</option>
                  <option value="marrakech">Marrakech</option>
                </select>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section id="categories" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Explorez par Catégories</h2>
            <p className="text-slate-500 mt-1">Découvrez nos domaines d'intervention les plus demandés</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 cursor-pointer flex items-center gap-4"
            >
              <div className="p-3.5 bg-slate-50 rounded-xl">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{cat.name}</h3>
                <span className="text-xs text-slate-400 font-medium">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg font-black text-lg">IS</div>
            <span className="font-bold text-xl text-slate-800">InService</span>
          </div>
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} InService. Tous droits réservés.</p>
        </div>
      </footer>

    </div>
  );
}