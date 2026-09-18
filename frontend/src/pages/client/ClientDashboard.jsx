import React, { useState, useEffect } from "react";
import { useservice } from "../../hooks/useservice";
import { useServiceRequest } from "../../hooks/useservicerequest";
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
  XCircle
} from "lucide-react";

export default function ClientDashboard() {
  // Hook dyal Fetching services
  const { services, loading: loadingServices, fetchServices } = useservice();

  // Hook dyal Managing service requests
  const { 
    makeServiceRequest, 
    deleteServiceRequest, 
    loading: submitting, 
    error: apiError 
  } = useServiceRequest();

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    scheduled_date: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);

  // Object key: serviceId -> value: requestId
  // Initialisation mn localStorage bāsh may-ti3sh l-state f Refresh/Reload!
  const [requestedServices, setRequestedServices] = useState(() => {
    try {
      const saved = localStorage.getItem("client_requested_services");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Sauvegarder f LocalStorage kolma tghayrat requestedServices
  useEffect(() => {
    try {
      localStorage.setItem("client_requested_services", JSON.stringify(requestedServices));
    } catch (e) {
      console.error("Erreur de sauvegarde dans localStorage", e);
    }
  }, [requestedServices]);

  useEffect(() => {
    fetchServices();
  }, []);

  // Fath L-Modal
  const handleOpenModal = (serviceId) => {
    setSelectedServiceId(serviceId);
    setFormData({ description: "", scheduled_date: "" });
    setSuccessMessage(null);
    setIsModalOpen(true);
  };

  // Fermer L-Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedServiceId(null);
  };

  // Submit Form (Créer la demande)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await makeServiceRequest(selectedServiceId, formData);
      
      // Extraction dyal requestId mn response dyal l-backend
      const requestId = response?.id || response?.data?.id || response?.request?.id || response?.data?.data?.id;

      // Stokiyi mapping: serviceId -> requestId
      setRequestedServices((prev) => ({
        ...prev,
        [selectedServiceId]: requestId || true, // fallback ila marje3sh id
      }));

      // Feedback Success
      setSuccessMessage("Votre demande d'intervention a été envoyée avec succès!");

      // Shadd l-modal mn ba3d 1.2s
      setTimeout(() => {
        handleCloseModal();
        setSuccessMessage(null);
      }, 1200);

    } catch (err) {
      console.error("Erreur lors de la création de la demande:", err);
    }
  };

  // Annuler la demande (Delete via API b l-ID dyal Request)
  const handleCancelRequest = async (serviceId) => {
    const requestId = requestedServices[serviceId];

    if (!requestId) {
      console.error("ID de demande introuvable pour ce service");
      return;
    }

    if (window.confirm("Voulez-vous vraiment annuler cette demande ?")) {
      try {
        // Sift requestId (aw serviceId) nishane l-API
        await deleteServiceRequest(requestId);

        // Msaḥ mn local state & localStorage
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
    <div className="space-y-8 relative">
      {/* ==================== HEADER SECTION ==================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Tableau de bord Client
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Découvrez les services disponibles et demandez une intervention en un clic.
          </p>
        </div>

        <button
          onClick={fetchServices}
          disabled={loadingServices}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-sm font-medium transition active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loadingServices ? "animate-spin text-cyan-400" : ""} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* ==================== SERVICES SECTION ==================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="text-cyan-400" size={20} />
          <h2 className="text-lg font-semibold text-slate-200">Services disponibles</h2>
        </div>

        {/* LOADING STATE (Skeleton) */}
        {loadingServices && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div 
                key={n} 
                className="h-64 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse p-6 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-800 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-10 bg-slate-800 rounded-lg"></div>
                <div className="h-10 bg-slate-800 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loadingServices && services && services.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
            <AlertCircle size={40} className="mx-auto text-slate-500 mb-3" />
            <h3 className="text-base font-medium text-slate-300">Aucun service disponible</h3>
            <p className="text-xs text-slate-500 mt-1">Revenez plus tard pour découvrir de nouvelles prestations.</p>
          </div>
        )}

        {/* SERVICES CARDS GRID */}
        {!loadingServices && services && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const isRequested = Boolean(requestedServices[service.id]);

              return (
                <div
                  key={service.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300"
                >
                  <div>
                    {/* Technicien Info */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg overflow-hidden">
                          {service.image && service.image !== "profile.jpg" ? (
                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <span>{service.name ? service.name[0] : 'T'}</span>
                          )}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-100 group-hover:text-cyan-400 transition">
                          {service.name || "Technicien"}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Briefcase size={12} className="text-slate-500" />
                            {service.experience || "N/A"}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Phone size={12} className="text-slate-500" />
                            {service.phone || "Non renseigné"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Service Title & Description */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                          {service.title}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Tag size={12} /> Cat #{service.category_id}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Dynamic Action Button */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">Tarif estimé</span>
                      <div className="text-right">
                        <span className="text-xl font-bold text-white">
                          {service.price ? parseFloat(service.price).toLocaleString() : '0'}
                        </span>
                        <span className="text-xs font-medium text-cyan-400 ml-1">DH</span>
                      </div>
                    </div>

                    {/* Dynamic Button: Demander OU Annuler */}
                    {isRequested ? (
                      <button
                        onClick={() => handleCancelRequest(service.id)}
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold py-2.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
                      >
                        <XCircle size={16} />
                        <span>Annuler la demande</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenModal(service.id)}
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
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

      {/* ==================== MODAL FORM DEMANDE ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Send size={18} className="text-cyan-400" />
                Demander une intervention
              </h3>
              <button
                onClick={handleCloseModal}
                disabled={submitting}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* API Error Alert */}
            {apiError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            {/* Success Message Alert */}
            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Description Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <FileText size={14} className="text-cyan-400" />
                  Description du besoin
                </label>
                <textarea
                  required
                  rows={4}
                  disabled={submitting || successMessage}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Expliquez en détails le problème ou l'intervention souhaitée..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition resize-none disabled:opacity-50"
                />
              </div>

              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Calendar size={14} className="text-cyan-400" />
                  Date d'intervention souhaitée
                </label>
                <input
                  type="datetime-local"
                  required
                  disabled={submitting || successMessage}
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-200 outline-none transition [color-scheme:dark] disabled:opacity-50"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting || successMessage}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50 flex items-center gap-2"
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