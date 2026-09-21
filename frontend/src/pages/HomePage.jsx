import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, MapPin, Wrench, Zap, Shield, Star, 
  Clock, Award, ArrowRight, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 1, name: 'Électricité', icon: <Zap className="w-6 h-6 text-amber-400" />, count: '120+ Techs' },
    { id: 2, name: 'Plomberie', icon: <Wrench className="w-6 h-6 text-cyan-400" />, count: '95+ Techs' },
    { id: 3, name: 'Climatisation', icon: <Clock className="w-6 h-6 text-blue-400" />, count: '60+ Techs' },
    { id: 4, name: 'Sécurité & Alarme', icon: <Shield className="w-6 h-6 text-emerald-400" />, count: '40+ Techs' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 p-2.5 rounded-2xl font-black text-xl tracking-wider shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              IS
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              InService
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-400 text-sm">
            <a href="#categories" className="hover:text-cyan-400 transition-colors">Catégories</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">Comment ça marche</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">Avantages</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-slate-300 hover:text-white font-semibold text-sm px-4 py-2 transition"
            >
              Se connecter
            </Link>

            <Link 
              to="/register" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              Rejoindre InService
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 lg:pt-28 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6 shadow-sm">
              <Award className="w-4 h-4" /> Plateforme #1 de Techniciens Qualifiés
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Trouvez le meilleur technicien pour vos travaux en un clic.
            </h1>
            <p className="text-base sm:text-lg text-slate-400 mb-10 leading-relaxed">
              Des experts vérifiés en plomberie, électricité, et climatisation prêts à intervenir rapidement chez vous.
            </p>

            {/* BARRE DE RECHERCHE */}
            <div className="bg-slate-900/80 backdrop-blur-xl p-3 rounded-2xl border border-slate-800 shadow-2xl shadow-cyan-500/5 flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-800">
                <Search className="w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Quel service cherchez-vous ?" 
                  className="w-full bg-transparent outline-none text-slate-100 placeholder-slate-500 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-2">
                <MapPin className="w-5 h-5 text-slate-500" />
                <select className="bg-transparent outline-none text-slate-300 text-sm w-full cursor-pointer">
                  <option value="" className="bg-slate-900">Toutes les villes</option>
                  <option value="casablanca" className="bg-slate-900">Casablanca</option>
                  <option value="rabat" className="bg-slate-900">Rabat</option>
                  <option value="marrakech" className="bg-slate-900">Marrakech</option>
                </select>
              </div>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 text-sm active:scale-95">
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Explorez par Catégories</h2>
            <p className="text-slate-400 text-sm mt-1">Découvrez nos domaines d'intervention les plus demandés</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-md hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 group cursor-pointer flex items-center gap-4"
            >
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 group-hover:border-cyan-500/30 transition">
                {cat.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition">{cat.name}</h3>
                <span className="text-xs text-slate-500 font-medium">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 p-2 rounded-xl font-black text-base">IS</div>
            <span className="font-bold text-lg text-white">InService</span>
          </div>
          <p className="text-slate-500 text-xs">© {new Date().getFullYear()} InService. Tous droits réservés.</p>
        </div>
      </footer>

    </div>
  );
}