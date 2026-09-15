import React, { useEffect, useState } from "react";
import { usecategory } from "../../hooks/usecategory";
import { useservice } from "../../hooks/useservice";

import { 
  PlusCircle, 
  Wrench, 
  Briefcase, 
  Tag, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  X, 
  Loader2 
} from "lucide-react";

export default function TechnicienDashboard() {
  const { services, loading, fetchServices, addService } = useservice();
  const { categories, loading: categoriesLoading, fetchCategories } = usecategory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");

    try {
      await addService(formData);
      setFormData({ title: "", description: "", price: "", category_id: "" });
      setIsModalOpen(false);
    } catch (err) {
      setFormError("Erreur lors de l'ajout du service. Vérifiez vos données.");
    } finally {
      setSubmitting(false);
    }
  };

  // Safely extract categories list regardless of API wrapper structure (e.g. res.data or res.data.data)
  const categoriesList = Array.isArray(categories)
    ? categories
    : categories?.data || categories?.categories || [];

  return (
    <div className="space-y-8">
      {/* ==================== HEADER SECTION ==================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Espace Technicien
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gérez vos prestations, vos tarifs et ajoutez de nouveaux services en ligne.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition active:scale-95 disabled:opacity-50"
            title="Actualiser"
          >
            <RefreshCw size={18} className={loading ? "animate-spin text-cyan-400" : ""} />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <PlusCircle size={18} />
            <span>Ajouter un service</span>
          </button>
        </div>
      </div>

      {/* ==================== STATS CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Services Publiés</p>
            <p className="text-3xl font-extrabold text-white mt-1">{services ? services.length : 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Wrench size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Demandes Reçues</p>
            <p className="text-3xl font-extrabold text-emerald-400 mt-1">12</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Note Globale</p>
            <p className="text-3xl font-extrabold text-amber-400 mt-1">4.9 / 5</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Briefcase size={22} />
          </div>
        </div>
      </div>

      {/* ==================== MES SERVICES SECTION ==================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <Wrench className="text-cyan-400" size={20} />
            Mes prestations actives
          </h2>
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse p-6 space-y-4">
                <div className="h-6 bg-slate-800 rounded w-2/3"></div>
                <div className="h-12 bg-slate-800 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && services && services.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
            <AlertCircle size={40} className="mx-auto text-slate-500 mb-3" />
            <h3 className="text-base font-medium text-slate-300">Vous n'avez publié aucun service</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Commencez par ajouter votre première prestation.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-xl hover:bg-cyan-500/20 transition"
            >
              <PlusCircle size={14} /> Ajouter maintenant
            </button>
          </div>
        )}

        {/* SERVICES LIST */}
        {!loading && services && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                      {service.title}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Tag size={12} /> Cat #{service.category_id}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Tarif fixé</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-white">
                      {service.price ? parseFloat(service.price).toLocaleString() : '0'}
                    </span>
                    <span className="text-xs font-medium text-cyan-400 ml-1">DH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================== MODAL : AJOUTER UN SERVICE ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PlusCircle className="text-cyan-400" size={20} />
                Ajouter un service
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {formError}
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Titre du service</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Électricité Générale"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              {/* SELECT CATEGORY */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Catégorie</label>
                <select
                  name="category_id"
                  required
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition cursor-pointer"
                >
                  <option value="" disabled>-- Sélectionner une catégorie --</option>
                  {categoriesLoading ? (
                    <option disabled>Chargement des catégories...</option>
                  ) : categoriesList.length === 0 ? (
                    <option disabled>Aucune catégorie trouvée</option>
                  ) : (
                    categoriesList.map((cat) => {
                      const id = cat.id || cat.id_category;
                      const name = cat.name || cat.nom || cat.title || `Catégorie #${id}`;
                      return (
                        <option key={id} value={id} className="bg-slate-900 text-white">
                          {name}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Prix estimé (DH)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Ex: 250.00"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Description de la prestation</label>
                <textarea
                  name="description"
                  rows="3"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Expliquez ce que vous proposez dans ce service..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition resize-none"
                ></textarea>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-sm font-medium transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-cyan-500/20 transition disabled:opacity-50"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <PlusCircle size={16} />}
                  <span>{submitting ? "Envoi..." : "Publier"}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}