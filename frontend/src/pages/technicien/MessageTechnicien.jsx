import React, { useEffect, useState } from 'react';
import { useMessage } from '../../hooks/usemessage';
import { 
  MessageSquare, User, Send, Loader2, Search, ArrowLeft, CheckCircle2 
} from 'lucide-react';

export default function MessengerTechnicien() {
  const { messages, loading, sendMessage, getMessages } = useMessage();
  
  // State l-contact li sélectionné (Conversation active)
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  const messagesList = Array.isArray(messages) ? messages : [];

  // Groupement d-les messages b-l-utilisateur (Group by Sender)
  const conversations = messagesList.reduce((acc, msg) => {
    const userId = msg.sender_id || msg.user_id || msg.id;
    if (!acc[userId]) {
      acc[userId] = {
        userId: userId,
        userName: msg.sender_name || msg.user_name || msg.name || "Client",
        userImage: msg.sender_image || msg.user_image || msg.image,
        lastMessage: msg.message,
        lastTime: msg.created_at,
        messagesList: []
      };
    }
    acc[userId].messagesList.push(msg);
    return acc;
  }, {});

  const usersList = Object.values(conversations).filter(c => 
    c.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Send message f-l-conversation
  const handleSend = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedUser) return;

    setIsSending(true);
    try {
      await sendMessage(selectedUser.userId, { message: replyText });
      setReplyText("");
      getMessages(); // Rafraîchir les messages
    } catch (err) {
      console.error("Erreur envoi:", err);
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        <p className="text-sm">Chargement de votre messagerie...</p>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-6 max-w-7xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-xl h-[80vh] flex overflow-hidden shadow-2xl">
        
        {/* ================= SIDEBAR (List d-les personnes) ================= */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-slate-800 flex flex-col ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Header Sidebar */}
          <div className="p-4 border-b border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="text-cyan-400" size={22} />
              Messages
            </h2>
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
            {usersList.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs">
                Aucune conversation trouvée.
              </div>
            ) : (
              usersList.map((chat) => {
                const isSelected = selectedUser?.userId === chat.userId;
                return (
                  <div
                    key={chat.userId}
                    onClick={() => setSelectedUser(chat)}
                    className={`p-3.5 flex items-center gap-3 cursor-pointer transition ${
                      isSelected 
                        ? 'bg-cyan-500/10 border-l-4 border-cyan-400' 
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    {chat.userImage ? (
                      <img src={chat.userImage} alt="" className="w-11 h-11 rounded-full object-cover border border-slate-700" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700 shrink-0">
                        <User size={20} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-white truncate">{chat.userName}</h4>
                        <span className="text-[10px] text-slate-500">
                          {chat.lastTime ? new Date(chat.lastTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================= CHAT WINDOW (Zone d-conversation) ================= */}
        <div className={`flex-1 flex flex-col ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="md:hidden text-slate-400 hover:text-white p-1"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  {selectedUser.userImage ? (
                    <img src={selectedUser.userImage} alt="" className="w-10 h-10 rounded-full object-cover border border-cyan-500/30" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700">
                      <User size={18} />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-white text-sm">{selectedUser.userName}</h3>
                    <p className="text-[11px] text-cyan-400">En ligne</p>
                  </div>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/20">
                {selectedUser.messagesList.map((m, idx) => (
                  <div key={idx} className="flex flex-col items-start space-y-1">
                    <div className="max-w-[75%] bg-slate-800/90 text-slate-200 border border-slate-700/60 p-3 rounded-2xl rounded-tl-none text-xs sm:text-sm">
                      {m.message}
                    </div>
                    <span className="text-[10px] text-slate-500 px-1">
                      {m.created_at ? new Date(m.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
                <button
                  type="submit"
                  disabled={isSending || !replyText.trim()}
                  className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl transition active:scale-95 disabled:opacity-50"
                >
                  {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </form>
            </>
          ) : (
            /* Placeholder mni ma-koun sélectionné ḥta utilisateur */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-3">
              <div className="p-4 bg-slate-800/40 rounded-full border border-slate-800 text-cyan-400">
                <MessageSquare size={32} />
              </div>
              <p className="text-sm">Sélectionnez une conversation pour commencer à discuter.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}