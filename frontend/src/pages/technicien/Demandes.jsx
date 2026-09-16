import React, { useEffect, useState } from "react";
import { useServiceRequest } from "../../hooks/useservicerequest";
import { 
  Clock, 
  Calendar, 
  FileText, 
  AlertCircle, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Hourglass,
  Tag,
  Phone,
  MapPin,
  Mail,
  User,
  Check,
  X,
  PlayCircle
} from "lucide-react";

export default function Demandes() {
  const { 
    serviceRequest, 
    getServiceRequests, 
    updateServiceRequestStatus, 
    loading, 
    error 
  } = useServiceRequest();

  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    getServiceRequests();
  }, []);

  const handleStatusChange = async (requestId, newStatus) => {
    setUpdatingId(requestId);
    try {
      if (updateServiceRequestStatus) {
        await updateServiceRequestStatus(requestId, { status: newStatus });
      }
      await getServiceRequests();
    } catch (err) {
      console.error("Erreur lors du changement de statut:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Helper Badge dyal Status m-matchi m3a ENUM Database
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Hourglass size={13} />
            En attente
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 size={13} />
            Accepté
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <PlayCircle size={13} />
            En cours
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <CheckCircle2 size={13} />
            Terminé
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <XCircle size={13} />
            Refusé
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300">
            {status || "Inconnu"}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Gestion des Demandes
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gérez et répondez aux demandes d'intervention reçues.
          </p>
        </div>

        <button
          onClick={getServiceRequests}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-sm font-medium transition active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin text-cyan-400" : ""} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-800 rounded w-1/4"></div>
                </div>
              </div>
              <div className="h-12 bg-slate-800 rounded-lg"></div>
              <div className="h-10 bg-slate-800 rounded-xl"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && serviceRequest && serviceRequest.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
          <AlertCircle size={40} className="mx-auto text-slate-500 mb-3" />
          <h3 className="text-base font-medium text-slate-300">Aucune demande trouvée</h3>
          <p className="text-xs text-slate-500 mt-1">Vous n'avez pas encore reçu de demande d'intervention.</p>
        </div>
      )}

      {/* Requests List */}
      {!loading && serviceRequest && serviceRequest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceRequest.map((request) => {
            const isPending = request.status === "pending";
            const isActionLoading = updatingId === request.id;

            return (
              <div
                key={request.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300"
              >
                <div className="space-y-4">
                  
                  {/* Header: ID, Service ID & Status */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                        Demande #{request.id}
                      </span>
                      {request.service_id && (
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Tag size={12} /> Service #{request.service_id}
                        </span>
                      )}
                    </div>
                    {getStatusBadge(request.status)}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3.5 bg-slate-950/40 p-3 rounded-xl border border-slate-800/40">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg overflow-hidden">
                        {request.image ? (
                          <img
                            src={request.image}
                            alt={request.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <User size={20} />
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-100 text-sm truncate">
                        {request.name || "Client"}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        {request.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={12} className="text-slate-500" />
                            {request.phone}
                          </span>
                        )}
                        {request.city && (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-slate-500" />
                            {request.city}
                          </span>
                        )}
                        {request.email && (
                          <span className="flex items-center gap-1 truncate max-w-[150px]">
                            <Mail size={12} className="text-slate-500" />
                            {request.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <FileText size={14} className="text-cyan-400" />
                      <span>Description du besoin</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                      {request.description || "Aucune description fournie."}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Action Buttons: Kaybano Ghir Mni Katkon Demande "pending" */}
                  {isPending && (
                    <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-slate-800/80">
                      <button
                        onClick={() => handleStatusChange(request.id, "accepted")}
                        disabled={isActionLoading}
                        className="flex items-center justify-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-semibold py-2 px-3 rounded-xl text-xs transition active:scale-95 disabled:opacity-50"
                      >
                        {isActionLoading ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                        <span>Accepter</span>
                      </button>

                      <button
                        onClick={() => handleStatusChange(request.id, "cancelled")}
                        disabled={isActionLoading}
                        className="flex items-center justify-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 font-semibold py-2 px-3 rounded-xl text-xs transition active:scale-95 disabled:opacity-50"
                      >
                        {isActionLoading ? <RefreshCw size={14} className="animate-spin" /> : <X size={14} />}
                        <span>Refuser</span>
                      </button>
                    </div>
                  )}

                  {/* Dates Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                    {request.scheduled_date && (
                      <div className="flex items-center gap-1.5 text-cyan-300">
                        <Calendar size={14} className="text-cyan-400" />
                        <span>Prévu le: {new Date(request.scheduled_date).toLocaleDateString("fr-FR")}</span>
                      </div>
                    )}

                    {(request.created_at || request.request_date) && (
                      <div className="flex items-center gap-1.5 text-slate-500 ml-auto">
                        <Clock size={13} />
                        <span>Demandé le: {new Date(request.created_at || request.request_date).toLocaleDateString("fr-FR")}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}