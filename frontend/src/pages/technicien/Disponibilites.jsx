import React, { useState } from "react";
import {
  Clock,
  Calendar,
  CheckCircle2,
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
    setTimeout(() => {
      setSaving(false);
      setSuccessMsg("Vos disponibilités ont été mises à jour avec succès !");
      setTimeout(() => setSuccessMsg(""), 4000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Planning & Congés</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2.5">
              <Clock className="text-blue-600" size={28} />
              Gestion des Disponibilités
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Définissez vos horaires de travail et gérez vos jours d'absence.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition active:scale-95 disabled:opacity-50 shrink-0 shadow-sm self-start md:self-center"
          >
            <Save size={18} />
            <span>{saving ? "Enregistrement..." : "Enregistrer les modifications"}</span>
          </button>
        </div>

        {/* ALERT SUCCESS */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-3">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* QUICK STATUS TOGGLE */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl border ${
                isAvailableNow
                  ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              <Power size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Statut Actuel</h3>
              <p className="text-xs text-slate-500">
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
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
            }`}
          >
            {isAvailableNow ? "Marquer comme Indisponible" : "Marquer comme Disponible"}
          </button>
        </div>

        {/* GRID: WEEKLY SCHEDULE & EXCEPTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* PLANNING HEBDOMADAIRE (2 COLS) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-600" size={20} />
              <h2 className="text-base font-bold text-slate-900">
                Planning Hebdomadaire
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              {schedule.map((item, index) => (
                <div
                  key={item.day}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border transition-all ${
                    item.active
                      ? "bg-slate-50/60 border-slate-200"
                      : "bg-slate-50/20 border-slate-100 opacity-60"
                  }`}
                >
                  {/* TOGGLE DAY */}
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <input
                      type="checkbox"
                      checked={item.active}
                      onChange={() => toggleDay(index)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm w-24">
                      {item.day}
                    </span>
                    {!item.active && (
                      <span className="text-[11px] text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                        Repos
                      </span>
                    )}
                  </div>

                  {/* TIME INPUTS */}
                  {item.active ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500">De</span>
                        <input
                          type="time"
                          value={item.start}
                          onChange={(e) => handleScheduleChange(index, "start", e.target.value)}
                          className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500">À</span>
                        <input
                          type="time"
                          value={item.end}
                          onChange={(e) => handleScheduleChange(index, "end", e.target.value)}
                          className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Non disponible</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DATES D'ABSENCE EXCEPTIONNELLES (1 COL) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-amber-500" size={20} />
              <h2 className="text-base font-bold text-slate-900">
                Congés & Absences
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
              {/* FORM ADD ABSENCE */}
              <form onSubmit={handleAddUnavailability} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Date d'absence
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Motif (Optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Jour férié, Congé..."
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-sm placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <Plus size={14} /> Ajouter une date
                </button>
              </form>

              <hr className="border-slate-100" />

              {/* LIST ABSENCES */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Dates enregistrées
                </h3>

                {unavailabilities.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Aucune absence enregistrée.</p>
                ) : (
                  unavailabilities.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">{item.date}</p>
                        <p className="text-slate-500 text-[11px]">{item.reason}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveUnavailability(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
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
    </div>
  );
}