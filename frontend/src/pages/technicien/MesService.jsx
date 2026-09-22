
import React, { useEffect, useState } from "react";
import { useservice } from "../../hooks/useservice";
import {
  Wrench,
  Tag,
  AlertCircle,
  RotateCw,
  Plus,
  Trash2,
  Pencil,
  X,
  Sparkles,
  Layers3,
  ArrowUpRight,
  PackageOpen,
  CircleDollarSign,
  Settings2,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MesService() {
  const {
    services,
    loading,
    error,
    messervices,
    updateService,
    deleteService
  } = useservice();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: ""
  });

  const [actionLoading, setActionLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    messervices();
  }, []);

  const handleOpenEditModal = (service) => {
    setEditingService(service);

    setFormData({
      title: service.title || "",
      description: service.description || "",
      price: service.price || "",
      category_id: service.category_id || ""
    });

    setModalError(null);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingService(null);

    setFormData({
      title: "",
      description: "",
      price: "",
      category_id: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
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
      setModalError(
        err.response?.data?.message ||
          "Erreur lors de la modification du service."
      );
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
    <div className="min-h-screen bg-[#f5f7f6] text-slate-900">

      <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[32px] bg-[#0d1f1a] px-6 py-8 sm:px-8 lg:px-10">

          <div className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-36 left-[35%] h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">

                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/70">
                  Catalogue personnel
                </span>

              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">

                Mes services

                <span className="text-emerald-400">.</span>

              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Gérez vos prestations, ajustez vos tarifs et gardez
                votre catalogue toujours à jour.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={messervices}
                disabled={loading}
                className="group flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-bold text-white transition hover:bg-white/10 disabled:opacity-50"
              >
                <RotateCw
                  size={17}
                  className={
                    loading
                      ? "animate-spin text-emerald-400"
                      : "transition-transform duration-500 group-hover:rotate-180"
                  }
                />

                Actualiser
              </button>

              <Link
                to="/technicien/TechnicienDashboard"
                className="flex h-12 items-center gap-2 rounded-2xl bg-emerald-400 px-5 text-sm font-black text-[#0d1f1a] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                <Plus size={18} strokeWidth={3} />

                Nouveau service
              </Link>

            </div>

          </div>

        </section>

        {/* SUMMARY BAR */}
        <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Total services
                </p>

                <p className="mt-2 text-3xl font-black text-slate-900">
                  {Array.isArray(services) ? services.length : 0}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Layers3 size={19} />
              </div>

            </div>

          </div>

          <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Statut
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>

                  <p className="text-lg font-black text-slate-900">
                    Actif
                  </p>

                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Settings2 size={19} />
              </div>

            </div>

          </div>

          <div className="relative overflow-hidden rounded-[24px] bg-emerald-400 p-5 shadow-[0_8px_30px_rgba(16,185,129,0.15)]">

            <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full border-[18px] border-white/10" />

            <div className="relative flex items-center justify-between">

              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-950/60">
                  Gestion
                </p>

                <p className="mt-2 text-lg font-black text-[#0d1f1a]">
                  Catalogue
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300">
                <Wrench size={19} />
              </div>

            </div>

          </div>

        </section>

        {/* ERROR */}
        {error && (

          <div className="mt-6 flex items-start gap-3 rounded-[20px] border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <AlertCircle size={17} />
            </div>

            <div>
              <p className="font-bold">
                Impossible de récupérer les services
              </p>

              <p className="mt-1 text-xs text-red-500">
                {error}
              </p>
            </div>

          </div>

        )}

        {/* SERVICES */}
        <section className="mt-9">

          <div className="mb-6 flex items-end justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <PackageOpen
                  size={16}
                  className="text-emerald-600"
                />

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                  Vos prestations
                </span>

              </div>

              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Catalogue
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Gérez les services visibles dans votre profil.
              </p>

            </div>

            {!loading && Array.isArray(services) && services.length > 0 && (

              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 sm:flex">

                <span className="text-emerald-600">
                  {services.length}
                </span>

                prestation{services.length > 1 ? "s" : ""}

              </div>

            )}

          </div>

          {/* LOADING */}
          {loading && (

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {[1, 2, 3, 4, 5, 6].map((n) => (

                <div
                  key={n}
                  className="h-[280px] animate-pulse rounded-[28px] border border-slate-200 bg-white p-6"
                >

                  <div className="flex justify-between">

                    <div className="h-12 w-12 rounded-2xl bg-slate-100" />

                    <div className="h-7 w-20 rounded-full bg-slate-100" />

                  </div>

                  <div className="mt-7 h-5 w-1/2 rounded bg-slate-100" />

                  <div className="mt-4 h-3 w-full rounded bg-slate-100" />

                  <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />

                  <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />

                  <div className="mt-7 h-px bg-slate-100" />

                  <div className="mt-5 flex justify-between">

                    <div className="h-8 w-20 rounded bg-slate-100" />

                    <div className="h-9 w-20 rounded-xl bg-slate-100" />

                  </div>

                </div>

              ))}

            </div>

          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            Array.isArray(services) &&
            services.length === 0 && (

              <div className="relative overflow-hidden rounded-[32px] border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

                <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-100/60 blur-3xl" />

                <div className="relative">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#0d1f1a] text-emerald-300 shadow-lg">
                    <PackageOpen size={27} />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-slate-900">
                    Votre catalogue est vide
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Commencez par publier votre première prestation.
                  </p>

                  <Link
                    to="/technicien/TechnicienDashboard"
                    className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-400 px-5 text-xs font-black text-[#0d1f1a] transition hover:bg-emerald-300"
                  >
                    <Plus size={15} />

                    Ajouter un service
                  </Link>

                </div>

              </div>

            )}

          {/* SERVICES GRID */}
          {!loading &&
            Array.isArray(services) &&
            services.length > 0 && (

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                {services.map((service, index) => (

                  <article
                    key={service.id}
                    className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                  >

                    {/* Number */}
                    <span className="pointer-events-none absolute right-4 top-[70px] text-[78px] font-black leading-none text-slate-50 transition-colors duration-300 group-hover:text-emerald-50">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* TOP */}
                    <div className="relative flex items-start justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300 transition-all duration-300 group-hover:rotate-3 group-hover:bg-emerald-400 group-hover:text-[#0d1f1a]">
                        <Wrench size={20} />
                      </div>

                      {service.category_id && (

                        <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500">

                          <Tag size={11} />

                          Cat. {service.category_id}

                        </div>

                      )}

                    </div>

                    {/* CONTENT */}
                    <div className="relative mt-6 flex-1">

                      <h3 className="max-w-[80%] text-lg font-black tracking-tight text-slate-900 transition-colors group-hover:text-emerald-700">
                        {service.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {service.description ||
                          "Aucune description fournie pour ce service."}
                      </p>

                    </div>

                    {/* FOOTER */}
                    <div className="relative mt-6 flex items-end justify-between border-t border-slate-100 pt-5">

                      <div>

                        <p className="mb-1 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                          Tarif fixe
                        </p>

                        <div className="flex items-baseline gap-1">

                          <span className="text-2xl font-black tracking-tight text-slate-900">
                            {service.price
                              ? Number(service.price).toLocaleString()
                              : "0"}
                          </span>

                          <span className="text-xs font-black text-emerald-600">
                            DH
                          </span>

                        </div>

                      </div>

                      {/* ACTIONS */}
                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            handleOpenEditModal(service)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95"
                          title="Modifier"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(service.id)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            )}

        </section>

      </div>

      {/* EDIT MODAL */}
      {isEditModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07110e]/70 p-4 backdrop-blur-md">

          <div className="relative w-full max-w-lg overflow-hidden rounded-[30px] border border-white/20 bg-white shadow-2xl">

            {/* HEADER */}
            <div className="relative overflow-hidden bg-[#0d1f1a] px-6 py-6">

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />

              <div className="relative flex items-start justify-between">

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-[#0d1f1a]">
                    <Pencil size={19} />
                  </div>

                  <div>

                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-400">
                      Modification
                    </p>

                    <h3 className="mt-1 text-xl font-black text-white">
                      Modifier le service
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Mettez à jour les informations de votre prestation.
                    </p>

                  </div>

                </div>

                <button
                  onClick={handleCloseModal}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={18} />
                </button>

              </div>

            </div>

            {/* FORM */}
            <div className="p-6">

              {modalError && (

                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-xs font-medium text-red-600">

                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{modalError}</span>

                </div>

              )}

              <form
                onSubmit={handleUpdate}
                className="space-y-5"
              >

                {/* TITLE */}
                <div>

                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Titre du service
                  </label>

                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Nom du service"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                  />

                </div>

                {/* PRICE + CATEGORY */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Prix
                    </label>

                    <div className="relative">

                      <input
                        type="number"
                        name="price"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="300"
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-14 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-emerald-600">
                        DH
                      </span>

                    </div>

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Catégorie ID
                    </label>

                    <input
                      type="number"
                      name="category_id"
                      required
                      value={formData.category_id}
                      onChange={handleInputChange}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                    />

                  </div>

                </div>

                {/* DESCRIPTION */}
                <div>

                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description de votre prestation..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                  />

                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="h-11 rounded-xl px-5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex h-11 items-center gap-2 rounded-xl bg-[#0d1f1a] px-6 text-xs font-black text-white shadow-lg transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    {actionLoading ? (
                      <RotateCw
                        size={15}
                        className="animate-spin"
                      />
                    ) : (
                      <Pencil size={14} />
                    )}

                    <span>
                      {actionLoading
                        ? "Enregistrement..."
                        : "Enregistrer"}
                    </span>

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

