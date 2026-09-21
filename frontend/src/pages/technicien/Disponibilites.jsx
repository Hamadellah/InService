import React, { useState } from "react";
import {
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  Save,
  AlertCircle,
  Power,
  Plus,
  Trash2,
} from "lucide-react";

export default function Disponibilites() {
  // Statut instantané (Disponible immédiatement ou pas)
  const [isAvailableNow, setIsAvailableNow] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Planning hebdomadaire
  const [schedule, setSchedule] = useState([
    { day: "Lundi", active: true, start: "09:00", end: "18:00" },
    { day: "Mardi", active: true, start: "09:00", end: "18:00" },
    { day: "Mercredi", active: true, start: "09:00", end: "18:00" },
    { day: "Jeudi", active: true, start: "09:00", end: "18:00" },
    { day: "Vendredi", active: true, start: "09:00", end: "18:00" },
    { day: "Samedi", active: true, start: "10:00", end: "15:00" },
    { day: "Dimanche", active: false, start: "09:00", end: "18:00" },
  ]);

  // Congés / Dates d'absence
  const [unavailabilities, setUnavailabilities] = useState([
    { id: 1, date: "2026-09-25", reason: "Formation" },
  ]);
  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");

  // Handler update schedule
  const handleScheduleChange = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  // Toggle Day active/inactive
  const toggleDay = (index) => {
    const updated = [...schedule];
    updated[index].active = !updated[index].active;
    setSchedule(updated);
  };

  // Ajout date d'absence
  const handleAddUnavailability = (e) => {
    e.preventDefault();
    if (!newDate) return;
    setUnavailabilities([
      ...unavailabilities,
      { id: Date.now(), date: newDate, reason: newReason || "Absence exceptionnelle" },
    ]);
    setNewDate("");
    setNewReason("");
  };

  // Suppression date d'absence
  const handleRemoveUnavailability = (id) => {
    setUnavailabilities(unavailabilities.filter((item) => item.id !== id));
  };

  // Sauvegarde globale
  const handleSave = () => {
    setSaving(true);
    // Hna t-qdr t-dirlha POST/PUT Request l-api dyalk
    setTimeout(() => {
      setSaving(false);
      setSuccessMsg("Vos disponibilités ont été mises à jour avec succès !");
      setTimeout(() => setSuccessMsg(""), 4000);
    }, 800);
  };

  return (
    <div className="space-y-8 relative">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Clock className="text-cyan-400" size={28} />
            Gestion des Disponibilités
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Définissez vos horaires de travail et gérez vos jours d'absence.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition active:scale-95 disabled:opacity-50 shrink-0 shadow-lg shadow-cyan-500/20"
        >
          <Save size={18} />
          <span>{saving ? "Enregistrement..." : "Enregistrer les modifications"}</span>
        </button>
      </div>

      {/* ALERT SUCCESS */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 size={18} className="shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* QUICK STATUS TOGGLE */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-2xl border ${
              isAvailableNow
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            }`}
          >
            <Power size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Statut Actuel</h3>
            <p className="text-xs text-slate-400">
              {isAvailableNow
                ? "Vous êtes actuellement visible et disponible pour de nouvelles interventions."
                : "Vous êtes masqué des recherches directes."}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAvailableNow(!isAvailableNow)}
          className={`px-4 py-2 rounded-xl border text-xs font-semibold transition active:scale-95 shrink-0 ${
            isAvailableNow
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30"
              : "bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30"
          }`}
        >
          {isAvailableNow ? "Marquer comme Indisponible" : "Marquer comme Disponible"}
        </button>
      </div>

      {/* GRID: WEEKLY SCHEDULE & EXCEPTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PLANNING HEBDOMADAIRE (2 COLS) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="text-cyan-400" size={20} />
            Planning Hebdomadaire
          </h2>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-4">
            {schedule.map((item, index) => (
              <div
                key={item.day}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border transition-all ${
                  item.active
                    ? "bg-slate-950/40 border-slate-800/80"
                    : "bg-slate-950/20 border-slate-900 opacity-60"
                }`}
              >
                {/* TOGGLE DAY */}
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <input
                    type="checkbox"
                    checked={item.active}
                    onChange={() => toggleDay(index)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/20 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-200 text-sm w-24">
                    {item.day}
                  </span>
                  {!item.active && (
                    <span className="text-xs text-rose-400 font-medium bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                      Repos
                    </span>
                  )}
                </div>

                {/* TIME INPUTS */}
                {item.active ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">De</span>
                      <input
                        type="time"
                        value={item.start}
                        onChange={(e) => handleScheduleChange(index, "start", e.target.value)}
                        className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">À</span>
                      <input
                        type="time"
                        value={item.end}
                        onChange={(e) => handleScheduleChange(index, "end", e.target.value)}
                        className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 italic">Non disponible</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DATES D'ABSENCE EXCEPTIONNELLES (1 COL) */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertCircle className="text-amber-400" size={20} />
            Congés & Absences
          </h2>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-5">
            {/* FORM ADD ABSENCE */}
            <form onSubmit={handleAddUnavailability} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Date d'absence
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Motif (Optionnel)
                </label>
                <input
                  type="text"
                  placeholder="ex: Jour férié, Congé..."
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Plus size={14} /> Ajouter une date
              </button>
            </form>

            <hr className="border-slate-800/80" />

            {/* LIST ABSENCES */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Dates enregistrées
              </h3>

              {unavailabilities.length === 0 ? (
                <p className="text-xs text-slate-500 italic">Aucune absence enregistrée.</p>
              ) : (
                unavailabilities.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-200">{item.date}</p>
                      <p className="text-slate-400 text-[11px]">{item.reason}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveUnavailability(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}