import React, { useEffect, useState } from 'react';
import { useMessage } from '../../hooks/usemessage';
import { 
  MessageSquare, User, Phone, MessageCircle, RotateCw, Search, Clock, MapPin, AlertCircle 
} from 'lucide-react';

export default function MessageTechnicien() {
  const { messages, loading, getMessages } = useMessage();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (getMessages) {
      getMessages();
    }
  }, []);

  const rawMessages = messages?.data || messages?.messages || messages;
  const messagesList = Array.isArray(rawMessages) ? rawMessages : [];

  const filteredMessages = messagesList.filter((msg) => {
    const clientName = msg.sender_name || msg.sender?.name || "";
    const city = msg.city || msg.sender_city || msg.sender?.city || "";
    const query = searchTerm.toLowerCase();

    return (
      clientName.toLowerCase().includes(query) ||
      city.toLowerCase().includes(query)
    );
  });

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return phone.replace(/[^0-9+]/g, '');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* TOP BAR / HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Centre de Communication</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="text-blue-600" size={28} />
              Demandes & Messages Clients
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Consultez les messages reçus et contactez directement vos clients.
            </p>
          </div>

          <button
            onClick={getMessages}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/80 text-xs font-semibold transition active:scale-95 disabled:opacity-50 shrink-0"
          >
            <RotateCw size={16} className={loading ? "animate-spin text-blue-600" : ""} />
            <span>Actualiser</span>
          </button>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">

          {/* SEARCH & FILTER BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Rechercher par client ou ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition placeholder:text-slate-400"
              />
            </div>

            <div className="text-xs text-slate-500 font-medium self-end sm:self-center">
              Total: <span className="text-slate-900 font-bold">{filteredMessages.length}</span> message(s)
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && messagesList.length === 0 && (
            <div className="py-20 text-center space-y-3">
              <RotateCw className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Chargement des messages clients...</p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && filteredMessages.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <AlertCircle size={36} className="mx-auto text-slate-400" />
              <h3 className="text-sm font-medium text-slate-700">Aucun message trouvé</h3>
              <p className="text-xs text-slate-400">Vous n'avez actuellement aucun message client correspondant.</p>
            </div>
          )}

          {/* MESSAGES GRID */}
          {!loading && filteredMessages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredMessages.map((msg, index) => {
                const clientName = msg.sender_name || msg.sender?.name || "Client";
                const clientPhone = msg.sender_phone || msg.sender?.phone || "0600000000";
                const cleanPhone = formatPhoneNumber(clientPhone);
                const clientImage = msg.sender_image || msg.sender?.avatar;
                const clientCity = msg.sender_city || msg.city || "Non spécifié";
                const messageText = msg.message || msg.content || msg.text || "Aucun contenu";
                
                let messageTime = "Récemment";
                if (msg.created_at) {
                  const date = new Date(msg.created_at);
                  if (!isNaN(date.getTime())) {
                    messageTime = date.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
                  }
                }

                return (
                  <div
                    key={msg.id || index}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* CLIENT HEADER */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          {clientImage ? (
                            <img
                              src={clientImage}
                              alt={clientName}
                              className="w-11 h-11 rounded-full object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                              <User size={20} />
                            </div>
                          )}

                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{clientName}</h3>
                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                              <MapPin size={12} className="text-slate-400" />
                              <span>{clientCity}</span>
                            </div>
                          </div>
                        </div>

                        <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0 font-medium">
                          <Clock size={11} />
                          {messageTime}
                        </span>
                      </div>

                      {/* MESSAGE TEXT */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {messageText}
                      </div>
                    </div>

                    {/* ACTIONS (WHATSAPP & PHONE) */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 hover:bg-emerald-100/80 text-xs font-semibold transition"
                      >
                        <MessageCircle size={15} className="shrink-0 text-emerald-600" />
                        <span>WhatsApp : <strong>{clientPhone}</strong></span>
                      </a>

                      <a
                        href={`tel:${cleanPhone}`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-700 hover:bg-blue-100/80 text-xs font-semibold transition"
                      >
                        <Phone size={15} className="shrink-0 text-blue-600" />
                        <span>Appeler : <strong>{clientPhone}</strong></span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}