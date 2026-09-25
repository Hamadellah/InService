
import React, { useEffect, useState } from "react";
import { useservice } from "../../hooks/useservice";
import { usecategory } from "../../hooks/usecategory";
import { useServiceRequest } from "../../hooks/useservicerequest";
import { useFavorites } from "../../hooks/usefavorites";

import {
  Wrench,
  Phone,
  Briefcase,
  Tag,
  Send,
  AlertCircle,
  RefreshCw,
  X,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
  Heart,
  Search,
  Grid,
  ImageOff,
} from "lucide-react";

export default function ClientDashboard() {

  // Hooks
  const {
    services,
    loading: loadingServices,
    fetchServices,
  } = useservice();

  const {
    categories,
    loading: loadingCategories,
    fetchCategories,
  } = usecategory();

  const {
    makeServiceRequest,
    deleteServiceRequest,
    getclientdemande,
    loading: submitting,
    error: apiError,
  } = useServiceRequest();

  const {
    favorites,
    loading: loadingFav,
    message: favMessage,
    error: favError,
    makeFavorite,
  } = useFavorites();


  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const [formData, setFormData] = useState({
    description: "",
    scheduled_date: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [requestedServices, setRequestedServices] = useState({});


  // Charger les données
  const loadDashboardData = async () => {
    try {
      await fetchServices();
      await fetchCategories();

      const response = await getclientdemande();

      let demandes = response;

      if (!Array.isArray(demandes)) {
        demandes = response?.data || [];
      }

      const requests = {};

      demandes.forEach((demande) => {
        const serviceId =
          demande.service_id || demande.service?.id;

        if (serviceId) {
          requests[serviceId] = demande.id;
        }
      });

      setRequestedServices(requests);

    } catch (error) {
      console.log(error);
    }
  };


  // Charger les données au démarrage
  useEffect(() => {
    loadDashboardData();
  }, []);


  // Services
  let rawServices = services;

  if (!Array.isArray(rawServices)) {
    rawServices =
      services?.data ||
      services?.services ||
      [];
  }


  // Categories
  let rawCategories = categories;

  if (!Array.isArray(rawCategories)) {
    rawCategories =
      categories?.data ||
      categories?.categories ||
      [];
  }


  // Recherche + filtre catégorie
  const filteredServices = rawServices.filter((service) => {

    const serviceTitle =
      service.description ||
      service.title ||
      service.category_name ||
      "";

    const matchesSearch = serviceTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesCategory = true;

    if (selectedCategory) {
      matchesCategory =
        Number(service.category_id) ===
        Number(selectedCategory);
    }

    return matchesSearch && matchesCategory;
  });


  // Ajouter aux favoris
  const handleToggleFavorite = async (serviceId) => {
    try {
      await makeFavorite(serviceId);
    } catch (error) {
      console.log(error);
    }
  };


  // Ouvrir modal
  const handleOpenModal = (serviceId) => {
    setSelectedServiceId(serviceId);

    setFormData({
      description: "",
      scheduled_date: "",
    });

    setSuccessMessage(null);
    setIsModalOpen(true);
  };


  // Fermer modal
  const handleCloseModal = () => {

    if (submitting) {
      return;
    }

    setIsModalOpen(false);
    setSelectedServiceId(null);
    setSuccessMessage(null);

    setFormData({
      description: "",
      scheduled_date: "",
    });
  };


  // Envoyer demande
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await makeServiceRequest(
        selectedServiceId,
        formData
      );

      setSuccessMessage(
        "Votre demande d'intervention a été envoyée avec succès!"
      );

      await loadDashboardData();

      setTimeout(() => {

        setIsModalOpen(false);
        setSelectedServiceId(null);
        setSuccessMessage(null);

        setFormData({
          description: "",
          scheduled_date: "",
        });

      }, 1200);

    } catch (error) {
      console.log(error);
    }
  };


  // Annuler demande
  const handleCancelRequest = async (serviceId) => {

    const requestId = requestedServices[serviceId];

    if (!requestId) {
      console.log("ID de demande introuvable");
      return;
    }

    const confirmation = window.confirm(
      "Voulez-vous vraiment annuler cette demande ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      await deleteServiceRequest(requestId);

      setRequestedServices((oldRequests) => {

        const newRequests = {
          ...oldRequests
        };

        delete newRequests[serviceId];

        return newRequests;
      });

    } catch (error) {
      console.log(error);
    }
  };


  // Image URL
  const getImageUrl = (image) => {

    if (!image) {
      return null;
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `http://127.0.0.1:8000/storage/${image}`;
  };


  return (
    <div className="min-h-full bg-[#f5f7f6] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">

        {/* =========================
            HERO
        ========================== */}

        <section className="relative overflow-hidden rounded-[34px] bg-[#0d1f1a] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="pointer-events-none absolute bottom-0 right-[28%] h-36 w-36 rounded-full bg-emerald-300/5 blur-2xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-2xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">

                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">
                  Espace Client
                </span>

              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                Trouvez le bon service,
                <span className="block text-emerald-400">
                  simplement.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Parcourez les prestations disponibles,
                choisissez votre technicien et envoyez votre
                demande d'intervention.
              </p>

            </div>

            <button
              onClick={loadDashboardData}
              disabled={
                loadingServices ||
                loadingCategories
              }
              className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-2xl border border-white/10 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/15 disabled:opacity-50 lg:self-auto"
            >

              <RefreshCw
                size={17}
                className={
                  loadingServices ||
                  loadingCategories
                    ? "animate-spin text-emerald-400"
                    : "text-emerald-400"
                }
              />

              Actualiser

            </button>

          </div>
        </section>

        {/* =========================
            STATS
        ========================== */}

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Services disponibles
                </p>

                <p className="mt-2 text-3xl font-black text-[#0d1f1a]">
                  {rawServices.length}
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Wrench size={21} />
              </div>

            </div>
          </div>

          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Résultats affichés
                </p>

                <p className="mt-2 text-3xl font-black text-[#0d1f1a]">
                  {filteredServices.length}
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Search size={21} />
              </div>

            </div>
          </div>

          <div className="relative overflow-hidden rounded-[26px] bg-emerald-400 p-5 text-[#0d1f1a] shadow-[0_14px_35px_rgba(16,185,129,0.18)]">

            <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-white/15" />

            <div className="relative flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-950/60">
                  Mes demandes
                </p>

                <p className="mt-2 text-3xl font-black">
                  {Object.keys(requestedServices).length}
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300">
                <Send size={20} />
              </div>

            </div>
          </div>

        </section>

        {/* =========================
            FAVORITE MESSAGES
        ========================== */}

        {favMessage && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={18} />
            {favMessage}
          </div>
        )}

        {favError && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">

            <AlertCircle size={18} />

            {typeof favError === "string"
              ? favError
              : favError?.message ||
                "Erreur lors de la mise à jour des favoris"}

          </div>
        )}

        {/* =========================
            CATALOGUE
        ========================== */}

        <section>

          {/* TITLE + SEARCH */}

          <div className="mb-5 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <Wrench
                  size={15}
                  className="text-emerald-600"
                />

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                  Catalogue
                </span>

              </div>

              <h2 className="text-2xl font-black tracking-tight text-[#0d1f1a]">
                Services disponibles
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choisissez la prestation qui correspond à
                votre besoin.
              </p>

            </div>

            <div className="relative w-full xl:w-[390px]">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Rechercher un service..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
              />

            </div>

          </div>

          {/* =========================
              CATEGORIES
          ========================== */}

          <div className="mb-7 flex flex-wrap items-center gap-2.5">

            <button
              onClick={() =>
                setSelectedCategory(null)
              }
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                selectedCategory === null
                  ? "border-[#0d1f1a] bg-[#0d1f1a] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              <Grid size={14} />
              Toutes
            </button>

            {rawCategories.map((cat) => {
              const isSelected =
                Number(selectedCategory) ===
                Number(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(cat.id)
                  }
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-400 text-[#0d1f1a]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                  }`}
                >

                  <Tag size={13} />

                  {cat.name ||
                    cat.title ||
                    `Catégorie #${cat.id}`}

                </button>
              );
            })}

          </div>

          {/* =========================
              LOADING
          ========================== */}

          {loadingServices && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

              {[1, 2, 3, 4, 5, 6].map(
                (n) => (
                  <div
                    key={n}
                    className="overflow-hidden rounded-[30px] border border-slate-200 bg-white"
                  >

                    <div className="h-[220px] animate-pulse bg-slate-200" />

                    <div className="p-5">

                      <div className="-mt-10 h-20 animate-pulse rounded-[22px] bg-white shadow-md" />

                      <div className="mt-6 space-y-3">

                        <div className="h-4 animate-pulse rounded bg-slate-100" />

                        <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />

                        <div className="h-14 animate-pulse rounded-2xl bg-slate-100" />

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

          {/* =========================
              EMPTY
          ========================== */}

          {!loadingServices &&
            filteredServices.length === 0 && (
              <div className="rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <AlertCircle size={24} />
                </div>

                <h3 className="mt-4 text-base font-black text-slate-900">
                  Aucun service trouvé
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Modifiez votre recherche ou sélectionnez
                  une autre catégorie.
                </p>

              </div>
            )}

          {/* =========================
              SERVICES
          ========================== */}

          {!loadingServices &&
            filteredServices.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {filteredServices.map(
                  (service) => {
                    const isRequested = Boolean(
                      requestedServices[
                        service.id
                      ]
                    );

                    const isFav =
                      Array.isArray(favorites) &&
                      favorites.some(
                        (fav) =>
                          fav.id ===
                            service.id ||
                          fav.service_id ===
                            service.id ||
                          fav === service.id
                      );

                    const categoryImage =
                      getImageUrl(
                        service.category_image
                      );

                    const technicianImage =
                      service.image &&
                      service.image !==
                        "profile.jpg"
                        ? getImageUrl(
                            service.image
                          )
                        : null;

                    return (
                      <article
                        key={service.id}
                        className="group overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_24px_55px_rgba(15,23,42,0.12)]"
                      >

                        {/* =====================
                            CATEGORY IMAGE
                        ====================== */}

                        <div className="relative h-[220px] overflow-hidden bg-[#0d1f1a]">

                          {categoryImage ? (
                            <img
                              src={categoryImage}
                              alt={
                                service.category_name ||
                                service.title ||
                                "Catégorie"
                              }
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0d1f1a] to-[#163c30]">

                              <ImageOff
                                size={35}
                                className="text-emerald-400"
                              />

                              <span className="mt-2 text-xs font-bold text-slate-400">
                                Image indisponible
                              </span>

                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-[#07110e]/95 via-[#07110e]/25 to-transparent" />

                          {/* CATEGORY */}

                          <div className="absolute left-5 top-5">

                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0d1f1a]/75 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white backdrop-blur-md">

                              <Tag
                                size={12}
                                className="text-emerald-400"
                              />

                              {service.category_name ||
                                "Catégorie"}

                            </span>

                          </div>

                          {/* FAVORITE */}

                          <button
                            type="button"
                            disabled={loadingFav}
                            onClick={() =>
                              handleToggleFavorite(
                                service.id
                              )
                            }
                            className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-md transition active:scale-90 ${
                              isFav
                                ? "border-rose-300/40 bg-rose-500 text-white"
                                : "border-white/20 bg-[#0d1f1a]/70 text-white hover:bg-rose-500"
                            }`}
                          >

                            <Heart
                              size={18}
                              className={
                                isFav
                                  ? "fill-white text-white"
                                  : ""
                              }
                            />

                          </button>

                          {/* TITLE */}

                          <div className="absolute bottom-5 left-5 right-5">

                            <p className="mb-2 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                              Service disponible
                            </p>

                            <h3 className="line-clamp-1 text-xl font-black text-white">
                              {service.title ||
                                service.category_name ||
                                "Service"}
                            </h3>

                          </div>

                        </div>

                        {/* =====================
                            CONTENT
                        ====================== */}

                        <div className="relative p-5 pt-0">

                          {/* TECHNICIAN */}

                          <div className="relative -mt-5 flex items-center justify-between gap-3 rounded-[22px] border border-slate-100 bg-white p-3.5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">

                            <div className="flex min-w-0 items-center gap-3">

                              {/* TECH IMAGE */}

                              <div className="relative shrink-0">

                                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border-[3px] border-white bg-[#0d1f1a] text-lg font-black text-emerald-300 shadow-md">

                                  {technicianImage ? (
                                    <img
                                      src={
                                        technicianImage
                                      }
                                      alt={
                                        service.name ||
                                        "Technicien"
                                      }
                                      className="h-full w-full object-cover"
                                      onError={(
                                        e
                                      ) => {
                                        e.currentTarget.style.display =
                                          "none";
                                      }}
                                    />
                                  ) : (
                                    <span>
                                      {service.name?.[0]?.toUpperCase() ||
                                        "T"}
                                    </span>
                                  )}

                                </div>

                                <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-white bg-emerald-400" />

                              </div>

                              {/* TECH INFO */}

                              <div className="min-w-0">

                                <p className="text-[9px] font-black uppercase tracking-[0.13em] text-slate-400">
                                  Technicien
                                </p>

                                <h4 className="mt-0.5 truncate text-sm font-black text-[#0d1f1a]">
                                  {service.name ||
                                    "Technicien"}
                                </h4>

                                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">

                                  <Briefcase
                                    size={11}
                                    className="shrink-0 text-emerald-600"
                                  />

                                  <span className="truncate">
                                    {service.experience
                                      ? `${service.experience} d'expérience`
                                      : "Expérience non renseignée"}
                                  </span>

                                </div>

                              </div>

                            </div>

                            <div className="hidden shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[9px] font-black text-emerald-700 sm:flex">

                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                              Disponible

                            </div>

                          </div>

                          {/* DESCRIPTION */}

                          <div className="mt-5">

                            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                              Description
                            </p>

                            <p className="mt-2 min-h-[48px] line-clamp-2 text-sm leading-6 text-slate-600">
                              {service.description ||
                                "Aucune description disponible."}
                            </p>

                          </div>

                          {/* PHONE */}

                          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#f5f7f6] px-4 py-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                              <Phone size={15} />
                            </div>

                            <div className="min-w-0">

                              <p className="text-[8px] font-black uppercase tracking-[0.12em] text-slate-400">
                                Téléphone
                              </p>

                              <p className="mt-0.5 truncate text-xs font-bold text-slate-700">
                                {service.phone ||
                                  "Non renseigné"}
                              </p>

                            </div>

                          </div>

                          {/* PRICE + ACTION */}

                          <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">

                            <div>

                              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                                Tarif estimé
                              </p>

                              <div className="mt-1 flex items-baseline gap-1">

                                <span className="text-2xl font-black tracking-tight text-[#0d1f1a]">
                                  {service.price
                                    ? parseFloat(
                                        service.price
                                      ).toLocaleString()
                                    : "0"}
                                </span>

                                <span className="text-xs font-black text-emerald-600">
                                  DH
                                </span>

                              </div>

                            </div>

                            {isRequested ? (
                              <button
                                onClick={() =>
                                  handleCancelRequest(
                                    service.id
                                  )
                                }
                                disabled={
                                  submitting
                                }
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 text-xs font-black text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
                              >
                                <XCircle
                                  size={15}
                                />
                                Annuler
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleOpenModal(
                                    service.id
                                  )
                                }
                                disabled={
                                  submitting
                                }
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#0d1f1a] px-5 text-xs font-black text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#143128] disabled:opacity-50"
                              >
                                <Send
                                  size={15}
                                  className="text-emerald-400"
                                />
                                Demander
                              </button>
                            )}

                          </div>

                        </div>

                      </article>
                    );
                  }
                )}

              </div>
            )}

        </section>

        {/* =========================
            REQUEST MODAL
        ========================== */}

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07110e]/70 p-4 backdrop-blur-sm">

            <div className="w-full max-w-lg overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)]">

              {/* MODAL HEADER */}

              <div className="relative overflow-hidden bg-[#0d1f1a] px-6 py-6">

                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-400/10" />

                <div className="relative flex items-start justify-between gap-4">

                  <div>

                    <div className="mb-2 flex items-center gap-2 text-emerald-400">

                      <Send size={15} />

                      <span className="text-[9px] font-black uppercase tracking-[0.18em]">
                        Nouvelle demande
                      </span>

                    </div>

                    <h3 className="text-xl font-black text-white">
                      Demander une intervention
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Décrivez votre besoin et choisissez
                      la date souhaitée.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={submitting}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/15 hover:text-white disabled:opacity-50"
                  >
                    <X size={17} />
                  </button>

                </div>

              </div>

              {/* MODAL FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6"
              >

                {apiError && (
                  <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">

                    <AlertCircle size={16} />

                    {typeof apiError ===
                    "string"
                      ? apiError
                      : apiError?.message ||
                        "Une erreur est survenue"}

                  </div>
                )}

                {successMessage && (
                  <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">

                    <CheckCircle2
                      size={16}
                    />

                    {successMessage}

                  </div>
                )}

                {/* DESCRIPTION */}

                <div>

                  <label className="mb-2 flex items-center gap-2 text-xs font-black text-slate-700">

                    <FileText
                      size={14}
                      className="text-emerald-600"
                    />

                    Description du besoin

                  </label>

                  <textarea
                    required
                    rows={4}
                    disabled={
                      submitting ||
                      Boolean(successMessage)
                    }
                    value={
                      formData.description
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description:
                          e.target.value,
                      })
                    }
                    placeholder="Expliquez le problème ou l'intervention souhaitée..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-[#f7f9f8] p-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10 disabled:opacity-60"
                  />

                </div>

                {/* DATE */}

                <div>

                  <label className="mb-2 flex items-center gap-2 text-xs font-black text-slate-700">

                    <Calendar
                      size={14}
                      className="text-emerald-600"
                    />

                    Date d'intervention souhaitée

                  </label>

                  <input
                    type="datetime-local"
                    required
                    disabled={
                      submitting ||
                      Boolean(successMessage)
                    }
                    value={
                      formData.scheduled_date
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduled_date:
                          e.target.value,
                      })
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9f8] px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10 disabled:opacity-60"
                  />

                </div>

                {/* BUTTONS */}

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={submitting}
                    className="h-11 rounded-2xl px-5 text-xs font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    disabled={
                      submitting ||
                      Boolean(successMessage)
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 text-xs font-black text-[#0d1f1a] transition hover:bg-emerald-300 disabled:opacity-50"
                  >

                    {submitting && (
                      <RefreshCw
                        size={14}
                        className="animate-spin"
                      />
                    )}

                    {submitting
                      ? "Envoi en cours..."
                      : successMessage
                      ? "Demande envoyée"
                      : "Confirmer la demande"}

                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

