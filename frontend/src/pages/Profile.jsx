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

  // Nested details
  const clientDetails = userProfile?.client;
  const technicienDetails = userProfile?.technicien;

  // Form state initialized according to role
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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compte Personnel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2.5">
              <User className="text-blue-600 shrink-0" size={28} />
              Mon Profil
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Gérez vos informations personnelles et mettez à jour votre compte.
            </p>
          </div>

          <button
            onClick={handleOpenModal}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-sm hover:shadow transition active:scale-95 text-xs self-start md:self-center"
          >
            <Edit3 size={16} />
            <span>Compléter le profil</span>
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-3 shadow-sm">
            <AlertCircle size={20} className="shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* MAIN CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          
          {/* AVATAR + BASIC INFO */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={userProfile?.image || "https://via.placeholder.com/150"}
              alt={userProfile?.name}
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />

            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-slate-900">{userProfile?.name}</h2>
                <span className="text-xs font-semibold uppercase text-blue-700 bg-blue-50 border border-blue-200 px-3 py-0.5 rounded-full">
                  {userProfile?.role}
                </span>
              </div>

              <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                <MapPin size={14} className="text-blue-600" />
                {userProfile?.city || "Ville non spécifiée"}
              </p>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <Mail size={18} className="text-blue-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Email</span>
                <span className="text-sm font-semibold text-slate-800 truncate block">{userProfile?.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <Phone size={18} className="text-blue-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Téléphone</span>
                <span className="text-sm font-semibold text-slate-800">{userProfile?.phone || "N/A"}</span>
              </div>
            </div>

            {/* ROLE SPECIFIC DATA */}
            {userProfile?.role === "client" && (
              <div className="col-span-1 md:col-span-2 flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <MapPin size={18} className="text-blue-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Adresse d'intervention</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {clientDetails?.address || "Aucune adresse enregistrée"}
                  </span>
                </div>
              </div>
            )}

            {userProfile?.role === "technicien" && (
              <>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Briefcase size={18} className="text-blue-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Expérience</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {technicienDetails?.experience || "Non spécifiée"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <DollarSign size={18} className="text-blue-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Tarif estimé</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {technicienDetails?.price ? `${technicienDetails.price} DH` : "Non défini"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  {technicienDetails?.availability ? (
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle size={18} className="text-rose-600 shrink-0" />
                  )}
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Disponibilité</span>
                    <span className={`text-sm font-semibold ${technicienDetails?.availability ? "text-emerald-700" : "text-rose-700"}`}>
                      {technicienDetails?.availability ? "Disponible" : "Indisponible"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Star size={18} className="text-amber-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Note moyenne</span>
                    <span className="text-sm font-semibold text-slate-800">
                      {technicienDetails?.average_rating ? `${technicienDetails.average_rating} / 5` : "Pas encore d'avis"}
                    </span>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <FileText size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Biographie</span>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed">
                      {technicienDetails?.bio || "Aucune biographie rédigée."}
                    </p>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

        {/* MODAL EDIT */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-lg shadow-xl space-y-5 relative">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 size={18} className="text-blue-600" />
                  Compléter mon profil ({userProfile?.role})
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* CLIENT FORM */}
                {userProfile?.role === "client" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <MapPin size={14} className="text-blue-600" />
                      Adresse d'intervention
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Entrez votre adresse..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none transition"
                    />
                  </div>
                )}

                {/* TECHNICIEN FORM */}
                {userProfile?.role === "technicien" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                          <Briefcase size={14} className="text-blue-600" />
                          Expérience
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          placeholder="Ex: 2 ans"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none transition"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                          <DollarSign size={14} className="text-blue-600" />
                          Prix (DH)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="Ex: 300"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        Disponibilité
                      </label>
                      <select
                        value={formData.availability ? "true" : "false"}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value === "true" })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none transition"
                      >
                        <option value="true">Disponible</option>
                        <option value="false">Indisponible</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <FileText size={14} className="text-blue-600" />
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Décrivez vos compétences..."
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none transition resize-none"
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition active:scale-95 disabled:opacity-50 flex items-center gap-2"
                  >
                    {submitting && <RotateCw size={14} className="animate-spin" />}
                    <span>{submitting ? "Enregistrement..." : "Enregistrer"}</span>
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