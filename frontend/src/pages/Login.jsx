import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      if (response.user.role === "technicien") {
        navigate("/technicien/TechnicienDashboard");
      } else if (response.user.role === "client") {
        navigate("/client/ClientDashboard");
      } else if (response.user.role === "admin") {
        navigate("/admin/AdminDashboard");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Mot de passe ou email incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header / Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
          <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 p-2.5 rounded-2xl font-black text-xl tracking-wider shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            IS
          </div>
          <span className="text-3xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            InService
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Connexion à votre compte
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Vous n'avez pas de compte ?{" "}
          <Link to="/register" className="font-semibold text-cyan-400 hover:text-cyan-300 transition">
            S'inscrire gratuitement
          </Link>
        </p>
      </div>

      {/* Card Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-slate-800/80 sm:px-10">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Adresse Email
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="exemple@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition text-xs"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Mot de passe
                </label>
                <a href="#" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition">
                  Oublié ?
                </a>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition text-xs"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 text-xs disabled:opacity-70 active:scale-95 cursor-pointer"
            >
              {loading ? (
                <span>Connexion en cours...</span>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Security Badge */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Connexion sécurisée & données chiffrées</span>
          </div>

        </div>
      </div>

    </div>
  );
}