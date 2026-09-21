import React, { useEffect, useState } from "react";
import { useServiceRequest } from "../../hooks/useservicerequest";
import { useMessage } from "../../hooks/usemessage"; // Import dyal l-hook dyal messages
import { 
  Calendar, Clock, Mail, Phone, MapPin, 
  User, AlertCircle, Loader2, CheckCircle2, XCircle, PlayCircle, MessageSquare,
  X, Send, Trash2
} from "lucide-react";

export default function Demandesc() {
  // Zdna cancelDemande (wla deleteDemande) mn useServiceRequest
  const { getclientdemande, demandes, loading: loadingDemandes, cancelDemande } = useServiceRequest();
  const { sendMessage, loading: sendingMessage } = useMessage();

  // State l-modal dyal contact
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  // State l-loading dyal annuler demande
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

  // Fonction dyal l-annulation
  const handleCancelDemande = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette demande ?")) return;

    setCancelingId(id);
    try {
      if (cancelDemande) {
        await cancelDemande(id);
        // Re-fetch des demandes
        getclientdemande();
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <PlayCircle size={14} /> En cours
          </span>
        );
      case "completed":
      case "terminé":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={14} /> Terminée
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

  if (loadingDemandes) {
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
            Mes Demandes d'Intervention
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
          {demandesList.map((item) => {
            const statusLower = item.status?.toLowerCase();
            const isInProgress = statusLower === "in_progress" || statusLower === "in-progress" || statusLower === "accepted" || statusLower === "accepté";
            
            // Check ila kanet la demande en attente
            const isPending = !statusLower || statusLower === "pending" || statusLower === "en_attente" || statusLower === "en attente";

            return (
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

                <div>
                  {/* Action Contact Button (si in_progress) */}
                  {isInProgress && (
                    <div className="mb-3 pt-2">
                      <button
                        onClick={() => handleOpenContactModal(item)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 hover:text-white font-medium py-2.5 px-4 rounded-xl text-xs transition-all duration-200 active:scale-95 shadow-md shadow-cyan-500/5"
                      >
                        <MessageSquare size={15} />
                        <span>Contacter le technicien</span>
                      </button>
                    </div>
                  )}

                  {/* Action Annuler Button (si en attente) */}
                  {isPending && (
                    <div className="mb-3 pt-2">
                      <button
                        onClick={() => handleCancelDemande(item.id)}
                        disabled={cancelingId === item.id}
                        className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 font-medium py-2.5 px-4 rounded-xl text-xs transition-all duration-200 active:scale-95 shadow-md shadow-rose-500/5 disabled:opacity-50"
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
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
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
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Contact Form avec useMessage */}
      {selectedTechnician && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">
                    Contacter {selectedTechnician.name || "le technicien"}
                  </h3>
                  <p className="text-xs text-slate-400">Demande #{selectedTechnician.id}</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            {sendSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-lg font-semibold text-white">Message envoyé !</h4>
                <p className="text-xs text-slate-400">
                  Votre message a été transmis avec succès au technicien.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessageSubmit} className="p-6 space-y-4">
                {sendError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>{sendError}</span>
                  </div>
                )}

                {/* Tech Quick Details */}
                <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <User size={14} className="text-cyan-400" />
                    {selectedTechnician.name}
                  </span>
                  {selectedTechnician.phone && (
                    <a
                      href={`tel:${selectedTechnician.phone}`}
                      className="flex items-center gap-1 text-cyan-400 hover:underline"
                    >
                      <Phone size={13} />
                      {selectedTechnician.phone}
                    </a>
                  )}
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Votre message :
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Ecrivez votre message ici..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition resize-none"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-medium transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={sendingMessage || !messageContent.trim()}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/10 transition active:scale-95 disabled:opacity-50"
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
  );
}