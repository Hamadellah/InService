import React, { useEffect, useState } from "react";
import { useServiceRequest } from "../../hooks/useservicerequest";
import { useMessage } from "../../hooks/usemessage"; 
import { 
  Calendar, Clock, Mail, Phone, MapPin, 
  User, AlertCircle, Loader2, CheckCircle2, XCircle, PlayCircle, MessageSquare,
  X, Send, Trash2, RotateCw, Hourglass
} from "lucide-react";

export default function Demandesc() {
  const { 
    getclientdemande, 
    demandes, 
    loading: loadingDemandes, 
    deleteServiceRequest 
  } = useServiceRequest();

  const { sendMessage, loading: sendingMessage } = useMessage();

  // State modal de contact
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  // State loading annulation demande
  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    getclientdemande();
  }, []);

  const demandesList = Array.isArray(demandes) ? demandes : demandes ? [demandes] : [];

  const handleOpenContactModal = (item) => {
    setSelectedTechnician(item);
    setMessageContent("");
    setSendSuccess(false);
    setSendError("");
  };

  const handleCloseModal = () => {
    setSelectedTechnician(null);
    setMessageContent("");
    setSendSuccess(false);
    setSendError("");
  };

  const handleSendMessageSubmit = async (e) => {
    e.preventDefault();
    if (!messageContent.trim() || !selectedTechnician) return;

    setSendError("");
    try {
      const res = await sendMessage(selectedTechnician.id, { 
        message: messageContent 
      });

      if (res) {
        setSendSuccess(true);
        setTimeout(() => {
          handleCloseModal();
        }, 1500);
      } else {
        setSendError("Une erreur est survenue lors de l'envoi du message.");
      }
    } catch (err) {
      console.error("Erreur envoi message:", err);
      setSendError("Impossible d'envoyer le message. Veuillez réessayer.");
    }
  };

  const handleCancelDemande = async (requestId) => {
    if (!window.confirm("Voulez-vous vraiment annuler cette demande ?")) return;

    setCancelingId(requestId);
    try {
      if (deleteServiceRequest) {
        await deleteServiceRequest(requestId);
        await getclientdemande();
      }
    } catch (err) {
      console.error("Erreur lors de l'annulation:", err);
    } finally {
      setCancelingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "in_progress":
      case "in-progress":
      case "accepted":
      case "accepté":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700">
            <PlayCircle size={13} className="text-blue-600" />
            En cours
          </span>
        );
      case "completed":
      case "terminé":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
            <CheckCircle2 size={13} className="text-emerald-600" />
            Terminée
          </span>
        );
      case "cancelled":
      case "annulé":
      case "refused":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 border border-red-200 text-red-700">
            <XCircle size={13} className="text-red-500" />
            Annulée
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-700">
            <Hourglass size={13} className="text-amber-500" />
            En attente
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
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Demandes d'Intervention</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2.5">
              Mes Demandes
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Suivez l'état de vos demandes auprès des techniciens.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={() => getclientdemande()}
              disabled={loadingDemandes}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/80 transition active:scale-95 disabled:opacity-50 flex items-center gap-2 text-xs font-semibold"
              title="Rafraîchir"
            >
              <RotateCw size={16} className={loadingDemandes ? "animate-spin text-blue-600" : ""} />
              <span>Actualiser</span>
            </button>
            <div className="bg-blue-50 border border-blue-100 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-700">
              Total demandes: <span className="font-bold">{demandesList.length}</span>
            </div>
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loadingDemandes && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-white border border-slate-200 animate-pulse p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-16 bg-slate-100 rounded-xl"></div>
                <div className="h-10 bg-slate-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loadingDemandes && demandesList.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm space-y-2">
            <AlertCircle size={36} className="mx-auto text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900">Aucune demande trouvée</h3>
            <p className="text-xs text-slate-500">Vous n'avez pas encore effectué de demandes de services.</p>
          </div>
        )}

        {/* CONTENT GRID */}
        {!loadingDemandes && demandesList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {demandesList.map((item) => {
              const statusLower = item.status?.toLowerCase();
              const isInProgress = statusLower === "in_progress" || statusLower === "in-progress" || statusLower === "accepted" || statusLower === "accepté";
              const isPending = !statusLower || statusLower === "pending" || statusLower === "en_attente" || statusLower === "en attente";

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-4">
                    {/* Header Item */}
                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                            <User size={20} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900 text-sm truncate">
                            {item.name || "Technicien"}
                          </h3>
                          {item.city && (
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin size={12} className="text-slate-400 shrink-0" />
                              <span className="truncate">{item.city}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      <div>{getStatusBadge(item.status)}</div>
                    </div>

                    {/* Info Card */}
                    <div className="space-y-2 text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      {item.email && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail size={14} className="text-blue-600 shrink-0" />
                          <span className="truncate">{item.email}</span>
                        </div>
                      )}
                      {item.phone && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone size={14} className="text-blue-600 shrink-0" />
                          <span>{item.phone}</span>
                        </div>
                      )}
                      {item.description && (
                        <p className="text-slate-600 text-xs mt-2 pt-2 border-t border-slate-200/60 line-clamp-3">
                          <span className="text-slate-400 font-medium">Message: </span>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    {/* Action Contact Button (si in_progress) */}
                    {isInProgress && (
                      <div className="pt-2 mb-3">
                        <button
                          onClick={() => handleOpenContactModal(item)}
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition active:scale-95 shadow-sm"
                        >
                          <MessageSquare size={15} />
                          <span>Contacter le technicien</span>
                        </button>
                      </div>
                    )}

                    {/* Action Annuler Button (si en attente) */}
                    {isPending && (
                      <div className="pt-2 mb-3">
                        <button
                          onClick={() => handleCancelDemande(item.id)}
                          disabled={cancelingId === item.id}
                          className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-semibold py-2.5 px-4 rounded-xl text-xs transition active:scale-95 disabled:opacity-50"
                        >
                          {cancelingId === item.id ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                          <span>Annuler la demande</span>
                        </button>
                      </div>
                    )}

                    {/* Dates Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Demandé le</span>
                        <span className="text-slate-700">{item.request_date || "N/A"}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Prévu le</span>
                        <span className="text-blue-600 font-semibold">{item.scheduled_date || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL CONTACT */}
        {selectedTechnician && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-xl relative space-y-0">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Contacter {selectedTechnician.name || "le technicien"}
                    </h3>
                    <p className="text-xs text-slate-500">Demande #{selectedTechnician.id}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              {sendSuccess ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Message envoyé !</h4>
                  <p className="text-xs text-slate-500">
                    Votre message a été transmis avec succès au technicien.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessageSubmit} className="p-6 space-y-4">
                  {sendError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs flex items-center gap-2">
                      <AlertCircle size={15} />
                      <span>{sendError}</span>
                    </div>
                  )}

                  {/* Tech Quick Details */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <User size={14} className="text-blue-600" />
                      {selectedTechnician.name}
                    </span>
                    {selectedTechnician.phone && (
                      <a
                        href={`tel:${selectedTechnician.phone}`}
                        className="flex items-center gap-1 text-blue-600 hover:underline font-medium"
                      >
                        <Phone size={13} />
                        {selectedTechnician.phone}
                      </a>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Votre message :
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="Écrivez votre message ici..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 transition resize-none"
                    ></textarea>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={sendingMessage || !messageContent.trim()}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition active:scale-95 disabled:opacity-50"
                    >
                      {sendingMessage ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Send size={14} />
                      )}
                      <span>Envoyer</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}