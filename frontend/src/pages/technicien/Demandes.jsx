import React, { useEffect, useState } from "react";
import { useServiceRequest } from "../../hooks/useservicerequest";
import { 
  Clock, 
  Calendar, 
  FileText, 
  AlertCircle, 
  RotateCw, 
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

  // Helper Badge dyal Status
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-700">
            <Hourglass size={13} className="text-amber-500" />
            En attente
          </span>
        );
      case "accepted":
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700">
            <PlayCircle size={13} className="text-blue-600" />
            En cours
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
            <CheckCircle2 size={13} className="text-emerald-600" />
            Terminé
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 border border-red-200 text-red-700">
            <XCircle size={13} className="text-red-500" />
            Refusé
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-600">
            {status || "Inconnu"}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP BAR / HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Suivi des Interventions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Gestion des Demandes
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Gérez et répondez aux demandes d'intervention reçues.
            </p>
          </div>

          <button
            onClick={getServiceRequests}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/80 transition active:scale-95 disabled:opacity-50 self-start md:self-center flex items-center gap-2 text-xs font-semibold"
            title="Rafraîchir"
          >
            <RotateCw size={18} className={loading ? "animate-spin text-blue-600" : ""} />
            <span>Actualiser</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-3">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-white border border-slate-200 animate-pulse p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                  </div>
                </div>
                <div className="h-12 bg-slate-100 rounded-xl"></div>
                <div className="h-10 bg-slate-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && serviceRequest && serviceRequest.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm space-y-2">
            <AlertCircle size={36} className="mx-auto text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900">Aucune demande trouvée</h3>
            <p className="text-xs text-slate-500">Vous n'avez pas encore reçu de demande d'intervention.</p>
          </div>
        )}

        {/* Requests List */}
        {!loading && serviceRequest && serviceRequest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {serviceRequest.map((request) => {
              const isPending = request.status === "pending";
              const isInProgress = request.status === "in_progress" || request.status === "accepted";
              const isActionLoading = updatingId === request.id;

              return (
                <div
                  key={request.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-4">
                    
                    {/* Top Info Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                          Demande #{request.id}
                        </span>
                        {request.service_id && (
                          <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 font-medium flex items-center gap-1">
                            <Tag size={10} /> Service #{request.service_id}
                          </span>
                        )}
                      </div>
                      {getStatusBadge(request.status)}
                    </div>

                    {/* User Info Card */}
                    <div className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg overflow-hidden">
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
                        <h3 className="font-bold text-slate-900 text-sm truncate">
                          {request.name || "Client"}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          {request.phone && (
                            <span className="flex items-center gap-1">
                              <Phone size={12} className="text-slate-400" />
                              {request.phone}
                            </span>
                          )}
                          {request.city && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} className="text-slate-400" />
                              {request.city}
                            </span>
                          )}
                          {request.email && (
                            <span className="flex items-center gap-1 truncate max-w-[150px]">
                              <Mail size={12} className="text-slate-400" />
                              {request.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <FileText size={14} className="text-blue-600" />
                        <span>Description du besoin</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {request.description || "Aucune description fournie."}
                      </p>
                    </div>
                  </div>

                  <div>
                    {/* Actions for Pending Status */}
                    {isPending && (
                      <div className="grid grid-cols-2 gap-3 pt-4 mt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleStatusChange(request.id, "in_progress")}
                          disabled={isActionLoading}
                          className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition active:scale-95 disabled:opacity-50 shadow-sm"
                        >
                          {isActionLoading ? <RotateCw size={14} className="animate-spin" /> : <Check size={14} />}
                          <span>Accepter</span>
                        </button>

                        <button
                          onClick={() => handleStatusChange(request.id, "cancelled")}
                          disabled={isActionLoading}
                          className="flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-semibold py-2 px-3 rounded-xl text-xs transition active:scale-95 disabled:opacity-50"
                        >
                          {isActionLoading ? <RotateCw size={14} className="animate-spin" /> : <X size={14} />}
                          <span>Refuser</span>
                        </button>
                      </div>
                    )}

                    {/* Action for In Progress Status */}
                    {isInProgress && (
                      <div className="pt-4 mt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleStatusChange(request.id, "completed")}
                          disabled={isActionLoading}
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition active:scale-95 disabled:opacity-50 shadow-sm"
                        >
                          {isActionLoading ? <RotateCw size={14} className="animate-spin" /> : <CheckCircle2 size={15} />}
                          <span>Marquer le service comme terminé</span>
                        </button>
                      </div>
                    )}

                    {/* Dates Footer */}
                    <div className="pt-4 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 font-medium">
                      {request.scheduled_date && (
                        <div className="flex items-center gap-1.5 text-blue-600 font-semibold">
                          <Calendar size={13} />
                          <span>Prévu le: {new Date(request.scheduled_date).toLocaleDateString("fr-FR")}</span>
                        </div>
                      )}

                      {(request.created_at || request.request_date) && (
                        <div className="flex items-center gap-1.5 text-slate-400 ml-auto">
                          <Clock size={12} />
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
    </div>
  );
}