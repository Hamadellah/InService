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
  PlayCircle,
  ClipboardList,
  Activity,
  Inbox,
  ArrowRight
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
        await updateServiceRequestStatus(requestId, {
          status: newStatus
        });
      }

      await getServiceRequests();
    } catch (err) {
      console.error(
        "Erreur lors du changement de statut:",
        err
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const requestsList = Array.isArray(serviceRequest)
    ? serviceRequest
    : serviceRequest?.data || [];

  const pendingCount = requestsList.filter(
    (request) => request.status === "pending"
  ).length;

  const progressCount = requestsList.filter(
    (request) =>
      request.status === "in_progress" ||
      request.status === "accepted"
  ).length;

  const completedCount = requestsList.filter(
    (request) => request.status === "completed"
  ).length;

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-amber-700">
            <Hourglass size={12} />
            En attente
          </span>
        );

      case "accepted":
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-blue-700">
            <PlayCircle size={12} />
            En cours
          </span>
        );

      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-emerald-700">
            <CheckCircle2 size={12} />
            Terminé
          </span>
        );

      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-red-600">
            <XCircle size={12} />
            Refusé
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-slate-600">
            {status || "Inconnu"}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] text-slate-900">
      <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[32px] bg-[#0d1f1a] px-6 py-8 sm:px-8 lg:px-10">

          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-[30%] h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-2xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">

                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/70">
                  Suivi des interventions
                </span>

              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Gestion des
                <span className="text-emerald-400">
                  {" "}demandes.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Consultez les nouvelles demandes, acceptez les
                interventions et suivez leur progression jusqu'à
                leur finalisation.
              </p>

            </div>

            <button
              onClick={getServiceRequests}
              disabled={loading}
              className="group flex h-12 w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-bold text-white transition hover:bg-white/10 disabled:opacity-50"
            >
              <RotateCw
                size={17}
                className={
                  loading
                    ? "animate-spin text-emerald-400"
                    : "transition-transform duration-500 group-hover:rotate-180"
                }
              />

              Actualiser
            </button>

          </div>
        </section>

        {/* STATS */}
        <section className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* TOTAL */}
          <div className="col-span-2 rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)] sm:col-span-1">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  Total demandes
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight">
                  {requestsList.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <ClipboardList size={19} />
              </div>

            </div>

          </div>

          {/* PENDING */}
          <div className="rounded-[24px] border border-amber-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  En attente
                </p>

                <p className="mt-2 text-3xl font-black text-amber-600">
                  {pendingCount}
                </p>
              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 sm:flex">
                <Hourglass size={18} />
              </div>

            </div>

          </div>

          {/* IN PROGRESS */}
          <div className="rounded-[24px] border border-blue-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  En cours
                </p>

                <p className="mt-2 text-3xl font-black text-blue-600">
                  {progressCount}
                </p>
              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                <Activity size={18} />
              </div>

            </div>

          </div>

          {/* COMPLETED */}
          <div className="relative overflow-hidden rounded-[24px] bg-emerald-400 p-5 shadow-[0_8px_30px_rgba(16,185,129,0.15)]">

            <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full border-[18px] border-white/10" />

            <div className="relative flex items-center justify-between">

              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-950/60">
                  Terminées
                </p>

                <p className="mt-2 text-3xl font-black text-[#0d1f1a]">
                  {completedCount}
                </p>

              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300 sm:flex">
                <CheckCircle2 size={18} />
              </div>

            </div>

          </div>

        </section>

        {/* ERROR */}
        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-[20px] border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <AlertCircle size={17} />
            </div>

            <div>
              <p className="font-bold">
                Impossible de récupérer les demandes
              </p>

              <p className="mt-1 text-xs text-red-500">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* CONTENT HEADER */}
        <section className="mt-9">

          <div className="mb-6">

            <div className="mb-2 flex items-center gap-2">

              <ClipboardList
                size={16}
                className="text-emerald-600"
              />

              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                Interventions
              </span>

            </div>

            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Demandes reçues
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Gérez les demandes envoyées par vos clients.
            </p>

          </div>

          {/* LOADING */}
          {loading && (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-[360px] animate-pulse rounded-[28px] border border-slate-200 bg-white p-6"
                >

                  <div className="flex justify-between">

                    <div className="h-7 w-28 rounded-full bg-slate-100" />

                    <div className="h-7 w-24 rounded-full bg-slate-100" />

                  </div>

                  <div className="mt-6 flex items-center gap-3">

                    <div className="h-12 w-12 rounded-2xl bg-slate-100" />

                    <div className="space-y-2">
                      <div className="h-4 w-32 rounded bg-slate-100" />
                      <div className="h-3 w-24 rounded bg-slate-100" />
                    </div>

                  </div>

                  <div className="mt-7 h-24 rounded-2xl bg-slate-100" />

                  <div className="mt-6 h-11 rounded-xl bg-slate-100" />

                </div>
              ))}

            </div>
          )}

          {/* EMPTY */}
          {!loading && requestsList.length === 0 && (
            <div className="relative overflow-hidden rounded-[32px] border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

              <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-100/60 blur-3xl" />

              <div className="relative">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#0d1f1a] text-emerald-300 shadow-lg">
                  <Inbox size={27} />
                </div>

                <h3 className="mt-5 text-lg font-black text-slate-900">
                  Aucune demande
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Vous n'avez pas encore reçu de demande
                  d'intervention.
                </p>

              </div>

            </div>
          )}

          {/* REQUESTS */}
          {!loading && requestsList.length > 0 && (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              {requestsList.map((request, index) => {
                const isPending =
                  request.status === "pending";

                const isInProgress =
                  request.status === "in_progress" ||
                  request.status === "accepted";

                const isActionLoading =
                  updatingId === request.id;

                return (
                  <article
                    key={request.id}
                    className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                  >

                    {/* BACKGROUND NUMBER */}
                    <span className="pointer-events-none absolute -right-1 top-16 text-[90px] font-black leading-none text-slate-50 transition-colors group-hover:text-emerald-50">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* TOP */}
                    <div className="relative flex flex-wrap items-center justify-between gap-3">

                      <div className="flex flex-wrap items-center gap-2">

                        <div className="rounded-full bg-[#0d1f1a] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white">
                          Demande #{request.id}
                        </div>

                        {request.service_id && (
                          <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500">
                            <Tag size={10} />
                            Service #{request.service_id}
                          </div>
                        )}

                      </div>

                      {getStatusBadge(request.status)}

                    </div>

                    {/* CLIENT */}
                    <div className="relative mt-6 flex items-center gap-4">

                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[18px] bg-[#0d1f1a] text-emerald-300">

                        {request.image ? (
                          <img
                            src={request.image}
                            alt={request.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <User size={22} />
                        )}

                        <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-[#0d1f1a] bg-emerald-400" />

                      </div>

                      <div className="min-w-0">

                        <p className="mb-1 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                          Client
                        </p>

                        <h3 className="truncate text-base font-black text-slate-900">
                          {request.name || "Client"}
                        </h3>

                      </div>

                    </div>

                    {/* CONTACT */}
                    <div className="relative mt-5 flex flex-wrap gap-2">

                      {request.phone && (
                        <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">

                          <Phone
                            size={13}
                            className="text-emerald-600"
                          />

                          {request.phone}

                        </div>
                      )}

                      {request.city && (
                        <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">

                          <MapPin
                            size={13}
                            className="text-emerald-600"
                          />

                          {request.city}

                        </div>
                      )}

                      {request.email && (
                        <div className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">

                          <Mail
                            size={13}
                            className="shrink-0 text-emerald-600"
                          />

                          <span className="max-w-[200px] truncate">
                            {request.email}
                          </span>

                        </div>
                      )}

                    </div>

                    {/* DESCRIPTION */}
                    <div className="relative mt-6">

                      <div className="mb-2 flex items-center gap-2">

                        <FileText
                          size={14}
                          className="text-emerald-600"
                        />

                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                          Description du besoin
                        </p>

                      </div>

                      <div className="relative rounded-[20px] border border-slate-100 bg-[#f8faf9] p-4">

                        <div className="absolute left-0 top-4 h-8 w-[3px] rounded-r-full bg-emerald-400" />

                        <p className="pl-2 text-sm leading-6 text-slate-600">
                          {request.description ||
                            "Aucune description fournie."}
                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="relative mt-6 border-t border-slate-100 pt-5">

                      {isPending && (
                        <div className="grid grid-cols-2 gap-3">

                          <button
                            onClick={() =>
                              handleStatusChange(
                                request.id,
                                "in_progress"
                              )
                            }
                            disabled={isActionLoading}
                            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 text-xs font-black text-[#0d1f1a] transition hover:-translate-y-0.5 hover:bg-emerald-300 disabled:opacity-50"
                          >

                            {isActionLoading ? (
                              <RotateCw
                                size={14}
                                className="animate-spin"
                              />
                            ) : (
                              <Check size={15} />
                            )}

                            Accepter

                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(
                                request.id,
                                "cancelled"
                              )
                            }
                            disabled={isActionLoading}
                            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 text-xs font-black text-red-600 transition hover:-translate-y-0.5 hover:bg-red-100 disabled:opacity-50"
                          >

                            {isActionLoading ? (
                              <RotateCw
                                size={14}
                                className="animate-spin"
                              />
                            ) : (
                              <X size={15} />
                            )}

                            Refuser

                          </button>

                        </div>
                      )}

                      {isInProgress && (
                        <button
                          onClick={() =>
                            handleStatusChange(
                              request.id,
                              "completed"
                            )
                          }
                          disabled={isActionLoading}
                          className="group/complete flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0d1f1a] px-4 text-xs font-black text-white transition hover:bg-emerald-700 disabled:opacity-50"
                        >

                          {isActionLoading ? (
                            <RotateCw
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <CheckCircle2
                              size={16}
                              className="text-emerald-400"
                            />
                          )}

                          Marquer le service comme terminé

                          {!isActionLoading && (
                            <ArrowRight
                              size={14}
                              className="transition-transform group-hover/complete:translate-x-1"
                            />
                          )}

                        </button>
                      )}

                    </div>

                    {/* DATES */}
                    <div className="relative mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                      {request.scheduled_date && (
                        <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-700">

                          <Calendar size={13} />

                          <span>
                            Prévu le{" "}
                            {new Date(
                              request.scheduled_date
                            ).toLocaleDateString("fr-FR")}
                          </span>

                        </div>
                      )}

                      {(request.created_at ||
                        request.request_date) && (
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">

                          <Clock size={12} />

                          <span>
                            Demandé le{" "}
                            {new Date(
                              request.created_at ||
                                request.request_date
                            ).toLocaleDateString("fr-FR")}
                          </span>

                        </div>
                      )}

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        </section>

      </div>
    </div>
  );
}