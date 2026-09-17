import React, { useEffect } from "react";
import { useServiceRequest } from "../../hooks/useservicerequest";
import { 
  Calendar, Clock, Mail, Phone, MapPin, 
  User, AlertCircle, Loader2, CheckCircle2, XCircle 
} from "lucide-react";

export default function Demandesc() {
  const { getclientdemande, demandes, loading, deleteServiceRequest } = useServiceRequest();

  useEffect(() => {
    getclientdemande();
  }, []); // [] bāsh t-tjenneb l-infinite loop

  const demandesList = Array.isArray(demandes) ? demandes : demandes ? [demandes] : [];

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "accepté":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={14} /> Acceptée
          </span>
        );
      case "cancelled":
      case "annulé":
      case "refused":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle size={14} /> Annulée
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock size={14} /> En attente
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        <p className="text-sm">Chargement de vos demandes...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <Calendar className="text-cyan-400" size={28} />
            Mes Demandes de Intervention
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Suivez l'état de vos demandes auprès des techniciens
          </p>
        </div>
        <div className="bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50 text-xs text-slate-300 self-start sm:self-auto">
          Total demandes: <span className="font-bold text-cyan-400">{demandesList.length}</span>
        </div>
      </div>

      {/* Content Grid */}
      {demandesList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-center">
          <AlertCircle className="w-12 h-12 text-slate-500 mb-3" />
          <h3 className="text-lg font-medium text-slate-300">Aucune demande trouvée</h3>
          <p className="text-sm text-slate-500 mt-1">Vous n'avez pas encore effectué de demandes de services.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demandesList.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-5 backdrop-blur-xl transition duration-300 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/5"
            >
              <div>
                {/* Technicien Info Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border border-cyan-500/30"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700">
                        <User size={22} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-cyan-400 transition">
                        {item.name || "Technicien"}
                      </h3>
                      {item.city && (
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} className="text-slate-500" />
                          {item.city}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>{getStatusBadge(item.status)}</div>
                </div>

                <div className="space-y-2.5 my-4 text-xs sm:text-sm text-slate-300 bg-slate-850/40 p-3.5 rounded-xl border border-slate-800/60">
                  {item.email && (
                    <div className="flex items-center gap-2.5 text-slate-400">
                      <Mail size={15} className="text-cyan-400 shrink-0" />
                      <span className="truncate">{item.email}</span>
                    </div>
                  )}
                  {item.phone && (
                    <div className="flex items-center gap-2.5 text-slate-400">
                      <Phone size={15} className="text-cyan-400 shrink-0" />
                      <span>{item.phone}</span>
                    </div>
                  )}
                  {item.description && (
                    <p className="text-slate-300 text-xs mt-2 pt-2 border-t border-slate-800/80 line-clamp-3">
                      <span className="text-slate-500 font-medium">Message: </span>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Dates Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 mt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase">Demandé le</span>
                  <span className="font-medium text-slate-300">{item.request_date || "N/A"}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-slate-500 uppercase">Prévu le</span>
                  <span className="font-medium text-cyan-400">{item.scheduled_date || "N/A"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}