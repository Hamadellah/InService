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
    <div className="space-y-8 relative font-sans text-slate-800">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tableau de bord Client
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Découvrez les services disponibles et demandez une intervention en un clic.
          </p>
        </div>

        <button
          onClick={loadDashboardData}
          disabled={loadingServices || loadingCategories}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium transition active:scale-95 disabled:opacity-50 shadow-sm"
        >
          <RefreshCw size={16} className={loadingServices || loadingCategories ? "animate-spin text-blue-600" : "text-slate-500"} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* MESSAGES D'INFORMATIONS FAVORIS */}
      {favMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          <span>{favMessage}</span>
        </div>
      )}

      {favError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3 animate-in fade-in duration-200">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span>{typeof favError === "string" ? favError : favError?.message || "Erreur lors de la mise à jour des favoris"}</span>
        </div>
      )}

      {/* SEARCH BAR & CATEGORIES SECTION */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher un service par nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin max-w-full">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition flex items-center gap-1.5 border shadow-sm ${
              selectedCategory === null
                ? "bg-blue-600 text-white border-blue-600 font-bold"
                : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Grid size={14} />
            <span>Toutes les catégories</span>
          </button>

          {categories && categories.map((cat) => {
            const isSelected = Number(selectedCategory) === Number(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition flex items-center gap-1.5 border shadow-sm ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 font-bold"
                    : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Tag size={13} />
                <span>{cat.name || cat.title || `Catégorie #${cat.id}`}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900">Services disponibles</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {filteredServices.length} service(s) trouvé(s)
          </span>
        </div>

        {loadingServices && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div 
                key={n} 
                className="h-64 rounded-2xl bg-white border border-slate-200 animate-pulse p-6 space-y-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-10 bg-slate-200 rounded-lg"></div>
                <div className="h-10 bg-slate-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}

        {!loadingServices && filteredServices.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm">
            <AlertCircle size={40} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-semibold text-slate-800">Aucun service trouvé</h3>
            <p className="text-xs text-slate-500 mt-1">
              {searchTerm || selectedCategory 
                ? "Essayez de modifier vos critères de recherche ou de catégorie."
                : "Revenez plus tard pour découvrir de nouvelles prestations."}
            </p>
          </div>
        )}

        {!loadingServices && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const isRequested = Boolean(requestedServices[service.id]);

              const isFav = Array.isArray(favorites) && favorites.some(
                (fav) => fav.id === service.id || fav.service_id === service.id || fav === service.id
              );

              return (
                <div
                  key={service.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg overflow-hidden shrink-0">
                            {service.image && service.image !== "profile.jpg" ? (
                              <img
                                src={service.image}
                                alt={service.name || service.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <span>{service.name ? service.name[0] : (service.title ? service.title[0] : 'T')}</span>
                            )}
                          </div>
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition">
                            {service.name || "Technicien"}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Briefcase size={12} className="text-slate-400" />
                              {service.experience || "N/A"}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Phone size={12} className="text-slate-400" />
                              {service.phone || "Non renseigné"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={loadingFav}
                        onClick={() => handleToggleFavorite(service.id)}
                        className={`p-2 rounded-xl border transition-all duration-200 active:scale-90 shrink-0 ${
                          isFav
                            ? "bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100"
                            : "bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50"
                        }`}
                      >
                        <Heart 
                          size={18} 
                          className={isFav ? "fill-rose-500 text-rose-500" : ""} 
                        />
                      </button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                          {service.title}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Tag size={12} /> Cat #{service.category_id}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-500 font-medium">Tarif estimé</span>
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-slate-900">
                          {service.price ? parseFloat(service.price).toLocaleString() : '0'}
                        </span>
                        <span className="text-xs font-bold text-blue-600 ml-1">DH</span>
                      </div>
                    </div>

                    {isRequested ? (
                      <button
                        onClick={() => handleCancelRequest(service.id)}
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold py-2.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 text-xs"
                      >
                        <XCircle size={16} />
                        <span>Annuler la demande</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenModal(service.id)}
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-50 text-xs"
                      >
                        <Send size={16} />
                        <span>Demander le service</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL FORM DEMANDE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-xl relative space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Send size={18} className="text-blue-600" />
                Demander une intervention
              </h3>
              <button
                onClick={handleCloseModal}
                disabled={submitting}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {apiError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-red-600" />
                <span>{apiError}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FileText size={14} className="text-blue-600" />
                  Description du besoin
                </label>
                <textarea
                  required
                  rows={4}
                  disabled={submitting || successMessage}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Expliquez en détails le problème ou l'intervention souhaitée..."
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl p-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition resize-none disabled:opacity-50 shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Calendar size={14} className="text-blue-600" />
                  Date d'intervention souhaitée
                </label>
                <input
                  type="datetime-local"
                  required
                  disabled={submitting || successMessage}
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl p-3 text-sm text-slate-800 outline-none transition disabled:opacity-50 shadow-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting || successMessage}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting && <RefreshCw size={14} className="animate-spin" />}
                  <span>{submitting ? "Envoi en cours..." : "Confirmer la demande"}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}