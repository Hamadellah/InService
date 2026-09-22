import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Phone, MapPin, ImageIcon, ArrowRight, ShieldCheck, UserCheck, Wrench } from "lucide-react";

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
    phone: "",
    city: "",
    image: null,
  });

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-10 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header / Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
          <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 p-2.5 rounded-2xl font-black text-xl tracking-wider shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            IS
          </div>
          <span className="text-3xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            InService
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Créer votre compte InService
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition">
            Se connecter
          </Link>
        </p>
      </div>

      {/* Card Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-slate-800/80 sm:px-10">
          
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* SELECTION DU ROLE (Client / Technicien) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Vous êtes ?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("client")}
                  className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                    formData.role === "client"
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-sm"
                      : "border-slate-800 text-slate-400 hover:bg-slate-800/50"
                  }`}
                >
                  <UserCheck className="w-4 h-4" /> Client
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("technicien")}
                  className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                    formData.role === "technicien"
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-sm"
                      : "border-slate-800 text-slate-400 hover:bg-slate-800/50"
                  }`}
                >
                  <Wrench className="w-4 h-4" /> Technicien
                </button>
              </div>
            </div>

            {/* GRID INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nom Complet
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Karim Alami"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition text-xs"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Adresse Email
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="exemple@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition text-xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mot de passe
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition text-xs"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Téléphone
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition text-xs"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Ville
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <input
                    name="city"
                    type="text"
                    placeholder="Casablanca, Rabat..."
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition text-xs"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Photo (Fichier)
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <input
                    name="image"
                    type="file"
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 file:bg-slate-800 file:border-0 file:rounded-lg file:text-xs file:text-slate-300 file:px-2 file:py-1 focus:outline-none transition text-xs cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 text-xs disabled:opacity-70 active:scale-95 cursor-pointer"
            >
              {loading ? (
                <span>Création en cours...</span>
              ) : (
                <>
                  <span>Créer un compte</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Security Badge */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Vos données personnelles sont protégées</span>
          </div>

        </div>
      </div>

    </div>
  );
}