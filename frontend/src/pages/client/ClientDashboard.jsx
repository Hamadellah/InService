import React, { useState, useEffect } from "react";
import { useservice } from "../../hooks/useservice";
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
  FileText
} from "lucide-react";

export default function ClientDashboard() {
  const { services, loading, fetchServices } = useservice();

  // States dyal Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    scheduled_date: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  // Fath L-Modal ملي يكليكي الكليان
  const handleOpenModal = (serviceId) => {
    setSelectedServiceId(serviceId);
    setFormData({ description: "", scheduled_date: "" });
    setIsModalOpen(true);
  };

  // Fermer L-Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedServiceId(null);
  };

  // Submit Dyal Form Demand
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const requestPayload = {
      service_id: selectedServiceId,
      description: formData.description,
      scheduled_date: formData.scheduled_date,
    };

    try {
      console.log("Données envoyées:", requestPayload);
      // Hna dir l-call dyal API dyalek (ex: await createDemande(requestPayload))
      
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande:", error);
    } finally {
      setSubmitting(false);
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
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-sm font-medium transition active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin text-cyan-400" : ""} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* ==================== SERVICES SECTION ==================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="text-cyan-400" size={20} />
          <h2 className="text-lg font-semibold text-slate-200">Services disponibles</h2>
        </div>

        {/* LOADING STATE */}
        {loading && (
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
        {!loading && services && services.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
            <AlertCircle size={40} className="mx-auto text-slate-500 mb-3" />
            <h3 className="text-base font-medium text-slate-300">Aucun service disponible</h3>
            <p className="text-xs text-slate-500 mt-1">Revenez plus tard pour découvrir de nouvelles prestations.</p>
          </div>
        )}

        {/* SERVICES CARDS GRID */}
        {!loading && services && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300"
              >
                <div>
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

                  <button
                    onClick={() => handleOpenModal(service.id)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200 active:scale-[0.98]"
                  >
                    <Send size={16} />
                    <span>Demander le service</span>
                  </button>
                </div>
              </div>
            ))}
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
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
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
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Expliquez en détails le problème ou l'intervention souhaitée..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition resize-none"
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
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-200 outline-none transition [color-scheme:dark]"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting && <RefreshCw size={14} className="animate-spin" />}
                  <span>Confirmer la demande</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}