import React, { useEffect } from "react";
import { useFavorites } from "../../hooks/usefavorites";
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Trash2, 
  RefreshCw, 
  UserCheck 
} from "lucide-react";

export default function Favorites() {
  const { favorites, loading, getFavorites, makeFavorite } = useFavorites();

  useEffect(() => {
    getFavorites();
  }, []);

  const handleRemoveFavorite = async (serviceId) => {
    if (makeFavorite) {
      await makeFavorite(serviceId);
      getFavorites(); // Re-fetch favorites bsh t-update l-liste
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Heart className="text-rose-500 fill-rose-500" size={28} />
            Mes Techniciens Favoris
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Retrouvez rapidement les techniciens que vous avez ajoutés à vos favoris.
          </p>
        </div>

        <button
          onClick={getFavorites}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-sm font-medium transition active:scale-95 disabled:opacity-50 shrink-0"
        >
          <RefreshCw size={16} className={loading ? "animate-spin text-cyan-400" : ""} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-56 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse p-6 space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-800 rounded w-2/3"></div>
                  <div className="h-3 bg-slate-800 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-10 bg-slate-800 rounded-xl"></div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && (!favorites || favorites.length === 0) && (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
          <Heart size={44} className="mx-auto text-slate-600 mb-3" />
          <h3 className="text-base font-medium text-slate-300">Aucun favori pour le moment</h3>
          <p className="text-xs text-slate-500 mt-1">
            Parcourez la liste des services et ajoutez des techniciens à vos favoris.
          </p>
        </div>
      )}

      {/* FAVORITES GRID */}
      {!loading && favorites && favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => {
            // Support bsh y-khdm mʿa "favorite_id" wla "id"
            const favKey = fav.favorite_id || fav.id;

            return (
              <div
                key={favKey}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md hover:border-rose-500/40 hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-4">
                      {/* PROFILE IMAGE */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl border border-slate-700 overflow-hidden bg-slate-950 flex items-center justify-center shrink-0">
                          {fav.image ? (
                            <img
                              src={fav.image}
                              alt={fav.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <span className="text-xl font-bold text-cyan-400">
                              {fav.name ? fav.name[0] : "T"}
                            </span>
                          )}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                      </div>

                      {/* NAME & CITY */}
                      <div>
                        <h3 className="font-bold text-slate-100 group-hover:text-rose-400 transition text-lg">
                          {fav.name}
                        </h3>
                        {fav.city && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                            <MapPin size={13} className="text-cyan-400 shrink-0" />
                            <span>{fav.city}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* REMOVE FAVORITE BUTTON */}
                    <button
                      type="button"
                      onClick={() => handleRemoveFavorite(favKey)}
                      title="Retirer des favoris"
                      className="p-2 rounded-xl bg-slate-800/50 hover:bg-rose-500/10 border border-slate-700/50 hover:border-rose-500/30 text-slate-400 hover:text-rose-500 transition-all duration-200 shrink-0 active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* CONTACT INFO */}
                  <div className="space-y-2 py-3 border-t border-b border-slate-800/80 my-4 text-xs">
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <Phone size={14} className="text-slate-500 shrink-0" />
                      <span>{fav.phone || "Non renseigné"}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-300">
                      <Mail size={14} className="text-slate-500 shrink-0" />
                      <span className="truncate">{fav.email || "Non renseigné"}</span>
                    </div>
                  </div>
                </div>

                {/* STATUS FOOTER */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <UserCheck size={14} /> Profil Vérifié
                  </span>
                  <span className="text-slate-500">ID #{favKey}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}