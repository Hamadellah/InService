
import React, { useEffect, useState } from "react";
import { useMessage } from "../../hooks/usemessage";

import {
  MessageSquare,
  User,
  Phone,
  MessageCircle,
  RotateCw,
  Search,
  Clock,
  MapPin,
  AlertCircle,
  Inbox,
  MessagesSquare,
  ArrowUpRight,
  Sparkles,
  Radio
} from "lucide-react";

export default function MessageTechnicien() {
  const { messages, loading, getMessages } = useMessage();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (getMessages) {
      getMessages();
    }
  }, []);

  const rawMessages =
    messages?.data || messages?.messages || messages;

  const messagesList = Array.isArray(rawMessages)
    ? rawMessages
    : [];

  const filteredMessages = messagesList.filter((msg) => {
    const clientName =
      msg.sender_name || msg.sender?.name || "";

    const city =
      msg.city ||
      msg.sender_city ||
      msg.sender?.city ||
      "";

    const query = searchTerm.toLowerCase();

    return (
      clientName.toLowerCase().includes(query) ||
      city.toLowerCase().includes(query)
    );
  });

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";

    return phone.replace(/[^0-9+]/g, "");
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] text-slate-900">

      <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[32px] bg-[#0d1f1a] px-6 py-8 sm:px-8 lg:px-10">

          {/* Background effects */}
          <div className="pointer-events-none absolute -right-28 -top-36 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-[30%] h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-2xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />

                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/70">
                  Centre de communication
                </span>

              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">

                Messages

                <span className="text-emerald-400">
                  {" "}clients.
                </span>

              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Consultez les demandes reçues et contactez vos clients
                directement par téléphone ou WhatsApp.
              </p>

            </div>

            <button
              onClick={getMessages}
              disabled={loading}
              className="group flex h-12 w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-bold text-white transition-all hover:bg-white/10 disabled:opacity-50"
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
        <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Total */}
          <div className="group rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Messages reçus
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                  {messagesList.length}
                </p>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform group-hover:rotate-6">
                <MessagesSquare size={19} />
              </div>

            </div>

          </div>

          {/* Results */}
          <div className="group rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Résultats affichés
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                  {filteredMessages.length}
                </p>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition-transform group-hover:-rotate-6">
                <Inbox size={19} />
              </div>

            </div>

          </div>

          {/* Status */}
          <div className="relative overflow-hidden rounded-[24px] bg-emerald-400 p-5 shadow-[0_8px_30px_rgba(16,185,129,0.15)]">

            <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full border-[18px] border-white/10" />

            <div className="relative flex items-center justify-between">

              <div>

                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-950/60">
                  Messagerie
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="relative flex h-2.5 w-2.5">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0d1f1a] opacity-40" />

                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0d1f1a]" />

                  </span>

                  <p className="text-lg font-black text-[#0d1f1a]">
                    Active
                  </p>

                </div>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300">
                <Radio size={19} />
              </div>

            </div>

          </div>

        </section>

        {/* MESSAGES SECTION */}
        <section className="mt-9">

          {/* Section header */}
          <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <MessageSquare
                  size={16}
                  className="text-emerald-600"
                />

                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
                  Boîte de réception
                </span>

              </div>

              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Demandes clients
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Retrouvez toutes les demandes envoyées par vos clients.
              </p>

            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-[380px]">

              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />

              <input
                type="text"
                placeholder="Rechercher un client ou une ville..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
              />

            </div>

          </div>

          {/* LOADING */}
          {loading && messagesList.length === 0 && (

            <div className="rounded-[30px] border border-slate-200 bg-white py-24 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-emerald-50">

                <RotateCw className="h-7 w-7 animate-spin text-emerald-600" />

              </div>

              <h3 className="mt-5 text-sm font-black text-slate-800">
                Chargement des messages
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Récupération de vos demandes clients...
              </p>

            </div>

          )}

          {/* EMPTY */}
          {!loading && filteredMessages.length === 0 && (

            <div className="relative overflow-hidden rounded-[32px] border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

              <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-100/60 blur-3xl" />

              <div className="relative">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#0d1f1a] text-emerald-300 shadow-lg">
                  <Inbox size={27} />
                </div>

                <h3 className="mt-5 text-lg font-black text-slate-900">
                  Aucun message trouvé
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Aucun message client ne correspond actuellement à votre recherche.
                </p>

              </div>

            </div>

          )}

          {/* MESSAGES GRID */}
          {!loading && filteredMessages.length > 0 && (

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              {filteredMessages.map((msg, index) => {

                const clientName =
                  msg.sender_name ||
                  msg.sender?.name ||
                  "Client";

                const clientPhone =
                  msg.sender_phone ||
                  msg.sender?.phone ||
                  "0600000000";

                const cleanPhone =
                  formatPhoneNumber(clientPhone);

                const clientImage =
                  msg.sender_image ||
                  msg.sender?.avatar;

                const clientCity =
                  msg.sender_city ||
                  msg.city ||
                  "Non spécifié";

                const messageText =
                  msg.message ||
                  msg.content ||
                  msg.text ||
                  "Aucun contenu";

                let messageTime = "Récemment";

                if (msg.created_at) {

                  const date = new Date(msg.created_at);

                  if (!isNaN(date.getTime())) {

                    messageTime = date.toLocaleString(
                      "fr-FR",
                      {
                        dateStyle: "short",
                        timeStyle: "short"
                      }
                    );

                  }
                }

                return (

                  <article
                    key={msg.id || index}
                    className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                  >

                    {/* Number */}
                    <span className="pointer-events-none absolute -right-1 top-14 text-[90px] font-black leading-none text-slate-50 transition-colors duration-300 group-hover:text-emerald-50">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* CLIENT */}
                    <div className="relative flex items-start justify-between gap-4">

                      <div className="flex min-w-0 items-center gap-3">

                        {clientImage ? (

                          <div className="relative shrink-0">

                            <img
                              src={clientImage}
                              alt={clientName}
                              className="h-12 w-12 rounded-2xl object-cover ring-1 ring-slate-200"
                            />

                            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />

                          </div>

                        ) : (

                          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0d1f1a] text-emerald-300">

                            <User size={20} />

                            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />

                          </div>

                        )}

                        <div className="min-w-0">

                          <h3 className="truncate text-sm font-black text-slate-900">
                            {clientName}
                          </h3>

                          <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-400">

                            <MapPin
                              size={12}
                              className="text-emerald-500"
                            />

                            <span className="truncate">
                              {clientCity}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* DATE */}
                      <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500">

                        <Clock size={11} />

                        {messageTime}

                      </div>

                    </div>

                    {/* MESSAGE */}
                    <div className="relative mt-6">

                      <div className="mb-2 flex items-center gap-2">

                        <MessageSquare
                          size={13}
                          className="text-emerald-600"
                        />

                        <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                          Message
                        </span>

                      </div>

                      <div className="relative rounded-[20px] border border-slate-100 bg-[#f8faf9] p-4">

                        <div className="absolute left-0 top-4 h-8 w-[3px] rounded-r-full bg-emerald-400" />

                        <p className="pl-2 text-sm leading-6 text-slate-600">
                          {messageText}
                        </p>

                      </div>

                    </div>

                    {/* CONTACT INFO */}
                    <div className="relative mt-5 flex items-center justify-between border-t border-slate-100 pt-5">

                      <div>

                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                          Téléphone
                        </p>

                        <p className="mt-1 text-sm font-black text-slate-900">
                          {clientPhone}
                        </p>

                      </div>

                      <div className="flex items-center gap-2">

                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/${cleanPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn flex h-11 items-center gap-2 rounded-xl bg-emerald-400 px-4 text-xs font-black text-[#0d1f1a] transition-all hover:-translate-y-0.5 hover:bg-emerald-300"
                        >

                          <MessageCircle size={16} />

                          <span className="hidden sm:inline">
                            WhatsApp
                          </span>

                          <ArrowUpRight
                            size={13}
                            className="hidden transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 sm:block"
                          />

                        </a>

                        {/* Call */}
                        <a
                          href={`tel:${cleanPhone}`}
                          className="flex h-11 items-center gap-2 rounded-xl bg-[#0d1f1a] px-4 text-xs font-black text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
                        >

                          <Phone size={15} />

                          <span className="hidden sm:inline">
                            Appeler
                          </span>

                        </a>

                      </div>

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

