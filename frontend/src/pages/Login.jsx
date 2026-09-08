import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";


export default function Login() {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login , loading} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Connexion réussie:", response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("mot de passe ou email incorrect");
    }
  }

return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      
      {/* Header / Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl font-black text-xl tracking-wider shadow-lg shadow-blue-500/20">
            IS
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            InService
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Connexion à votre compte
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Vous n'avez pas de compte ?{" "}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition">
            S'inscrire gratuitement
          </Link>
        </p>
      </div>

      {/* Card Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100 sm:px-10">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Adresse Email
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="exemple@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Mot de passe
                </label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-500">
                  Oublié ?
                </a>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm disabled:opacity-70 cursor-pointer"
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
          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Connexion sécurisée & données chiffrées</span>
          </div>

        </div>
      </div>

    </div>
  );
}