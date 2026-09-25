import React, { useEffect, useState } from "react";
import { usecategory } from "../../hooks/usecategory";
import { useservice } from "../../hooks/useservice";

import {
  Plus,
  Wrench,
  Tag,
  AlertCircle,
  RotateCw,
  X,
  Search,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Activity,
  Layers3,
  MapPin,
  UserRound,
} from "lucide-react";

export default function TechnicienDashboard() {

  // Hooks
  const {
    services,
    loading,
    addService,
    messervices,
  } = useservice();

  const {
    categories,
    loading: categoriesLoading,
    fetchCategories,
  } = usecategory();


  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");


  // Charger les services et catégories
  useEffect(() => {
    messervices();
    fetchCategories();
  }, []);


  // Transformer services en tableau
  let servicesList = [];

  if (Array.isArray(services)) {
    servicesList = services;
  } else if (services?.data) {
    servicesList = services.data;
  } else if (services?.services) {
    servicesList = services.services;
  }


  // Transformer categories en tableau
  let categoriesList = [];

  if (Array.isArray(categories)) {
    categoriesList = categories;
  } else if (categories?.data) {
    categoriesList = categories.data;
  } else if (categories?.categories) {
    categoriesList = categories.categories;
  }


  // Trouver le nom d'une catégorie
  const getCategoryName = (categoryId) => {

    const category = categoriesList.find((cat) => {
      return Number(cat.id) === Number(categoryId);
    });

    if (category) {
      return category.name;
    }

    return "Catégorie";
  };


  // Compter les catégories utilisées
  const categoryIds = [];

  servicesList.forEach((service) => {

    if (
      service.category_id &&
      !categoryIds.includes(service.category_id)
    ) {
      categoryIds.push(service.category_id);
    }

  });

  const usedCategories = categoryIds.length;


  // Rechercher un service
  const filteredServices = servicesList.filter((service) => {

    const search = searchTerm
      .toLowerCase()
      .trim();

    // Si aucune recherche
    if (search === "") {
      return true;
    }

    const title =
      service.title?.toLowerCase() || "";

    const description =
      service.description?.toLowerCase() || "";

    const category =
      service.category_name?.toLowerCase() || "";

    const name =
      service.name?.toLowerCase() || "";

    const city =
      service.city?.toLowerCase() || "";


    if (title.includes(search)) {
      return true;
    }

    if (description.includes(search)) {
      return true;
    }

    if (category.includes(search)) {
      return true;
    }

    if (name.includes(search)) {
      return true;
    }

    if (city.includes(search)) {
      return true;
    }

    return false;
  });


  // Modifier les champs du formulaire
  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Fermer le modal
  const handleCloseModal = () => {

    // Ne pas fermer pendant l'ajout
    if (submitting) {
      return;
    }

    setIsModalOpen(false);
    setFormError("");

    setFormData({
      title: "",
      description: "",
      price: "",
      category_id: "",
    });
  };


  // Ajouter un service
  const handleSubmit = async (e) => {

    e.preventDefault();

    setSubmitting(true);
    setFormError("");

    try {

      // Ajouter le service
      await addService(formData);

      // Vider le formulaire
      setFormData({
        title: "",
        description: "",
        price: "",
        category_id: "",
      });

      // Fermer le modal
      setIsModalOpen(false);

      // Recharger les services
      await messervices();

    } catch (error) {

      console.log(error);

      const message =
        error.response?.data?.message ||
        "Erreur lors de l'ajout du service. Vérifiez vos données.";

      setFormError(message);

    } finally {

      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#f5f7f6] text-slate-900">
      <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">

        <section className="relative overflow-hidden rounded-[32px] bg-[#0d1f1a] px-6 py-7 sm:px-8 lg:px-10 lg:py-9">
          <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="pointer-events-none absolute bottom-[-150px] left-[35%] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-100/70">
                  Espace Technicien
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Gérez vos services

                <span className="block text-emerald-400">
                  simplement.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Centralisez vos prestations, suivez votre activité et
                développez votre présence depuis un seul espace.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  messervices();
                  fetchCategories();
                }}
                disabled={loading || categoriesLoading}
                className="group flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition-all hover:bg-white/10 disabled:opacity-50"
              >
                <RotateCw
                  size={17}
                  className={
                    loading || categoriesLoading
                      ? "animate-spin text-emerald-400"
                      : "transition-transform duration-500 group-hover:rotate-180"
                  }
                />

                Actualiser
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormError("");
                  setIsModalOpen(true);
                }}
                className="flex h-12 items-center gap-2 rounded-2xl bg-emerald-400 px-5 text-sm font-black text-[#0d1f1a] shadow-lg shadow-emerald-950/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                <Plus size={18} strokeWidth={3} />

                Nouveau service
              </button>
            </div>
          </div>
        </section>

        <section className="relative z-20 -mt-1 grid grid-cols-1 gap-4 px-0 pt-5 md:grid-cols-3">

          <div className="group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Services actifs
                </p>

                <div className="mt-3 flex items-end gap-2">
                  <h2 className="text-4xl font-black tracking-tight text-slate-900">
                    {servicesList.length}
                  </h2>

                  <span className="mb-1.5 text-xs font-semibold text-slate-400">
                    prestations
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform group-hover:rotate-6 group-hover:scale-105">
                <Wrench size={21} />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <Activity size={14} />

              Activité disponible
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Demandes reçues
                </p>

                <div className="mt-3 flex items-end gap-2">
                  <h2 className="text-4xl font-black tracking-tight text-slate-900">
                    12
                  </h2>

                  <span className="mb-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                    +18%
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white transition-transform group-hover:-rotate-6 group-hover:scale-105">
                <TrendingUp size={21} />
              </div>
            </div>

            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[72%] rounded-full bg-emerald-400" />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[26px] bg-emerald-400 p-6 shadow-[0_10px_40px_rgba(16,185,129,0.15)]">
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full border-[20px] border-white/10" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-emerald-950/60">
                  Catégories utilisées
                </p>

                <div className="mt-3 flex items-end gap-2">
                  <h2 className="text-4xl font-black tracking-tight text-[#0d1f1a]">
                    {usedCategories}
                  </h2>

                  <span className="mb-1.5 text-xs font-black text-emerald-950/50">
                    catégorie
                    {usedCategories > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300">
                <Layers3 size={21} />
              </div>
            </div>

            <div className="relative mt-6 flex items-center gap-2 text-xs font-bold text-emerald-950/70">
              <Tag size={14} />

              Répartition de vos prestations
            </div>
          </div>

        </section>

        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Layers3
                  size={16}
                  className="text-emerald-600"
                />

                <span className="text-xs font-black uppercase tracking-[0.16em] text-emerald-600">
                  Catalogue
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Mes prestations
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Retrouvez et gérez l'ensemble de vos services.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <div className="relative w-full sm:w-[330px]">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Rechercher une prestation..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
                />
              </div>

              <div className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-500 shadow-sm">
                <span className="mr-1 text-slate-900">
                  {filteredServices.length}
                </span>

                résultat(s)
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white"
                >
                  <div className="h-[220px] animate-pulse bg-slate-200" />

                  <div className="p-5">
                    <div className="h-5 w-2/3 animate-pulse rounded-lg bg-slate-100" />

                    <div className="mt-4 h-3 w-full animate-pulse rounded bg-slate-100" />

                    <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-slate-100" />

                    <div className="mt-6 h-20 animate-pulse rounded-2xl bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="relative overflow-hidden rounded-[32px] border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
              <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-100/60 blur-3xl" />

              <div className="relative">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-emerald-50 text-emerald-600">
                  <AlertCircle size={27} />
                </div>

                <h3 className="mt-5 text-lg font-black text-slate-900">
                  Aucun service trouvé
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Vous n'avez aucune prestation correspondant à votre
                  recherche.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setFormError("");
                    setIsModalOpen(true);
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0d1f1a] px-5 py-3 text-xs font-bold text-white transition hover:bg-emerald-600"
                >
                  <Plus size={16} />

                  Créer une prestation
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredServices.map((service) => {
                const serviceId =
                  service.service_id ?? service.id;

                const categoryName =
                  service.category_name ||
                  getCategoryName(service.category_id);

                return (
                  <article
                    key={serviceId}
                    className="group overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)]"
                  >
                    <div className="relative h-[220px] overflow-hidden bg-[#0d1f1a]">
                      {service.category_image ? (
                        <img
                          src={service.category_image}
                          alt={categoryName}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Wrench
                            size={48}
                            className="text-emerald-300"
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#07110e]/95 via-[#07110e]/20 to-transparent" />

                      <div className="absolute left-4 top-4">
                        <div className="inline-flex max-w-[240px] items-center gap-2 rounded-full border border-white/20 bg-[#07110e]/75 px-3 py-2 text-[10px] font-black text-white shadow-lg backdrop-blur-md">
                          <Tag
                            size={12}
                            className="shrink-0 text-emerald-400"
                          />

                          <span className="truncate">
                            {categoryName}
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="mb-1 text-[9px] font-black uppercase tracking-[0.16em] text-emerald-300">
                          Votre prestation
                        </p>

                        <h3 className="line-clamp-2 text-xl font-black tracking-tight text-white">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500">
                        {service.description ||
                          "Aucune description disponible pour cette prestation."}
                      </p>

                      {(service.name || service.city) && (
                        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                            {service.name ? (
                              <span className="text-sm font-black uppercase">
                                {service.name.charAt(0)}
                              </span>
                            ) : (
                              <UserRound size={17} />
                            )}
                          </div>

                          <div className="min-w-0">
                            {service.name && (
                              <p className="truncate text-sm font-black text-slate-800">
                                {service.name}
                              </p>
                            )}

                            {service.city && (
                              <div className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-400">
                                <MapPin
                                  size={11}
                                  className="shrink-0"
                                />

                                <span className="truncate">
                                  {service.city}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="mt-5 flex items-center justify-between rounded-[20px] bg-[#f5f7f6] p-4">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                            Tarif
                          </p>

                          <div className="mt-1 flex items-baseline gap-1">
                            <span className="text-2xl font-black tracking-tight text-[#0d1f1a]">
                              {service.price
                                ? Number(
                                    service.price
                                  ).toLocaleString()
                                : "0"}
                            </span>

                            <span className="text-xs font-black text-emerald-600">
                              DH
                            </span>
                          </div>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300 transition-all duration-300 group-hover:bg-emerald-400 group-hover:text-[#0d1f1a]">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07110e]/70 p-4 backdrop-blur-md">
          <div className="relative max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-[30px] border border-white/20 bg-white shadow-2xl">
            <div className="relative overflow-hidden bg-[#0d1f1a] px-6 py-6">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-[#0d1f1a]">
                    <Sparkles size={20} />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
                      Nouvelle prestation
                    </p>

                    <h3 className="mt-1 text-xl font-black text-white">
                      Ajouter un service
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Complétez les informations ci-dessous.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {formError && (
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-xs font-medium text-red-600">
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{formError}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Titre du service
                  </label>

                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex: Installation électrique"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Catégorie
                    </label>

                    <select
                      name="category_id"
                      required
                      value={formData.category_id}
                      onChange={handleChange}
                      disabled={categoriesLoading}
                      className="h-12 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10 disabled:opacity-50"
                    >
                      <option value="" disabled>
                        {categoriesLoading
                          ? "Chargement..."
                          : "Sélectionner"}
                      </option>

                      {categoriesList.map((cat) => {
                        const id =
                          cat.id || cat.id_category;

                        const name =
                          cat.name ||
                          cat.nom ||
                          cat.title ||
                          `Catégorie #${id}`;

                        return (
                          <option
                            key={id}
                            value={id}
                          >
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-slate-700">
                      Prix
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        name="price"
                        step="0.01"
                        min="0"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="300"
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-14 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-emerald-600">
                        DH
                      </span>
                    </div>
                  </div>
                </div>

                {formData.category_id && (
                  <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Tag size={15} />
                    </div>

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-emerald-600">
                        Catégorie sélectionnée
                      </p>

                      <p className="mt-0.5 text-xs font-black text-slate-800">
                        {getCategoryName(
                          formData.category_id
                        )}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Décrivez votre prestation..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={submitting}
                    className="h-11 rounded-xl px-5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    disabled={
                      submitting || categoriesLoading
                    }
                    className="flex h-11 items-center gap-2 rounded-xl bg-[#0d1f1a] px-6 text-xs font-black text-white shadow-lg transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <RotateCw
                        size={15}
                        className="animate-spin"
                      />
                    ) : (
                      <Plus size={15} />
                    )}

                    {submitting
                      ? "Enregistrement..."
                      : "Créer le service"}
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