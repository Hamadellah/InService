import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  ImageIcon,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  UserCheck,
  Wrench,
} from "lucide-react";

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
    phone: "",
    city: "",
    image: "",
  });

  const handleRoleSelect = (role) => {
    setFormData((current) => ({ ...current, role }));
  };

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(formData);

      if (response.user.role === "technicien") {
        navigate("/technicien/TechnicienDashboard");
      } else if (response.user.role === "client") {
        navigate("/client/ClientDashboard");
      } else if (response.user.role === "admin") {
        navigate("/admin/AdminDashboard");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Erreur lors de l'inscription. Veuillez vérifier vos informations.");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

  return (
    <main className="min-h-screen bg-[#f5faf7] font-sans text-slate-900 lg:grid lg:grid-cols-2">
      <section className="relative flex min-h-screen flex-col px-6 py-6 sm:px-10 lg:px-12 xl:px-20">
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

        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-10">
          <div className="mb-7">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-[11px] font-extrabold text-emerald-700">
              <Sparkles size={14} /> Bienvenue sur InService
            </span>
            <h1 className="text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Créez votre compte
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Rejoignez la plateforme comme client ou comme professionnel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">
                Choisissez votre profil
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("client")}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-xs font-extrabold transition ${
                    formData.role === "client"
                      ? "border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "border-slate-200 bg-white text-slate-500 hover:border-emerald-300 hover:text-emerald-700"
                  }`}
                >
                  <UserCheck size={17} /> Client
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("technicien")}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-xs font-extrabold transition ${
                    formData.role === "technicien"
                      ? "border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "border-slate-200 bg-white text-slate-500 hover:border-emerald-300 hover:text-emerald-700"
                  }`}
                >
                  <Wrench size={17} /> Technicien
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-bold text-slate-700">Nom complet</label>
                <div className="group relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-emerald-600" size={17} />
                  <input id="name" name="name" type="text" required autoComplete="name" placeholder="Karim Alami" value={formData.name} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-bold text-slate-700">Adresse email</label>
                <div className="group relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-emerald-600" size={17} />
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="nom@exemple.com" value={formData.email} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-bold text-slate-700">Mot de passe</label>
                <div className="group relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-emerald-600" size={17} />
                  <input id="password" name="password" type={showPassword ? "text" : "password"} required minLength={8} autoComplete="new-password" placeholder="8 caractères minimum" value={formData.password} onChange={handleChange} className={`${inputClass} pr-11`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-emerald-600" aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}>
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-bold text-slate-700">Téléphone</label>
                <div className="group relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-emerald-600" size={17} />
                  <input id="phone" name="phone" type="tel" placeholder="06 12 34 56 78" value={formData.phone} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="city" className="mb-2 block text-xs font-bold text-slate-700">Ville</label>
                <div className="group relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-emerald-600" size={17} />
                  <input id="city" name="city" type="text" placeholder="Casablanca, Rabat..." value={formData.city} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="image" className="mb-2 block text-xs font-bold text-slate-700">URL de la photo</label>
                <div className="group relative">
                  <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-emerald-600" size={17} />
                  <input id="image" name="image" type="url" placeholder="https://..." value={formData.image} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 text-sm font-extrabold text-white shadow-xl shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:shadow-emerald-600/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Création en cours...</>
              ) : (
                <>Créer mon compte <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
            <ShieldCheck size={16} className="text-emerald-600" /> Vos informations restent protégées
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="font-extrabold text-emerald-700 transition hover:text-emerald-600">Se connecter</Link>
          </p>
        </div>
      </section>

      <section className="relative hidden min-h-screen overflow-hidden p-5 lg:block">
        <div className="relative h-full min-h-[calc(100vh-2.5rem)] overflow-hidden rounded-[2.25rem] bg-emerald-950">
          <img
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=90"
            alt="Technicien professionnel InService"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-emerald-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.35),_transparent_35%)]" />

          <div className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-xl">
            <BadgeCheck size={16} className="text-emerald-300" /> Inscription simple et rapide
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-10 xl:p-14">
            <div className="max-w-xl">
              <div className="mb-5 flex gap-1 text-amber-300">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <h2 className="text-2xl font-black leading-snug tracking-tight text-white xl:text-3xl">
                Des services de confiance, accessibles à tous.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-emerald-100/75">
                Trouvez un expert qualifié ou développez votre activité auprès de nouveaux clients.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[["500+", "Experts"], ["18", "Villes"], ["98%", "Satisfaits"]].map(([value, label]) => (
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
