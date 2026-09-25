
import React, { useEffect, useState } from "react";
import { useFavorites } from "../../hooks/usefavorites";

import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Trash2,
  RotateCw,
  Loader2,
  User,
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  UserCheck,
} from "lucide-react";

export default function Favorites() {

  // Hook favorites
  const {
    favorites,
    loading,
    error,
    message,
    getFavorites,
    deleteFavorite,
  } = useFavorites();


  // States
  const [removingId, setRemovingId] = useState(null);
  const [imageErrors, setImageErrors] = useState({});


  // Charger les favoris au démarrage
  useEffect(() => {
    getFavorites();
  }, []);


  // Transformer favorites en tableau
  let favoritesList = [];

  if (Array.isArray(favorites)) {
    favoritesList = favorites;
  } else if (favorites?.data) {
    favoritesList = favorites.data;
  } else if (favorites?.favorites) {
    favoritesList = favorites.favorites;
  }


  // Si l'image ne fonctionne pas
  const handleImageError = (id) => {

    setImageErrors((oldErrors) => {
      return {
        ...oldErrors,
        [id]: true,
      };
    });
  };


  // Récupérer un ID unique pour chaque favori
  const getFavoriteKey = (favorite, index) => {

    if (favorite.favorite_id) {
      return favorite.favorite_id;
    }

    if (favorite.id) {
      return favorite.id;
    }

    if (favorite.technicien_id) {
      return favorite.technicien_id;
    }

    if (favorite.technicien?.id) {
      return favorite.technicien.id;
    }

    return index;
  };


  // Récupérer ID du technicien
  const getTechnicienId = (favorite) => {

    if (favorite.technicien_id != null) {
      return favorite.technicien_id;
    }

    if (favorite.technicien?.id != null) {
      return favorite.technicien.id;
    }

    if (favorite.technician_id != null) {
      return favorite.technician_id;
    }

    if (favorite.technician?.id != null) {
      return favorite.technician.id;
    }

    return null;
  };


  // Supprimer un favori
  const handleRemoveFavorite = async (technicienId) => {

    // Vérifier si ID existe
    if (technicienId === null || technicienId === undefined) {
      console.log("Technicien ID introuvable");
      return;
    }

    // Empêcher plusieurs suppressions en même temps
    if (removingId !== null) {
      return;
    }

    setRemovingId(technicienId);

    try {

      await deleteFavorite(technicienId);

      // Recharger la liste
      await getFavorites();

    } catch (error) {

      console.log(error);

    } finally {

      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-full bg-[#f5f7f6] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[32px] bg-[#0d1f1a] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="pointer-events-none absolute bottom-0 right-[30%] h-40 w-40 rounded-full bg-emerald-300/5 blur-2xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-2xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">

                <Sparkles
                  size={13}
                  className="text-emerald-400"
                />

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">
                  Espace Client
                </span>

              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">

                Vos techniciens

                <span className="block text-emerald-400">
                  favoris.
                </span>

              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Retrouvez rapidement les professionnels
                que vous avez enregistrés et gardez
                leurs coordonnées toujours à portée
                de main.
              </p>

            </div>

            <button
              type="button"
              onClick={() => getFavorites()}
              disabled={loading}
              className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-2xl border border-white/10 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/15 disabled:opacity-50 lg:self-auto"
            >

              <RotateCw
                size={17}
                className={
                  loading
                    ? "animate-spin text-emerald-400"
                    : "text-emerald-400"
                }
              />

              Actualiser

            </button>

          </div>

        </section>

        {/* SUCCESS */}
        {message && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">

            <CheckCircle2 size={18} />

            <span>{message}</span>

          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">

            <AlertCircle size={18} />

            <span>
              {typeof error === "string"
                ? error
                : error?.message ||
                  "Une erreur est survenue"}
            </span>

          </div>
        )}

        {/* STATS */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Total favoris
                </p>

                <p className="mt-2 text-3xl font-black text-[#0d1f1a]">
                  {favoritesList.length}
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Heart size={20} />
              </div>

            </div>

          </div>

          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Techniciens
                </p>

                <p className="mt-2 text-3xl font-black text-[#0d1f1a]">
                  {favoritesList.length}
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Users size={20} />
              </div>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[26px] bg-emerald-400 p-5 text-[#0d1f1a] shadow-[0_14px_35px_rgba(16,185,129,0.18)]">

            <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-white/15" />

            <div className="relative flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-950/60">
                  Profils enregistrés
                </p>

                <p className="mt-2 text-3xl font-black">
                  {favoritesList.length}
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300">
                <UserCheck size={20} />
              </div>

            </div>

          </div>

        </section>

        {/* FAVORITES SECTION */}
        <section>

          <div className="mb-5">

            <div className="mb-2 flex items-center gap-2">

              <Heart
                size={14}
                className="fill-emerald-600 text-emerald-600"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                Mes favoris
              </span>

            </div>

            <h2 className="text-2xl font-black tracking-tight text-[#0d1f1a]">
              Techniciens enregistrés
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Retrouvez les coordonnées de vos professionnels favoris.
            </p>

          </div>

          {/* LOADING INITIAL */}
          {loading &&
            favoritesList.length === 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-[330px] animate-pulse rounded-[30px] border border-slate-200 bg-white p-5"
                  >

                    <div className="flex gap-3">

                      <div className="h-14 w-14 rounded-2xl bg-slate-100" />

                      <div className="flex-1 space-y-2 pt-2">

                        <div className="h-4 w-1/2 rounded bg-slate-100" />

                        <div className="h-3 w-1/3 rounded bg-slate-100" />

                      </div>

                    </div>

                    <div className="mt-7 h-24 rounded-2xl bg-slate-100" />

                    <div className="mt-5 h-12 rounded-2xl bg-slate-100" />

                  </div>
                ))}

              </div>
            )}

          {/* EMPTY */}
          {!loading &&
            favoritesList.length === 0 && (
              <div className="rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Heart size={27} />
                </div>

                <h3 className="mt-4 text-lg font-black text-[#0d1f1a]">
                  Aucun technicien favori
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Ajoutez des techniciens à vos favoris
                  depuis la liste des services pour les
                  retrouver rapidement ici.
                </p>

              </div>
            )}

          {/* GRID */}
          {favoritesList.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {favoritesList.map((fav, index) => {

                console.log(
                  "FAVORITE ITEM:",
                  fav
                );

                const favKey =
                  getFavoriteKey(fav, index);

                const technicienId =
                  getTechnicienId(fav);

                const hasImageError =
                  imageErrors[favKey];

                const isRemoving =
                  removingId !== null &&
                  Number(removingId) ===
                    Number(technicienId);

                return (
                  <article
                    key={favKey}
                    className="group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)]"
                  >

                    {/* NUMBER */}
                    <span className="pointer-events-none absolute -right-2 top-14 text-[88px] font-black leading-none text-slate-50">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <div className="relative">

                      {/* HEADER */}
                      <div className="flex items-start justify-between gap-4">

                        <div className="flex min-w-0 items-center gap-3">

                          {/* IMAGE */}
                          <div className="relative shrink-0">

                            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-[#0d1f1a] text-lg font-black text-emerald-300">

                              {fav.image &&
                              !hasImageError ? (
                                <img
                                  src={fav.image}
                                  alt={
                                    fav.name ||
                                    "Technicien"
                                  }
                                  className="h-full w-full object-cover"
                                  onError={() =>
                                    handleImageError(
                                      favKey
                                    )
                                  }
                                />
                              ) : fav.name ? (
                                <span>
                                  {fav.name
                                    .charAt(0)
                                    .toUpperCase()}
                                </span>
                              ) : (
                                <User size={21} />
                              )}

                            </div>

                            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-white bg-emerald-400" />

                          </div>

                          {/* NAME */}
                          <div className="min-w-0">

                            <h3 className="truncate text-base font-black text-[#0d1f1a] transition group-hover:text-emerald-700">
                              {fav.name ||
                                "Technicien"}
                            </h3>

                            {fav.city && (
                              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">

                                <MapPin
                                  size={12}
                                  className="shrink-0"
                                />

                                <span className="truncate">
                                  {fav.city}
                                </span>

                              </p>
                            )}

                          </div>

                        </div>

                        {/* DELETE */}
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveFavorite(
                              technicienId
                            )
                          }
                          disabled={
                            isRemoving ||
                            removingId !== null ||
                            technicienId === null
                          }
                          title="Retirer des favoris"
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            text-slate-400
                            transition
                            hover:border-rose-200
                            hover:bg-rose-50
                            hover:text-rose-500
                            active:scale-90
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >

                          {isRemoving ? (
                            <Loader2
                              size={17}
                              className="animate-spin text-rose-500"
                            />
                          ) : (
                            <Trash2 size={17} />
                          )}

                        </button>

                      </div>

                      {/* VERIFIED */}
                      <div className="mt-5">

                        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700">

                          <CheckCircle2 size={12} />

                          Profil vérifié

                        </div>

                      </div>

                      {/* CONTACT */}
                      <div className="mt-5 space-y-3 rounded-2xl bg-[#f7f9f8] p-4">

                        {/* PHONE */}
                        <div className="flex items-center gap-3">

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600">
                            <Phone size={14} />
                          </div>

                          <div className="min-w-0">

                            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                              Téléphone
                            </p>

                            <p className="truncate text-xs font-bold text-slate-700">
                              {fav.phone ||
                                "Non renseigné"}
                            </p>

                          </div>

                        </div>

                        {/* EMAIL */}
                        <div className="flex items-center gap-3">

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600">
                            <Mail size={14} />
                          </div>

                          <div className="min-w-0">

                            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                              Email
                            </p>

                            <p className="truncate text-xs font-bold text-slate-700">
                              {fav.email ||
                                "Non renseigné"}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* FOOTER */}
                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">

                          <span className="h-2 w-2 rounded-full bg-emerald-400" />

                          Favori

                        </div>

                        {technicienId && (
                          <span className="text-[10px] font-bold text-slate-400">
                            Technicien #{technicienId}
                          </span>
                        )}

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        </section>

      </div>
    </div>
  );
}