
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const services = [
  {
    name: "Électricité",
    description: "Installation, dépannage et mise aux normes",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85",
    icon: Zap,
    accent: "from-amber-400 to-orange-500",
  },
  {
    name: "Plomberie",
    description: "Fuites, sanitaires et installations complètes",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=85",
    icon: Wrench,
    accent: "from-cyan-400 to-teal-600",
  },
  {
    name: "Climatisation",
    description: "Pose, entretien et réparation de vos équipements",
    image:
      "https://i.pinimg.com/736x/41/cc/21/41cc214426dda86b54079e39e209438c.jpg",
    icon: Sparkles,
    accent: "from-green-400 to-emerald-600",
  },
  {
    name: "Maison & entretien",
    description: "Des professionnels pour chaque besoin du quotidien",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=85",
    icon: ShieldCheck,
    accent: "from-emerald-400 to-teal-500",
  },
];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Décrivez votre besoin",
    text: "Choisissez le service et indiquez votre ville en quelques secondes.",
  },
  {
    number: "02",
    icon: Users,
    title: "Comparez les experts",
    text: "Consultez les profils, tarifs, disponibilités et avis vérifiés.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Réservez sereinement",
    text: "Envoyez votre demande et échangez directement avec le technicien.",
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5faf7] text-slate-900 selection:bg-emerald-600 selection:text-white">

      <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 font-black shadow-lg shadow-emerald-500/25">
              iS
            </span>

            <span className="text-xl font-black tracking-tight">
              In
              <span className="text-emerald-600">
                Service
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a
              className="transition hover:text-emerald-700"
              href="#services"
            >
              Services
            </a>

            <a
              className="transition hover:text-emerald-700"
              href="#how"
            >
              Comment ça marche
            </a>

            <a
              className="transition hover:text-emerald-700"
              href="#why"
            >
              Pourquoi nous
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50"
            >
              Se connecter
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/10"
            >
              Créer un compte
            </Link>
          </div>

          <button
            className="rounded-xl border border-emerald-200 bg-white p-2.5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-emerald-100 bg-white px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm text-slate-600">

              <a
                href="#services"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </a>

              <a
                href="#how"
                onClick={() => setMenuOpen(false)}
              >
                Comment ça marche
              </a>

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Se connecter
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-emerald-600 px-4 py-3 text-center font-bold text-white"
              >
                Créer un compte
              </Link>

            </div>
          </div>
        )}
      </header>

      <main>

        <section className="relative px-5 pb-20 pt-32 sm:pt-40 lg:px-8 lg:pb-28">

          <div className="absolute left-[-12rem] top-24 h-[32rem] w-[32rem] rounded-full bg-emerald-300/35 blur-[120px]" />

          <div className="absolute right-[-8rem] top-48 h-[28rem] w-[28rem] rounded-full bg-teal-300/25 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">

            <div>

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                <BadgeCheck size={16} />
                Des techniciens vérifiés partout au Maroc
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Le bon expert,

                <span className="block bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
                  au bon moment.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Trouvez rapidement un professionnel de confiance près de chez
                vous. Comparez, contactez et réservez sans perdre de temps.
              </p>

              <form
                onSubmit={handleSearch}
                className="mt-9 max-w-2xl rounded-[1.4rem] border border-emerald-100 bg-white p-2.5 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl"
              >

                <div className="flex flex-col gap-2 sm:flex-row">

                  <label className="flex flex-1 items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3.5">

                    <Search
                      className="text-emerald-600"
                      size={20}
                    />

                    <input
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                      className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
                      placeholder="Quel service recherchez-vous ?"
                    />

                  </label>

                  <label className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3.5 sm:w-48">

                    <MapPin
                      className="text-emerald-600"
                      size={19}
                    />

                    <select className="w-full bg-transparent text-sm text-slate-600 outline-none">

                      <option className="bg-emerald-50">
                        Votre ville
                      </option>

                      <option className="bg-emerald-50">
                        Casablanca
                      </option>

                      <option className="bg-emerald-50">
                        Rabat
                      </option>

                      <option className="bg-emerald-50">
                        Beni Mellal
                      </option>

                      <option className="bg-emerald-50">
                        Marrakech
                      </option>

                    </select>

                  </label>

                  <button
                    type="submit"
                    className="grid place-items-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-110"
                    aria-label="Rechercher"
                  >
                    <ArrowRight size={21} />
                  </button>

                </div>
              </form>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-slate-600">

                {[
                  "Profils vérifiés",
                  "Prix transparents",
                  "Support rapide",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-emerald-400"
                    />

                    {item}
                  </span>
                ))}

              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[570px] lg:mx-0">

              <div className="absolute -inset-5 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/20 to-teal-400/10 blur-sm" />

              <div className="relative overflow-hidden rounded-[2.2rem] border border-emerald-100 bg-white p-2 shadow-2xl shadow-emerald-900/15">

                <img
                  src="https://i.pinimg.com/736x/7c/3e/43/7c3e436ab63a6a6464d95278a01e71c5.jpg"
                  alt="Technicien professionnel InService"
                  className="h-[520px] w-full rounded-[1.8rem] object-cover object-center"
                />

                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-emerald-950/85 p-4 text-white backdrop-blur-xl">

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <div className="flex items-center gap-2 font-bold">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        Experts disponibles
                      </div>

                      <p className="mt-1 text-xs text-emerald-100/70">
                        Une réponse en moins de 10 minutes
                      </p>
                    </div>

                    <div className="flex -space-x-2">

                      {["JD", "AM", "YK"].map((name, index) => (
                        <span
                          key={name}
                          className={`grid h-10 w-10 place-items-center rounded-full border-2 border-white text-[10px] font-black ${
                            index === 0
                              ? "bg-emerald-600"
                              : index === 1
                              ? "bg-teal-500"
                              : "bg-amber-500"
                          }`}
                        >
                          {name}
                        </span>
                      ))}

                    </div>

                  </div>

                </div>

              </div>

              <div className="absolute -left-6 top-12 hidden rounded-2xl border border-white/15 bg-white/95 p-4 shadow-xl backdrop-blur-xl sm:block">

                <div className="flex items-center gap-3">

                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/15 text-amber-500">
                    <Star
                      size={19}
                      fill="currentColor"
                    />
                  </span>

                  <div>
                    <p className="font-black">
                      4.9/5
                    </p>

                    <p className="text-[10px] text-slate-600">
                      Avis clients
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="relative mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-4 border-y border-emerald-100 py-7 md:grid-cols-4">

            {[
              ["500+", "Techniciens"],
              ["2 400+", "Interventions"],
              ["18", "Villes couvertes"],
              ["98%", "Clients satisfaits"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="text-center"
              >
                <p className="text-2xl font-black sm:text-3xl">
                  {value}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {label}
                </p>
              </div>
            ))}

          </div>

        </section>

        <section
          id="services"
          className="bg-white px-5 py-24 lg:px-8"
        >

          <div className="mx-auto max-w-7xl">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>

                <p className="text-xs font-black uppercase tracking-[.22em] text-emerald-600">
                  Services populaires
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Un expert pour chaque besoin
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  Des professionnels sélectionnés pour intervenir chez vous
                  avec sérieux et efficacité.
                </p>

              </div>

              <button
                type="button"
                onClick={goToLogin}
                className="flex items-center gap-2 text-sm font-bold text-emerald-600"
              >
                Voir tous les services
                <ArrowRight size={17} />
              </button>

            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.name}
                    className="group overflow-hidden rounded-3xl border border-emerald-100 bg-white transition duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/10"
                  >

                    <div className="relative h-56 overflow-hidden">

                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />

                      <span
                        className={`absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${service.accent} shadow-lg`}
                      >
                        <Icon size={20} />
                      </span>

                    </div>

                    <div className="p-5">

                      <h3 className="text-lg font-bold">
                        {service.name}
                      </h3>

                      <p className="mt-2 min-h-10 text-xs leading-5 text-slate-600">
                        {service.description}
                      </p>

                      <button
                        type="button"
                        onClick={goToLogin}
                        className="mt-5 flex items-center gap-1 text-xs font-bold text-emerald-700"
                      >
                        Découvrir

                        <ChevronRight
                          size={15}
                          className="transition group-hover:translate-x-1"
                        />
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>

          </div>

        </section>

        <section
          id="how"
          className="px-5 py-24 lg:px-8"
        >

          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-2xl text-center">

              <p className="text-xs font-black uppercase tracking-[.22em] text-emerald-600">
                Simple et rapide
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Votre service en trois étapes
              </h2>

            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">

              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative rounded-3xl border border-emerald-100 bg-white p-7"
                  >

                    <span className="absolute right-6 top-5 text-5xl font-black text-emerald-100">
                      {step.number}
                    </span>

                    <span className="grid h-13 w-13 place-items-center rounded-2xl bg-emerald-600/15 text-emerald-600">
                      <Icon size={23} />
                    </span>

                    <h3 className="mt-6 text-lg font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {step.text}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

        </section>

        <section
          id="why"
          className="px-5 pb-24 lg:px-8"
        >

          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-emerald-600 to-teal-800 text-white lg:grid-cols-2">

            <div className="p-8 sm:p-12 lg:p-16">

              <p className="text-xs font-black uppercase tracking-[.22em] text-emerald-200">
                La confiance avant tout
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                Vos travaux méritent des mains expertes.
              </h2>

              <p className="mt-5 text-sm leading-6 text-emerald-100/80">
                Chaque professionnel dispose d'un profil complet pour vous
                aider à faire le bon choix en toute confiance.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                {[
                  "Identité vérifiée",
                  "Avis authentiques",
                  "Messagerie intégrée",
                  "Disponibilités à jour",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    <CheckCircle2
                      size={17}
                      className="text-emerald-200"
                    />

                    {item}
                  </span>
                ))}

              </div>

              <button
                type="button"
                onClick={goToLogin}
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-emerald-900 shadow-xl"
              >
                Trouver un technicien
                <ArrowRight size={17} />
              </button>

            </div>

            <div className="relative min-h-[390px]">

              <img
                src="https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=1100&q=90"
                alt="Professionnel de confiance"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent lg:from-emerald-900/25" />

              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-black/35 p-4 backdrop-blur-xl">

                <div className="flex items-center gap-3">

                  <Clock3 className="text-emerald-300" />

                  <div>

                    <p className="text-sm font-bold">
                      Intervention rapide
                    </p>

                    <p className="text-xs text-white/65">
                      Trouvez un professionnel disponible aujourd'hui
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <footer className="border-t border-white/10 bg-emerald-950 px-5 py-10 text-white lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-black">
              iS
            </span>

            <span className="font-black">
              InService
            </span>

          </Link>

          <p className="text-xs text-emerald-100/60">
            © {new Date().getFullYear()} InService. Des experts, simplement.
          </p>

          <div className="flex gap-5 text-xs text-emerald-100/70">

            <a href="#services">
              Services
            </a>

            <Link to="/login">
              Connexion
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
}
