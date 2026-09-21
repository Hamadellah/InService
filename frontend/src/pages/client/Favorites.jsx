import React, { useEffect, useState } from "react";
import { useFavorites } from "../../hooks/usefavorites";
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Trash2, 
  RotateCw, 
  UserCheck,
  Loader2,
  User
} from "lucide-react";

export default function Favorites() {
  const { favorites, loading, getFavorites, makeFavorite } = useFavorites();
  const [removingId, setRemovingId] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    getFavorites();
  }, []);

  const handleRemoveFavorite = async (serviceId) => {
    if (!makeFavorite) return;
    
    setRemovingId(serviceId);
    try {
      await makeFavorite(serviceId);
      await getFavorites();
    } catch (error) {
      console.error("Erreur lors de la suppression du favori:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const favoritesList = Array.isArray(favorites) ? favorites : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP BAR / HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Vos préférences</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2.5">
              <Heart className="text-rose-500 fill-rose-500 shrink-0" size={28} />
              Mes Techniciens Favoris
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Retrouvez rapidement les techniciens que vous avez ajoutés à vos favoris.
            </p>
          </div>

          <button
            onClick={getFavorites}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/80 transition active:scale-95 disabled:opacity-50 self-start md:self-center flex items-center gap-2 text-xs font-semibold"
            title="Rafraîchir"
          >
            <RotateCw size={18} className={loading ? "animate-spin text-rose-500" : ""} />
            <span>Actualiser</span>
          </button>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-56 rounded-2xl bg-white border border-slate-200 animate-pulse p-6 space-y-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 shrink-0"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-16 bg-slate-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && favoritesList.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-md mx-auto space-y-3">
            <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-500">
              <Heart size={28} />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Aucun favori pour le moment</h3>
            <p className="text-xs text-slate-500">
              Parcourez la liste des services et ajoutez des techniciens à vos favoris pour les retrouver ici.
            </p>
          </div>
        )}

        {/* FAVORITES GRID */}
        {!loading && favoritesList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {favoritesList.map((fav) => {
              const favKey = fav.favorite_id || fav.id;
              const hasImageError = imageErrors[favKey];

              return (
                <div
                  key={favKey}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between space-y-4 group"
                >
                  <div>
                    {/* TOP PROFILE HEADER */}
                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <div className="w-14 h-14 rounded-xl border border-slate-100 bg-blue-50 text-blue-600 flex items-center justify-center overflow-hidden font-bold">
                            {fav.image && !hasImageError ? (
                              <img
                                src={fav.image}
                                alt={fav.name || "Technicien"}
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(favKey)}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-blue-600">
                                {fav.name ? (
                                  <span className="text-lg font-bold uppercase">{fav.name[0]}</span>
                                ) : (
                                  <User size={20} />
                                )}
                              </div>
                            )}
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Disponible"></span>
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900 group-hover:text-rose-600 transition text-sm truncate">
                            {fav.name || "Technicien"}
                          </h3>
                          {fav.city && (
                            <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                              <MapPin size={12} className="text-slate-400 shrink-0" />
                              <span className="truncate">{fav.city}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* REMOVE FAVORITE BUTTON */}
                      <button
                        type="button"
                        disabled={removingId === favKey}
                        onClick={() => handleRemoveFavorite(favKey)}
                        title="Retirer des favoris"
                        className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 transition active:scale-95 disabled:opacity-50 shrink-0"
                      >
                        {removingId === favKey ? (
                          <Loader2 size={16} className="animate-spin text-rose-600" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>

                    {/* CONTACT INFO CARD */}
                    <div className="space-y-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100 my-4 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={14} className="text-blue-600 shrink-0" />
                        <span>{fav.phone || "Non renseigné"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={14} className="text-blue-600 shrink-0" />
                        <span className="truncate">{fav.email || "Non renseigné"}</span>
                      </div>
                    </div>
                  </div>

                  {/* STATUS FOOTER */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                      <UserCheck size={13} /> Profil Vérifié
                    </span>
                    <span className="text-slate-400">ID #{favKey}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}