import React, { useState, useEffect } from "react";
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
  Grid
} from "lucide-react";

export default function ClientDashboard() {
  const { services, loading: loadingServices, fetchServices } = useservice();
  const { categories, loading: loadingCategories, fetchCategories } = usecategory();
  useEffect(() => {
    console.log("categories:", categories);
  }, [categories]);

  const { 
    makeServiceRequest, 
    deleteServiceRequest, 
    getclientdemande, 
    loading: submitting, 
    error: apiError 
  } = useServiceRequest();

  const { 
    favorites, 
    loading: loadingFav, 
    message: favMessage, 
    error: favError, 
    makeFavorite 
  } = useFavorites();

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

  const loadDashboardData = async () => {
    try {
      await Promise.all([
        fetchServices(),
        fetchCategories()
      ]);
      
      if (getclientdemande) {
        const res = await getclientdemande();
        const userRequests = Array.isArray(res) ? res : res?.data || [];
        
        const requestsMap = {};
        userRequests.forEach((req) => {
          const serviceId = req.service_id || req.service?.id;
          if (serviceId) {
            requestsMap[serviceId] = req.id;
          }
        });
        setRequestedServices(requestsMap);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des données:", err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const rawServices = Array.isArray(services) ? services : services?.data || [];
  
  const filteredServices = rawServices.filter((service) => {
    const serviceTitle = service.description || service.title || "";
    const matchesSearch = serviceTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory 
      ? Number(service.category_id) === Number(selectedCategory)
      : true;

    return matchesSearch && matchesCategory;
  });

  const handleToggleFavorite = async (serviceId) => {
    await makeFavorite(serviceId);
  };

  const handleOpenModal = (serviceId) => {
    setSelectedServiceId(serviceId);
    setFormData({ description: "", scheduled_date: "" });
    setSuccessMessage(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedServiceId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await makeServiceRequest(selectedServiceId, formData);
      setSuccessMessage("Votre demande d'intervention a été envoyée avec succès!");

      await loadDashboardData();

      setTimeout(() => {
        handleCloseModal();
        setSuccessMessage(null);
      }, 1200);

    } catch (err) {
      console.error("Erreur lors de la création de la demande:", err);
    }
  };

  const handleCancelRequest = async (serviceId) => {
    const requestId = requestedServices[serviceId];

    if (!requestId) {
      console.error("ID de demande introuvable pour ce service");
      return;
    }

    if (window.confirm("Voulez-vous vraiment annuler cette demande ?")) {
      try {
        await deleteServiceRequest(requestId);

        setRequestedServices((prev) => {
          const updated = { ...prev };
          delete updated[serviceId];
          return updated;
        });
      } catch (err) {
        console.error("Erreur lors de l'annulation:", err);
      }
    }
  };

  return (
    <div className="min-h-full bg-[#f5f7f6] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">

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
                <span className="block text-emerald-400">simplement.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Parcourez les prestations disponibles, choisissez votre technicien
                et envoyez votre demande d'intervention.
              </p>
            </div>

            <button
              onClick={loadDashboardData}
              disabled={loadingServices || loadingCategories}
              className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-2xl border border-white/10 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/15 disabled:opacity-50 lg:self-auto"
            >
              <RefreshCw
                size={17}
                className={loadingServices || loadingCategories ? "animate-spin text-emerald-400" : "text-emerald-400"}
              />
              Actualiser
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Services disponibles
                </p>
                <p className="mt-2 text-3xl font-black text-[#0d1f1a]">{rawServices.length}</p>
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
                <p className="mt-2 text-3xl font-black text-[#0d1f1a]">{filteredServices.length}</p>
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
                <p className="mt-2 text-3xl font-black">{Object.keys(requestedServices).length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300">
                <Send size={20} />
              </div>
            </div>
          </div>
        </section>

        {favMessage && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={18} />
            {favMessage}
          </div>
        )}

        {favError && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            <AlertCircle size={18} />
            {typeof favError === "string" ? favError : favError?.message || "Erreur lors de la mise à jour des favoris"}
          </div>
        )}

        <section>
          <div className="mb-5 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Wrench size={15} className="text-emerald-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                  Catalogue
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-[#0d1f1a]">
                Services disponibles
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choisissez la prestation qui correspond à votre besoin.
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
              />
            </div>
          </div>

          <div className="mb-7 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                selectedCategory === null
                  ? "border-[#0d1f1a] bg-[#0d1f1a] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
              }`}
            >
              <Grid size={14} />
              Toutes
            </button>

            {categories && categories.map((cat) => {
              const isSelected = Number(selectedCategory) === Number(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-400 text-[#0d1f1a]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                  }`}
                >
                  <Tag size={13} />
                  {cat.name || cat.title || `Catégorie #${cat.id}`}
                </button>
              );
            })}
          </div>

          {loadingServices && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-[330px] animate-pulse rounded-[28px] border border-slate-200 bg-white p-6"
                >
                  <div className="mb-6 flex gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-4 w-1/2 rounded bg-slate-100" />
                      <div className="h-3 w-1/3 rounded bg-slate-100" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 rounded bg-slate-100" />
                    <div className="h-4 w-4/5 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingServices && filteredServices.length === 0 && (
            <div className="rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <AlertCircle size={24} />
              </div>
              <h3 className="mt-4 text-base font-black text-slate-900">Aucun service trouvé</h3>
              <p className="mt-1 text-sm text-slate-500">
                Modifiez votre recherche ou sélectionnez une autre catégorie.
              </p>
            </div>
          )}

          {!loadingServices && filteredServices.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredServices.map((service, index) => {
                const isRequested = Boolean(requestedServices[service.id]);
                const isFav = Array.isArray(favorites) && favorites.some(
                  (fav) => fav.id === service.id || fav.service_id === service.id || fav === service.id
                );

                return (
                  <article
                    key={service.id}
                    className="group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)]"
                  >
                    <span className="pointer-events-none absolute -right-2 top-14 text-[88px] font-black leading-none text-slate-50">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="relative shrink-0">
                            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-[#0d1f1a] text-lg font-black text-emerald-300">
                              {service.image && service.image !== "profile.jpg" ? (
                                <img
                                  src={service.image}
                                  alt={service.name || service.title}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              ) : (
                                <span>{service.name?.[0] || service.title?.[0] || "T"}</span>
                              )}
                            </div>
                            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-white bg-emerald-400" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-base font-black text-[#0d1f1a]">
                              {service.name || "Technicien"}
                            </h3>
                            <div className="mt-1 flex items-center gap-2 text-[11px] font-medium text-slate-500">
                              <span className="flex items-center gap-1">
                                <Briefcase size={12} />
                                {service.experience || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={loadingFav}
                          onClick={() => handleToggleFavorite(service.id)}
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition active:scale-90 ${
                            isFav
                              ? "border-rose-200 bg-rose-50 text-rose-500"
                              : "border-slate-200 bg-white text-slate-400 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
                          }`}
                        >
                          <Heart
                            size={17}
                            className={isFav ? "fill-rose-500 text-rose-500" : ""}
                          />
                        </button>
                      </div>

                      <div className="mt-6">
                        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
                          {service.title}
                        </span>

                        <p className="mt-3 min-h-[44px] line-clamp-2 text-sm leading-6 text-slate-600">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center gap-2 rounded-2xl bg-[#f7f9f8] px-3.5 py-3 text-xs text-slate-500">
                        <Phone size={14} className="text-emerald-600" />
                        <span className="font-semibold text-slate-700">
                          {service.phone || "Téléphone non renseigné"}
                        </span>
                      </div>

                      <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-5">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                            Tarif estimé
                          </p>
                          <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-2xl font-black text-[#0d1f1a]">
                              {service.price ? parseFloat(service.price).toLocaleString() : "0"}
                            </span>
                            <span className="text-xs font-black text-emerald-600">DH</span>
                          </div>
                        </div>

                        {isRequested ? (
                          <button
                            onClick={() => handleCancelRequest(service.id)}
                            disabled={submitting}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 text-xs font-black text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
                          >
                            <XCircle size={15} />
                            Annuler
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenModal(service.id)}
                            disabled={submitting}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#0d1f1a] px-4 text-xs font-black text-white transition hover:bg-[#143128] disabled:opacity-50"
                          >
                            <Send size={15} className="text-emerald-400" />
                            Demander
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07110e]/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
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
                      Décrivez votre besoin et choisissez la date souhaitée.
                    </p>
                  </div>

                  <button
                    onClick={handleCloseModal}
                    disabled={submitting}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/15 hover:text-white"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 p-6">
                {apiError && (
                  <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                    <AlertCircle size={16} />
                    {apiError}
                  </div>
                )}

                {successMessage && (
                  <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={16} />
                    {successMessage}
                  </div>
                )}

                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-black text-slate-700">
                    <FileText size={14} className="text-emerald-600" />
                    Description du besoin
                  </label>
                  <textarea
                    required
                    rows={4}
                    disabled={submitting || successMessage}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Expliquez le problème ou l'intervention souhaitée..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-[#f7f9f8] p-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-black text-slate-700">
                    <Calendar size={14} className="text-emerald-600" />
                    Date d'intervention souhaitée
                  </label>
                  <input
                    type="datetime-local"
                    required
                    disabled={submitting || successMessage}
                    value={formData.scheduled_date}
                    onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9f8] px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={submitting}
                    className="h-11 rounded-2xl px-5 text-xs font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    disabled={submitting || successMessage}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 text-xs font-black text-[#0d1f1a] transition hover:bg-emerald-300 disabled:opacity-50"
                  >
                    {submitting && <RefreshCw size={14} className="animate-spin" />}
                    {submitting ? "Envoi en cours..." : "Confirmer la demande"}
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
