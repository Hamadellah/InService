import React, { useEffect, useState } from 'react';
import { useservice } from '../../hooks/useservice';
import { 
  Wrench, 
  Tag, 
  AlertCircle, 
  RotateCw, 
  Plus, 
  Trash2, 
  Pencil,
  X,
  DollarSign,
  FileText,
  FolderTree
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MesService() {
  const { services, loading, error, messervices, updateService, deleteService } = useservice();

  // Modal & Form State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', category_id: '' });
  const [actionLoading, setActionLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    messervices();
  }, []);

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      description: service.description || '',
      price: service.price || '',
      category_id: service.category_id || '',
    });
    setModalError(null);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingService(null);
    setFormData({ title: '', description: '', price: '', category_id: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setModalError(null);

    try {
      await updateService(editingService.id, formData);
      handleCloseModal();
      await messervices();
    } catch (err) {
      setModalError(err.response?.data?.message || "Erreur lors de la modification du service.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce service ?")) {
      try {
        await deleteService(serviceId);
        await messervices();
      } catch (err) {
        alert("Erreur lors de la suppression du service.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Catalogue Personnel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="text-blue-600" size={28} />
              Mes Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Gérez vos prestations, modifiez vos tarifs et consultez vos offres publiées.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={messervices}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/80 transition active:scale-95 disabled:opacity-50"
              title="Actualiser la liste"
            >
              <RotateCw size={18} className={loading ? "animate-spin text-blue-600" : ""} />
            </button>

            <Link
              to="/technicien/TechnicienDashboard"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition active:scale-95 text-sm"
            >
              <Plus size={18} />
              <span>Nouveau Service</span>
            </Link>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-3">
            <AlertCircle size={18} className="shrink-0" />
            <span>Erreur lors de la récupération des services : {error}</span>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-44 bg-slate-100 rounded-xl animate-pulse border border-slate-200 p-5 space-y-3">
                  <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-10 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2 pt-4"></div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && Array.isArray(services) && services.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <AlertCircle size={36} className="mx-auto text-slate-400" />
              <p className="text-slate-600 text-sm font-medium">Aucun service disponible</p>
              <p className="text-xs text-slate-400">Vous n'avez encore publié aucune prestation pour le moment.</p>
              <Link
                to="/technicien/TechnicienDashboard"
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 transition pt-2"
              >
                <Plus size={14} /> Ajouter mon premier service
              </Link>
            </div>
          )}

          {/* Services Grid */}
          {!loading && Array.isArray(services) && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
                        {service.title}
                      </h3>
                      {service.category_id && (
                        <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 font-medium flex items-center gap-1 shrink-0">
                          <Tag size={10} /> #{service.category_id}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {service.description || "Aucune description fournie pour ce service."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarif fixe</span>
                      <div className="text-base font-bold text-slate-900">
                        {service.price ? Number(service.price).toLocaleString() : '0'}
                        <span className="text-xs font-semibold text-blue-600 ml-1">DH</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleOpenEditModal(service)}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition active:scale-95"
                        title="Modifier"
                      >
                        <Pencil size={15} />
                      </button>
                      <button 
                        onClick={() => handleDelete(service.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition active:scale-95"
                        title="Supprimer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* MODAL EDIT SERVICE */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 space-y-5 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Pencil size={16} className="text-blue-600" />
                Modifier le Service
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {modalError && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Titre du service</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Prix (DH)</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Catégorie ID</label>
                  <input
                    type="number"
                    name="category_id"
                    required
                    value={formData.category_id}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                >
                  {actionLoading && <RotateCw size={12} className="animate-spin" />}
                  <span>{actionLoading ? "Enregistrement..." : "Mettre à jour"}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}