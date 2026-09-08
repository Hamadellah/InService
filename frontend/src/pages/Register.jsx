import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Phone, MapPin, ImageIcon, ArrowRight, ShieldCheck, UserCheck, Wrench } from "lucide-react";
export default function Register() {
    const {register,loading} = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        city: "",
        image: null,
    });
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
        }catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            alert("Erreur lors de l'inscription. Veuillez réessayer.");
        }
    };
return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 sm:px-6 lg:px-8 font-sans">
      
      {/* Header / Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl font-black text-xl tracking-wider shadow-lg shadow-blue-500/20">
            IS
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            InService
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Créer votre compte InService
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition">
            Se connecter
          </Link>
        </p>
      </div>

      {/* Card Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100 sm:px-10">
          
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* SELECTION DU RLE (Client / Technicien) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Vous êtes ?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("client")}
                  className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                    formData.role === "client"
                      ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <UserCheck className="w-4 h-4" /> Client
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("technicien")}
                  className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                    formData.role === "technicien"
                      ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Wrench className="w-4 h-4" /> Technicien
                </button>
              </div>
            </div>

            {/* GRID DÉDIÉE L LES INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Nom Complet
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Karim Alami"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Adresse Email
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="exemple@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Mot de passe
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Téléphone
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Ville
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <input
                    name="city"
                    type="text"
                    placeholder="Casablanca, Rabat..."
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Photo (URL)
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <input
                    name="image"
                    type="file"
                    placeholder="choisir une image"
                    value={formData.image}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm disabled:opacity-70 cursor-pointer"
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
          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Vos données personnelles sont protégées</span>
          </div>

        </div>
      </div>

    </div>
  );
};