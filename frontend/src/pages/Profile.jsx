import React, { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Edit3, 
  X, 
  AlertCircle, 
  Loader2,
  RotateCw,
  Star
} from "lucide-react";

export default function Profile() {
  const { userProfile, loading, error, completeProfile, fetchProfile } = useProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [formError, setFormError] = useState(null);

  const clientDetails = userProfile?.client;
  const technicienDetails = userProfile?.technicien;

  const [formData, setFormData] = useState({
    address: "",
    bio: "",
    experience: "",
    price: "",
    availability: true,
  });

  const handleOpenModal = () => {
    if (userProfile?.role === "client") {
      setFormData({
        address: clientDetails?.address || "",
      });
    } else if (userProfile?.role === "technicien") {
      setFormData({
        bio: technicienDetails?.bio || "",
        experience: technicienDetails?.experience || "",
        price: technicienDetails?.price || "",
        availability: technicienDetails?.availability ?? true,
      });
    }
    setSuccessMsg(null);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      await completeProfile(formData);
      setSuccessMsg("Profil mis à jour avec succès!");
      setTimeout(() => {
        handleCloseModal();
        fetchProfile();
      }, 1000);
    } catch (err) {
      setFormError(err.response?.data?.message || "Erreur lors de la mise à jour.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !userProfile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#f5f7f6]">
        <Loader2 className="animate-spin text-emerald-600" size={36} />
      </div>
    );
  }

  const roleLabel =
    userProfile?.role === "technicien" ? "Technicien" : "Client";

  const isAvailable =
    userProfile?.role === "technicien"
      ? technicienDetails?.availability
      : true;

  return (
    <div className="min-h-full bg-[#f5f7f6] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">

        <section className="relative overflow-hidden rounded-[32px] bg-[#0d1f1a] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-[28%] h-40 w-40 rounded-full bg-emerald-300/5 blur-2xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative shrink-0">
                <div className="h-24 w-24 overflow-hidden rounded-[26px] border border-white/10 bg-white/10 p-1 shadow-2xl">
                  <img
                    src={userProfile?.image || "https://via.placeholder.com/150"}
                    alt={userProfile?.name || "Profil"}
                    className="h-full w-full rounded-[22px] object-cover"
                  />
                </div>
                <span
                  className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-[#0d1f1a] ${
                    isAvailable ? "bg-emerald-400" : "bg-slate-500"
                  }`}
                />
              </div>

              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">
                  <User size={12} className="text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">
                    Compte personnel
                  </span>
                </div>

                <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  {userProfile?.name || "Mon Profil"}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0d1f1a]">
                    {roleLabel}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <MapPin size={13} className="text-emerald-400" />
                    {userProfile?.city || "Ville non spécifiée"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-2xl bg-emerald-400 px-5 text-sm font-black text-[#0d1f1a] transition hover:bg-emerald-300 active:scale-[0.98] lg:self-auto"
            >
              <Edit3 size={17} />
              Modifier le profil
            </button>
          </div>
        </section>

        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            <AlertCircle size={18} className="shrink-0" />
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Type de compte
                </p>
                <p className="mt-2 truncate text-xl font-black text-[#0d1f1a]">
                  {roleLabel}
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <User size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Localisation
                </p>
                <p className="mt-2 truncate text-xl font-black text-[#0d1f1a]">
                  {userProfile?.city || "Non définie"}
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <MapPin size={20} />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[26px] bg-emerald-400 p-5 text-[#0d1f1a] shadow-[0_14px_35px_rgba(16,185,129,0.18)]">
            <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-white/15" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-950/60">
                  Statut du profil
                </p>
                <p className="mt-2 text-xl font-black">
                  {userProfile?.role === "technicien"
                    ? technicienDetails?.availability
                      ? "Disponible"
                      : "Indisponible"
                    : "Actif"}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                Informations
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-[#0d1f1a]">
              Informations personnelles
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Consultez les informations associées à votre compte InService.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="space-y-5 xl:col-span-2">
              <div className="rounded-[30px] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
                      Contact
                    </p>
                    <h3 className="mt-1 text-lg font-black text-[#0d1f1a]">
                      Coordonnées
                    </h3>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Mail size={19} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl bg-[#f7f9f8] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600">
                      <Mail size={17} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                        Adresse email
                      </p>
                      <p className="mt-1 truncate text-sm font-bold text-slate-700">
                        {userProfile?.email || "Non renseigné"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-[#f7f9f8] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600">
                      <Phone size={17} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                        Téléphone
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {userProfile?.phone || "Non renseigné"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {userProfile?.role === "client" && (
                <div className="rounded-[30px] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                        Adresse d'intervention
                      </p>
                      <h3 className="mt-2 text-base font-black text-[#0d1f1a]">
                        {clientDetails?.address || "Aucune adresse enregistrée"}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        Cette adresse sera utilisée comme référence pour vos demandes d'intervention.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {userProfile?.role === "technicien" && (
                <div className="rounded-[30px] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                  <div className="mb-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
                      Profil professionnel
                    </p>
                    <h3 className="mt-1 text-lg font-black text-[#0d1f1a]">
                      Informations métier
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#f7f9f8] p-4">
                      <Briefcase size={17} className="mb-3 text-emerald-600" />
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                        Expérience
                      </p>
                      <p className="mt-1 text-sm font-black text-[#0d1f1a]">
                        {technicienDetails?.experience || "Non spécifiée"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f7f9f8] p-4">
                      <DollarSign size={17} className="mb-3 text-emerald-600" />
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                        Tarif estimé
                      </p>
                      <p className="mt-1 text-sm font-black text-[#0d1f1a]">
                        {technicienDetails?.price
                          ? `${technicienDetails.price} DH`
                          : "Non défini"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f7f9f8] p-4">
                      {technicienDetails?.availability ? (
                        <CheckCircle2 size={17} className="mb-3 text-emerald-600" />
                      ) : (
                        <XCircle size={17} className="mb-3 text-rose-500" />
                      )}
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                        Disponibilité
                      </p>
                      <p
                        className={`mt-1 text-sm font-black ${
                          technicienDetails?.availability
                            ? "text-emerald-700"
                            : "text-rose-600"
                        }`}
                      >
                        {technicienDetails?.availability
                          ? "Disponible"
                          : "Indisponible"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f7f9f8] p-4">
                      <Star size={17} className="mb-3 text-amber-500" />
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                        Note moyenne
                      </p>
                      <p className="mt-1 text-sm font-black text-[#0d1f1a]">
                        {technicienDetails?.average_rating
                          ? `${technicienDetails.average_rating} / 5`
                          : "Pas encore d'avis"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="relative overflow-hidden rounded-[30px] bg-[#0d1f1a] p-6">
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-400/10 blur-2xl" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-[#0d1f1a]">
                    <User size={20} />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-white">
                    Votre profil
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Gardez vos informations à jour pour profiter pleinement des fonctionnalités InService.
                  </p>

                  <button
                    onClick={handleOpenModal}
                    className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-white/10 text-xs font-black text-white transition hover:bg-white/15"
                  >
                    <Edit3 size={15} className="text-emerald-400" />
                    Modifier mes informations
                  </button>
                </div>
              </div>

              {userProfile?.role === "technicien" && (
                <div className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <FileText size={18} />
                  </div>

                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                    Biographie
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {technicienDetails?.bio || "Aucune biographie rédigée."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07110e]/70 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[30px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              <div className="relative overflow-hidden bg-[#0d1f1a] px-6 py-6">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-400/10" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-emerald-400">
                      <Edit3 size={14} />
                      <span className="text-[9px] font-black uppercase tracking-[0.18em]">
                        Paramètres du profil
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white">
                      Modifier mon profil
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Mettez à jour vos informations de {roleLabel.toLowerCase()}.
                    </p>
                  </div>

                  <button
                    onClick={handleCloseModal}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/15 hover:text-white"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {formError && (
                  <div className="mb-4 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
                    <AlertCircle size={16} className="shrink-0" />
                    {formError}
                  </div>
                )}

                {successMsg && (
                  <div className="mb-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={16} className="shrink-0" />
                    {successMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {userProfile?.role === "client" && (
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-xs font-black text-slate-700">
                        <MapPin size={14} className="text-emerald-600" />
                        Adresse d'intervention
                      </label>

                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: e.target.value,
                          })
                        }
                        placeholder="Entrez votre adresse..."
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9f8] px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                      />
                    </div>
                  )}

                  {userProfile?.role === "technicien" && (
                    <>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-xs font-black text-slate-700">
                            <Briefcase size={14} className="text-emerald-600" />
                            Expérience
                          </label>

                          <input
                            type="text"
                            required
                            value={formData.experience}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                experience: e.target.value,
                              })
                            }
                            placeholder="Ex: 2 ans"
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9f8] px-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                          />
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-xs font-black text-slate-700">
                            <DollarSign size={14} className="text-emerald-600" />
                            Prix (DH)
                          </label>

                          <input
                            type="number"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                price: e.target.value,
                              })
                            }
                            placeholder="Ex: 300"
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9f8] px-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-black text-slate-700">
                          Disponibilité
                        </label>

                        <select
                          value={formData.availability ? "true" : "false"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              availability: e.target.value === "true",
                            })
                          }
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f7f9f8] px-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                        >
                          <option value="true">Disponible</option>
                          <option value="false">Indisponible</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 flex items-center gap-2 text-xs font-black text-slate-700">
                          <FileText size={14} className="text-emerald-600" />
                          Biographie
                        </label>

                        <textarea
                          rows={4}
                          required
                          value={formData.bio}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bio: e.target.value,
                            })
                          }
                          placeholder="Décrivez vos compétences..."
                          className="w-full resize-none rounded-2xl border border-slate-200 bg-[#f7f9f8] p-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                        />
                      </div>
                    </>
                  )}

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
                      disabled={submitting}
                      className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 text-xs font-black text-[#0d1f1a] transition hover:bg-emerald-300 disabled:opacity-50"
                    >
                      {submitting && (
                        <RotateCw size={14} className="animate-spin" />
                      )}
                      {submitting ? "Enregistrement..." : "Enregistrer"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
