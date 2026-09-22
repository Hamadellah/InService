import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <main className="min-h-screen bg-[#f5faf7] font-sans text-slate-900 lg:grid lg:grid-cols-2">
      <section className="relative flex min-h-screen flex-col px-6 py-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

        <header className="relative z-10 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-black text-white shadow-lg shadow-emerald-500/25 transition group-hover:-rotate-3 group-hover:scale-105">
              iS
            </span>
            <span className="text-xl font-black tracking-tight text-slate-900">
              In<span className="text-emerald-600">Service</span>
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-white hover:text-emerald-700"
          >
            <ArrowLeft size={15} /> Accueil
          </Link>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <div className="mb-8">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-[11px] font-extrabold text-emerald-700">
              <Sparkles size={14} /> Heureux de vous revoir
            </span>
            <h1 className="text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Connectez-vous à votre espace
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Retrouvez vos services, demandes et conversations en quelques secondes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold text-slate-700">
                Adresse email
              </label>
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-emerald-600" size={18} />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-bold text-slate-700">
                  Mot de passe
                </label>
                <a href="#" className="text-xs font-bold text-emerald-700 transition hover:text-emerald-600">
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-emerald-600" size={18} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-emerald-600"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 text-sm font-extrabold text-white shadow-xl shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:shadow-emerald-600/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-7 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
            <ShieldCheck size={16} className="text-emerald-600" />
            Connexion sécurisée et données protégées
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Vous n'avez pas encore de compte ?{" "}
            <Link to="/register" className="font-extrabold text-emerald-700 transition hover:text-emerald-600">
              Créer un compte
            </Link>
          </p>
        </div>
      </section>

      <section className="relative hidden min-h-screen overflow-hidden p-5 lg:block">
        <div className="relative h-full min-h-[calc(100vh-2.5rem)] overflow-hidden rounded-[2.25rem] bg-emerald-950">
          <img
            src="https://i.pinimg.com/736x/7c/3e/43/7c3e436ab63a6a6464d95278a01e71c5.jpg"
            alt="Professionnel InService"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-emerald-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.35),_transparent_35%)]" />

          <div className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-xl">
            <BadgeCheck size={16} className="text-emerald-300" /> Professionnels vérifiés
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-10 xl:p-14">
            <div className="max-w-xl">
              <div className="mb-5 flex gap-1 text-amber-300">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="text-2xl font-black leading-snug tracking-tight text-white xl:text-3xl">
                “Le bon professionnel, disponible au bon moment, près de chez vous.”
              </blockquote>
              <p className="mt-4 max-w-md text-sm leading-6 text-emerald-100/75">
                Rejoignez une communauté qui simplifie les services du quotidien partout au Maroc.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ["500+", "Experts"],
                  ["2 400+", "Services"],
                  ["4.9/5", "Satisfaction"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-lg font-black text-white">{value}</p>
                    <p className="mt-1 text-[10px] font-semibold text-emerald-100/70">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
