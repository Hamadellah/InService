import React, { useEffect, useState } from "react";
import { useServiceRequest } from "../../hooks/useservicerequest";
import { useMessage } from "../../hooks/usemessage"; 
import { 
  Calendar, Clock, Mail, Phone, MapPin, 
  User, AlertCircle, Loader2, CheckCircle2, XCircle, PlayCircle, MessageSquare,
  X, Send, Trash2, RotateCw, Hourglass
} from "lucide-react";

export default function Demandesc() {

  // Hooks
  const {
    getclientdemande,
    demandes,
    loading: loadingDemandes,
    deleteServiceRequest
  } = useServiceRequest();

  const {
    sendMessage,
    loading: sendingMessage
  } = useMessage();


  // States
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  const [cancelingId, setCancelingId] = useState(null);


  // Charger les demandes au démarrage
  useEffect(() => {
    getclientdemande();
  }, []);


  // Transformer demandes en tableau
  let demandesList = [];

  if (Array.isArray(demandes)) {
    demandesList = demandes;
  } else if (demandes) {
    demandesList = [demandes];
  }


  // Ouvrir modal
  const handleOpenContactModal = (item) => {

    setSelectedTechnician(item);

    setMessageContent("");
    setSendSuccess(false);
    setSendError("");
  };


  // Fermer modal
  const handleCloseModal = () => {

    setSelectedTechnician(null);

    setMessageContent("");
    setSendSuccess(false);
    setSendError("");
  };


  // Envoyer message
  const handleSendMessageSubmit = async (e) => {

    e.preventDefault();

    if (!messageContent.trim()) {
      return;
    }

    if (!selectedTechnician) {
      return;
    }

    setSendError("");

    try {

      const response = await sendMessage(
        selectedTechnician.id,
        {
          message: messageContent
        }
      );

      if (response) {

        setSendSuccess(true);

        setTimeout(() => {
          handleCloseModal();
        }, 1500);

      } else {

        setSendError(
          "Une erreur est survenue lors de l'envoi du message."
        );
      }

    } catch (error) {

      console.log(error);

      setSendError(
        "Impossible d'envoyer le message. Veuillez réessayer."
      );
    }
  };


  // Annuler une demande
  const handleCancelDemande = async (requestId) => {

    const confirmation = window.confirm(
      "Voulez-vous vraiment annuler cette demande ?"
    );

    if (!confirmation) {
      return;
    }

    setCancelingId(requestId);

    try {

      await deleteServiceRequest(requestId);

      await getclientdemande();

    } catch (error) {

      console.log(error);

    } finally {

      setCancelingId(null);
    }
  };


  // Afficher le statut
  const getStatusBadge = (status) => {

    const currentStatus = status?.toLowerCase();


    // En cours
    if (
      currentStatus === "in_progress" ||
      currentStatus === "in-progress" ||
      currentStatus === "accepted" ||
      currentStatus === "accepté"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <PlayCircle
            size={13}
            className="text-emerald-600"
          />
          En cours
        </span>
      );
    }


    // Terminée
    if (
      currentStatus === "completed" ||
      currentStatus === "terminé"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <CheckCircle2
            size={13}
            className="text-emerald-600"
          />
          Terminée
        </span>
      );
    }


    // Annulée
    if (
      currentStatus === "cancelled" ||
      currentStatus === "annulé" ||
      currentStatus === "refused"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
          <XCircle
            size={13}
            className="text-red-500"
          />
          Annulée
        </span>
      );
    }


    // En attente
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
        <Hourglass
          size={13}
          className="text-amber-500"
        />
        En attente
      </span>
    );
  };


  // Nombre des demandes en attente
  const pendingCount = demandesList.filter((item) => {

    const status = item.status?.toLowerCase();

    return (
      !status ||
      status === "pending" ||
      status === "en_attente" ||
      status === "en attente"
    );

  }).length;


  // Nombre des demandes en cours
  const progressCount = demandesList.filter((item) => {

    const status = item.status?.toLowerCase();

    return (
      status === "in_progress" ||
      status === "in-progress" ||
      status === "accepted" ||
      status === "accepté"
    );

  }).length;


  // Nombre des demandes terminées
  const completedCount = demandesList.filter((item) => {

    const status = item.status?.toLowerCase();

    return (
      status === "completed" ||
      status === "terminé"
    );

  }).length;

  return (
    <div className="min-h-full bg-[#f5f7f6] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        <section className="relative overflow-hidden rounded-[32px] bg-[#0d1f1a] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-[30%] h-40 w-40 rounded-full bg-emerald-300/5 blur-2xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">
                  Espace Client
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                Suivez vos
                <span className="block text-emerald-400">interventions.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Retrouvez toutes vos demandes, consultez leur statut et contactez
                facilement votre technicien lorsqu'une intervention est acceptée.
              </p>
            </div>

            <button
              onClick={() => getclientdemande()}
              disabled={loadingDemandes}
              className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-2xl border border-white/10 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/15 disabled:opacity-50 lg:self-auto"
            >
              <RotateCw
                size={17}
                className={loadingDemandes ? "animate-spin text-emerald-400" : "text-emerald-400"}
              />
              Actualiser
            </button>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Total demandes
                </p>
                <p className="mt-2 text-3xl font-black text-[#0d1f1a]">{demandesList.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Calendar size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  En attente
                </p>
                <p className="mt-2 text-3xl font-black text-[#0d1f1a]">{pendingCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Hourglass size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  En cours
                </p>
                <p className="mt-2 text-3xl font-black text-[#0d1f1a]">{progressCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <PlayCircle size={20} />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[26px] bg-emerald-400 p-5 text-[#0d1f1a] shadow-[0_14px_35px_rgba(16,185,129,0.18)]">
            <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-white/15" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-950/60">
                  Terminées
                </p>
                <p className="mt-2 text-3xl font-black">{completedCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2">
              <Calendar size={14} className="text-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                Mes interventions
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-[#0d1f1a]">
              Demandes récentes
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Consultez les informations et l'avancement de chaque demande.
            </p>
          </div>

          {loadingDemandes && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-[355px] animate-pulse rounded-[30px] border border-slate-200 bg-white p-5"
                >
                  <div className="flex gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-slate-100" />
                    <div className="flex-1 space-y-2 pt-2">
                      <div className="h-4 w-1/2 rounded bg-slate-100" />
                      <div className="h-3 w-1/3 rounded bg-slate-100" />
                    </div>
                  </div>
                  <div className="mt-6 h-24 rounded-2xl bg-slate-100" />
                  <div className="mt-5 h-12 rounded-2xl bg-slate-100" />
                </div>
              ))}
            </div>
          )}

          {!loadingDemandes && demandesList.length === 0 && (
            <div className="rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Calendar size={26} />
              </div>
              <h3 className="mt-4 text-lg font-black text-[#0d1f1a]">
                Aucune demande
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Vous n'avez pas encore effectué de demande de service.
              </p>
            </div>
          )}

          {!loadingDemandes && demandesList.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {demandesList.map((item, index) => {
                const statusLower = item.status?.toLowerCase();
                const isInProgress =
                  statusLower === "in_progress" ||
                  statusLower === "in-progress" ||
                  statusLower === "accepted" ||
                  statusLower === "accepté";

                const isPending =
                  !statusLower ||
                  statusLower === "pending" ||
                  statusLower === "en_attente" ||
                  statusLower === "en attente";

                return (
                  <article
                    key={item.id}
                    className="group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)]"
                  >
                    <span className="pointer-events-none absolute -right-2 top-14 text-[88px] font-black leading-none text-slate-50">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300">
                              <User size={21} />
                            </div>
                          )}

                          <div className="min-w-0">
                            <h3 className="truncate text-base font-black text-[#0d1f1a]">
                              {item.name || "Technicien"}
                            </h3>
                            {item.city && (
                              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">
                                <MapPin size={12} />
                                <span className="truncate">{item.city}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0">{getStatusBadge(item.status)}</div>
                      </div>

                      <div className="mt-5 space-y-2 rounded-2xl bg-[#f7f9f8] p-4">
                        {item.email && (
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Mail size={14} className="shrink-0 text-emerald-600" />
                            <span className="truncate">{item.email}</span>
                          </div>
                        )}

                        {item.phone && (
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Phone size={14} className="shrink-0 text-emerald-600" />
                            <span>{item.phone}</span>
                          </div>
                        )}

                        {item.description && (
                          <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-6 text-slate-600">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-slate-100 bg-white p-3">
                          <div className="mb-1 flex items-center gap-1.5 text-slate-400">
                            <Calendar size={11} />
                            <span className="text-[9px] font-black uppercase tracking-[0.12em]">
                              Demandé le
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-700">
                            {item.request_date || "N/A"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
                          <div className="mb-1 flex items-center gap-1.5 text-emerald-600">
                            <Clock size={11} />
                            <span className="text-[9px] font-black uppercase tracking-[0.12em]">
                              Prévu le
                            </span>
                          </div>
                          <p className="text-xs font-bold text-emerald-800">
                            {item.scheduled_date || "N/A"}
                          </p>
                        </div>
                      </div>

                      {isInProgress && (
                        <button
                          onClick={() => handleOpenContactModal(item)}
                          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#0d1f1a] text-xs font-black text-white transition hover:bg-[#143128] active:scale-[0.98]"
                        >
                          <MessageSquare size={15} className="text-emerald-400" />
                          Contacter le technicien
                        </button>
                      )}

                      {isPending && (
                        <button
                          onClick={() => handleCancelDemande(item.id)}
                          disabled={cancelingId === item.id}
                          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 text-xs font-black text-rose-600 transition hover:bg-rose-100 active:scale-[0.98] disabled:opacity-50"
                        >
                          {cancelingId === item.id ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                          Annuler la demande
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {selectedTechnician && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07110e]/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              <div className="relative overflow-hidden bg-[#0d1f1a] px-6 py-6">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-400/10" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-emerald-400">
                      <MessageSquare size={14} />
                      <span className="text-[9px] font-black uppercase tracking-[0.18em]">
                        Messagerie
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white">
                      Contacter {selectedTechnician.name || "le technicien"}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Demande #{selectedTechnician.id}
                    </p>
                  </div>

                  <button
                    onClick={handleCloseModal}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/15 hover:text-white"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {sendSuccess ? (
                <div className="p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={25} />
                  </div>
                  <h4 className="mt-4 text-lg font-black text-[#0d1f1a]">
                    Message envoyé !
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">
                    Votre message a été transmis avec succès au technicien.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessageSubmit} className="space-y-5 p-6">
                  {sendError && (
                    <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                      <AlertCircle size={15} />
                      {sendError}
                    </div>
                  )}

                  <div className="flex flex-col gap-2 rounded-2xl bg-[#f7f9f8] p-4 text-xs sm:flex-row sm:items-center sm:justify-between">
                    <span className="flex items-center gap-2 font-bold text-slate-800">
                      <User size={14} className="text-emerald-600" />
                      {selectedTechnician.name}
                    </span>

                    {selectedTechnician.phone && (
                      <a
                        href={`tel:${selectedTechnician.phone}`}
                        className="flex items-center gap-1 font-bold text-emerald-700"
                      >
                        <Phone size={13} />
                        {selectedTechnician.phone}
                      </a>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-black text-slate-700">
                      Votre message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="Écrivez votre message ici..."
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-[#f7f9f8] p-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/10"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="h-11 rounded-2xl px-5 text-xs font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                      Annuler
                    </button>

                    <button
                      type="submit"
                      disabled={sendingMessage || !messageContent.trim()}
                      className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 text-xs font-black text-[#0d1f1a] transition hover:bg-emerald-300 disabled:opacity-50"
                    >
                      {sendingMessage ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Send size={14} />
                      )}
                      Envoyer
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
