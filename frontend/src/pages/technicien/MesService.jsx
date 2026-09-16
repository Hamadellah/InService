import React, { useEffect } from 'react';
import { useservice } from '../../hooks/useservice';
import { 
  Wrench, 
  Tag, 
  AlertCircle, 
  RefreshCw, 
  PlusCircle, 
  Trash2, 
  Pencil,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MesService() {
  const { services, loading, error, messervices } = useservice();

  useEffect(() => {
    messervices();
  }, []);

  return (
    <div className="space-y-8">
      {/* ==================== HEADER SECTION ==================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Wrench className="text-cyan-400" size={28} />
            Mes Services
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gérez vos prestations, modifiez vos tarifs et consultez vos offres publiées.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={messervices}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition active:scale-95 disabled:opacity-50"
            title="Actualiser la liste"
          >
            <RefreshCw size={18} className={loading ? "animate-spin text-cyan-400" : ""} />
          </button>

          <Link
            to="/technicien/TechnicienDashboard"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95 text-sm"
          >
            <PlusCircle size={18} />
            <span>Nouveau Service</span>
          </Link>
        </div>
      </div>

      {/* ==================== ERROR STATE ==================== */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <span>Erreur lors de la récupération des services : {error}</span>
        </div>
      )}

      {/* ==================== LOADING SKELETON ==================== */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-52 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-5 bg-slate-800 rounded w-1/3"></div>
                <div className="h-4 bg-slate-800 rounded w-1/4"></div>
              </div>
              <div className="h-12 bg-slate-800 rounded w-full"></div>
              <div className="h-6 bg-slate-800 rounded w-1/2 pt-4"></div>
            </div>
          ))}
        </div>
      )}

      {/* ==================== EMPTY STATE ==================== */}
      {!loading && !error && services && services.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
          <AlertCircle size={44} className="mx-auto text-slate-500 mb-3" />
          <h3 className="text-base font-medium text-slate-300">Aucun service disponible</h3>
          <p className="text-xs text-slate-500 mt-1 mb-5">Vous n'avez encore publié aucune prestation pour le moment.</p>
          <Link
            to="/technicien/TechnicienDashboard"
            className="inline-flex items-center gap-2 text-xs font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2.5 rounded-xl hover:bg-cyan-500/20 transition"
          >
            <PlusCircle size={15} /> Ajouter mon premier service
          </Link>
        </div>
      )}

      {/* ==================== SERVICES GRID ==================== */}
      {!loading && services && services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all"
            >
              <div>
                {/* Card Top: Title & Category */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition line-clamp-1">
                    {service.title}
                  </h2>
                  {service.category_id && (
                    <span className="shrink-0 text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Tag size={10} /> #{service.category_id}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-6">
                  {service.description || "Aucune description fournie pour ce service."}
                </p>
              </div>

              {/* Card Bottom: Price & Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Tarif</span>
                  <div className="text-xl font-black text-white">
                    {service.price ? parseFloat(service.price).toLocaleString() : '0'}
                    <span className="text-xs font-bold text-cyan-400 ml-1">DH</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-1">
                  <button 
                    className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition"
                    title="Modifier"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}