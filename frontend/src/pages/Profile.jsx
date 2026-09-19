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
  RefreshCw,
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
        <Loader2 className="animate-spin text-cyan-400" size={36} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <User className="text-cyan-400" size={28} />
            Mon Profil
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gérez vos informations personnelles et mettez à jour votre compte.
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95 text-sm"
        >
          <Edit3 size={18} />
          <span>Compléter le profil</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-6">
        
        {/* AVATAR + BASIC INFO */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={userProfile?.image || "https://via.placeholder.com/150"}
            alt={userProfile?.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500/30 shadow-md shadow-cyan-500/10"
          />

          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">{userProfile?.name}</h2>
              <span className="text-xs font-semibold uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-0.5 rounded-full">
                {userProfile?.role}
              </span>
            </div>

            <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
              <MapPin size={14} className="text-cyan-400" />
              {userProfile?.city || "Ville non spécifiée"}
            </p>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
          
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/50">
            <Mail size={18} className="text-cyan-400" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Email</span>
              <span className="text-sm font-medium text-slate-200">{userProfile?.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/50">
            <Phone size={18} className="text-cyan-400" />
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Téléphone</span>
              <span className="text-sm font-medium text-slate-200">{userProfile?.phone || "N/A"}</span>
            </div>
          </div>

          {/* ROLE SPECIFIC DATA */}
          {userProfile?.role === "client" && (
            <div className="col-span-1 md:col-span-2 flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/50">
              <MapPin size={18} className="text-cyan-400" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Adresse d'intervention</span>
                <span className="text-sm font-medium text-slate-200">
                  {clientDetails?.address || "Aucune adresse enregistrée"}
                </span>
              </div>
            </div>
          )}

          {userProfile?.role === "technicien" && (
            <>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/50">
                <Briefcase size={18} className="text-cyan-400" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Expérience</span>
                  <span className="text-sm font-medium text-slate-200">
                    {technicienDetails?.experience || "Non spécifiée"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/50">
                <DollarSign size={18} className="text-cyan-400" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Tarif estimé</span>
                  <span className="text-sm font-medium text-slate-200">
                    {technicienDetails?.price ? `${technicienDetails.price} DH` : "Non défini"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/50">
                {technicienDetails?.availability ? (
                  <CheckCircle2 size={18} className="text-emerald-400" />
                ) : (
                  <XCircle size={18} className="text-rose-400" />
                )}
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Disponibilité</span>
                  <span className={`text-sm font-medium ${technicienDetails?.availability ? "text-emerald-400" : "text-rose-400"}`}>
                    {technicienDetails?.availability ? "Disponible" : "Indisponible"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/50">
                <Star size={18} className="text-amber-400" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Note moyenne</span>
                  <span className="text-sm font-medium text-slate-200">
                    {technicienDetails?.average_rating ? `${technicienDetails.average_rating} / 5` : "Pas encore d'avis"}
                  </span>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/50">
                <FileText size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Biographie</span>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit3 size={18} className="text-cyan-400" />
                Compléter mon profil ({userProfile?.role})
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* CLIENT FORM */}
              {userProfile?.role === "client" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <MapPin size={14} className="text-cyan-400" />
                    Adresse d'intervention
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Entrez votre adresse..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-200 outline-none transition"
                  />
                </div>
              )}

              {/* TECHNICIEN FORM */}
              {userProfile?.role === "technicien" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <Briefcase size={14} className="text-cyan-400" />
                        Expérience
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="Ex: 2 years"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-200 outline-none transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                        <DollarSign size={14} className="text-cyan-400" />
                        Prix (DH)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="Ex: 300"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-200 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      Disponibilité
                    </label>
                    <select
                      value={formData.availability ? "true" : "false"}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value === "true" })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-200 outline-none transition"
                    >
                      <option value="true">Disponible</option>
                      <option value="false">Indisponible</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <FileText size={14} className="text-cyan-400" />
                      Bio
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Décrivez vos compétences..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-200 outline-none transition resize-none"
                    />
                  </div>
                </>
              )}

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
                  <span>{submitting ? "Enregistrement..." : "Enregistrer"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}