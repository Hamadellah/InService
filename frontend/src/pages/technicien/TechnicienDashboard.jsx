import React, { useEffect, useState } from "react";
import { usecategory } from "../../hooks/usecategory";
import { useservice } from "../../hooks/useservice";

import { 
  Plus, 
  Wrench, 
  Briefcase, 
  Tag, 
  AlertCircle, 
  RotateCw, 
  X,
  Search,
  TrendingUp
} from "lucide-react";

export default function TechnicienDashboard() {
  const { services, loading, fetchServices, addService, messervices } = useservice();
  const { categories, loading: categoriesLoading, fetchCategories } = usecategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    messervices();
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
      messervices();
    } catch (err) {
      setFormError("Erreur lors de l'ajout du service. Vérifiez vos données.");
    } finally {
      setSubmitting(false);
    }
  };

  const categoriesList = Array.isArray(categories)
    ? categories
    : categories?.data || categories?.categories || [];

  const filteredServices = services?.filter(s => 
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* TOP BAR / HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dashboard Technicien</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Gestion des Prestations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={messervices}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/80 transition active:scale-95 disabled:opacity-50"
              title="Rafraîchir"
            >
              <RotateCw size={18} className={loading ? "animate-spin text-blue-600" : ""} />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition active:scale-95 text-sm"
            >
              <Plus size={18} />
              <span>Nouveau Service</span>
            </button>
          </div>
        </div>

        {/* METRICS / STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">Services Actifs</p>
              <p className="text-3xl font-bold text-slate-900">{services ? services.length : 0}</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl">
              <Wrench size={22} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">Demandes Reçues</p>
              <p className="text-3xl font-bold text-emerald-600">12</p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl">
              <TrendingUp size={22} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">Évaluation</p>
              <p className="text-3xl font-bold text-amber-500">4.9 <span className="text-xs font-normal text-slate-400">/ 5</span></p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl">
              <Briefcase size={22} />
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          
          {/* Controls: Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition placeholder:text-slate-400"
              />
            </div>

            <div className="text-xs text-slate-500 font-medium self-end sm:self-center">
              Affichage de <span className="text-slate-900 font-bold">{filteredServices.length}</span> prestation(s)
            </div>
          </div>

          {/* Service Cards / Table */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-44 bg-slate-100 rounded-xl animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <AlertCircle size={36} className="mx-auto text-slate-400" />
              <p className="text-slate-600 text-sm font-medium">Aucun service trouvé</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 transition"
              >
                <Plus size={14} /> Créer une prestation
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
                        {service.title}
                      </h3>
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 font-medium flex items-center gap-1 shrink-0">
                        <Tag size={10} /> #{service.category_id}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-400 font-medium">Tarif fixe</div>
                    <div className="text-base font-bold text-slate-900">
                      {service.price ? parseFloat(service.price).toLocaleString() : '0'} <span className="text-xs font-semibold text-blue-600">DH</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* MODAL AJOUT SERVICE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 space-y-5 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Ajouter un service</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Titre du service</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Installation Électrique"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Catégorie</label>
                <select
                  name="category_id"
                  required
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition cursor-pointer"
                >
                  <option value="" disabled>Sélectionnez une catégorie</option>
                  {categoriesList.map((cat) => {
                    const id = cat.id || cat.id_category;
                    const name = cat.name || cat.nom || cat.title || `Catégorie #${id}`;
                    return <option key={id} value={id}>{name}</option>;
                  })}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Prix (DH)</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Ex: 300"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description du service..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                >
                  {submitting && <RotateCw size={12} className="animate-spin" />}
                  <span>Enregistrer</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}