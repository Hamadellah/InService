import React, { useEffect, useState } from 'react';
import { useMessage } from '../../hooks/usemessage';
import { 
  MessageSquare, User, Phone, MessageCircle, Loader2, Search, RefreshCw, Clock, MapPin 
} from 'lucide-react';

export default function MessageTechnicien() {
  const { messages, loading, getMessages } = useMessage();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (getMessages) {
      getMessages();
    }
  }, []);
  useEffect(() => {
    console.log("Messages fetched:", messages);
  }, [messages]);

  // Extraction et gestion du tableau de données
  const rawMessages = messages?.data || messages?.messages || messages;
  const messagesList = Array.isArray(rawMessages) ? rawMessages : [];

  // Filtrage des messages par recherche (nom du client ou ville)
  const filteredMessages = messagesList.filter((msg) => {
    const clientName = msg.sender_name ;
    const city = msg.city || msg.sender?.city || "";
    return (
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading && messagesList.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        <p className="text-sm">Chargement des messages des clients...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="text-cyan-400" size={26} />
            Demandes & Messages Clients
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Consultez les messages reçus et les informations de contact pour joindre vos clients.
          </p>
        </div>

        <button
          onClick={getMessages}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition active:scale-95 shrink-0"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-cyan-400" : ""} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Rechercher par nom de client ou ville..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
        />
      </div>

      {/* Message quand la liste est vide */}
      {filteredMessages.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
          <MessageSquare size={40} className="mx-auto text-slate-600 mb-3" />
          <h3 className="text-sm font-medium text-slate-300">Aucun message trouvé</h3>
          <p className="text-xs text-slate-500 mt-1">Vous n'avez actuellement aucun message client enregistré.</p>
        </div>
      )}

      {/* Grille des messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMessages.map((msg, index) => {
          const clientName = msg.sender_name || "Client";
          const clientPhone = msg.sender_phone || "0600000000";
          const clientImage = msg.sender_image ;
          const clientCity = msg.sender_city ;
          const messageText = msg.message || msg.content || msg.text || "";
          const messageTime = msg.created_at ? new Date(msg.created_at).toLocaleString('fr-FR') : "Récemment";

          return (
            <div
              key={msg.id || index}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col justify-between hover:border-slate-700 transition space-y-4"
            >
              <div>
                {/* Information du profil du client */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {clientImage ? (
                      <img
                        src={clientImage}
                        alt={clientName}
                        className="w-12 h-12 rounded-full object-cover border border-cyan-500/30"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700 shrink-0">
                        <User size={22} />
                      </div>
                    )}

                    <div>
                      <h3 className="font-bold text-white text-base">{clientName}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-cyan-400" />
                          {clientCity}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-500 flex items-center gap-1 shrink-0">
                    <Clock size={12} />
                    {messageTime}
                  </span>
                </div>

                {/* Contenu du message */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {messageText}
                </div>
              </div>

              {/* Badges d'information pour contacter le client */}
              <div className="pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                
                {/* Badge WhatsApp */}
                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                  <MessageCircle size={15} className="shrink-0" />
                  <span>Contacter sur WhatsApp : <strong className="font-semibold text-green-300">{clientPhone}</strong></span>
                </div>

                {/* Badge Appel */}
                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <Phone size={15} className="shrink-0" />
                  <span>Appeler le client : <strong className="font-semibold text-emerald-300">{clientPhone}</strong></span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}