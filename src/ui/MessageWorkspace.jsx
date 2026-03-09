import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ImagePlus, Paperclip, Search, SendHorizontal } from "lucide-react";

const formatBytes = (value) => {
  const size = Number(value || 0);
  if (!size) return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

export default function MessageWorkspace({
  pageTitle,
  conversations,
  role = "user",
  onSendMessage,
  onSendFile,
  onBook,
  onViewBooking,
}) {
  const [activeConversationId, setActiveConversationId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [draft, setDraft] = useState("");
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const applyDesktopSelection = () => {
      if (media.matches && !activeConversationId && conversations[0]) {
        setActiveConversationId(conversations[0].id);
      }
    };
    applyDesktopSelection();
    media.addEventListener("change", applyDesktopSelection);
    return () => media.removeEventListener("change", applyDesktopSelection);
  }, [activeConversationId, conversations]);

  const filteredConversations = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return conversations;
    return conversations.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query) ||
        item.preview.toLowerCase().includes(query)
    );
  }, [conversations, searchText]);

  const activeConversation = conversations.find((item) => item.id === activeConversationId) || null;
  const isMobileChatOpen = Boolean(activeConversation);

  const openConversation = (conversationId) => setActiveConversationId(conversationId);
  const closeMobileChat = () => setActiveConversationId("");

  const send = () => {
    if (!draft.trim() || !activeConversation) return;
    onSendMessage?.(activeConversation.id, draft.trim());
    setDraft("");
  };

  const attach = async (event, type) => {
    const file = event.target.files?.[0];
    if (!file || !activeConversation) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      alert("File is too large. Please upload a file up to 2MB.");
      event.target.value = "";
      return;
    }
    try {
      await onSendFile?.(activeConversation.id, file, type);
    } catch {
      alert("Unable to upload this file right now. Please try a smaller file.");
    }
    event.target.value = "";
  };

  return (
    <section className="h-[78vh] overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-xl shadow-cyan-100">
      <div className="grid h-full min-h-0 lg:grid-cols-[360px_1fr]">
        <aside className={`h-full min-h-0 overflow-hidden border-r border-slate-200 bg-slate-50 ${isMobileChatOpen ? "hidden lg:block" : "block"}`}>
          <div className="border-b border-slate-200 p-4">
            <h1 className="text-3xl font-black text-slate-900">{pageTitle}</h1>
            <div className="mt-4 hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 sm:flex">
              <Search size={16} className="text-slate-500" />
              <input
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-transparent text-sm text-slate-900 outline-none"
              />
            </div>
          </div>

          <div className="h-[calc(100%-115px)] overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => openConversation(conversation.id)}
                className={`flex w-full items-start gap-3 border-b border-slate-200 p-4 text-left transition-colors ${
                  activeConversation?.id === conversation.id ? "bg-cyan-100/60" : "bg-transparent hover:bg-cyan-50"
                }`}
              >
                <img src={conversation.avatar} alt={conversation.name} className="h-12 w-12 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-lg font-black text-slate-900">{conversation.name}</p>
                    <span className="text-xs text-slate-500">{conversation.time}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{conversation.preview}</p>
                  <p className="mt-1 text-xs font-semibold text-cyan-700">{conversation.subject}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <article className={`${isMobileChatOpen ? "flex" : "hidden lg:flex"} h-full min-h-0 flex-col overflow-hidden`}>
          {activeConversation ? (
            <>
              <header className="z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-6">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={closeMobileChat} className="rounded-full p-1 text-slate-600 lg:hidden">
                    <ArrowLeft size={18} />
                  </button>
                  <img src={activeConversation.avatar} alt={activeConversation.name} className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <p className="text-lg font-black text-slate-900">{activeConversation.name}</p>
                    <p className="text-sm text-slate-500">{activeConversation.subject}</p>
                  </div>
                </div>
                {role === "user" ? (
                  <button
                    type="button"
                    onClick={() => onBook?.(activeConversation)}
                    className="rounded-lg bg-cyan-600 px-3 py-2 text-xs font-bold text-white"
                  >
                    Book Tutor
                  </button>
                ) : (
                  activeConversation.bookingStatus && (
                    <button
                      type="button"
                      onClick={() => onViewBooking?.(activeConversation)}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
                    >
                      View Booking
                    </button>
                  )
                )}
              </header>

              <div className="flex-1 min-h-0 space-y-3 overflow-y-auto bg-slate-50 p-4 md:p-6">
                {activeConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[85%] rounded-2xl px-4 py-3 md:max-w-[70%] ${
                      message.fromMe ? "ml-auto rounded-br-md bg-blue-600 text-white" : "rounded-bl-md bg-white text-slate-800"
                    }`}
                  >
                    {message.type === "image" && message.fileUrl && (
                      <a href={message.fileUrl} target="_blank" rel="noreferrer" className="mb-2 block">
                        <img
                          src={message.fileUrl}
                          alt={message.fileName || "Shared image"}
                          className="max-h-56 w-full rounded-xl object-cover"
                        />
                      </a>
                    )}
                    {message.type === "file" && message.fileUrl && (
                      <a
                        href={message.fileUrl}
                        download={message.fileName || "file"}
                        className={`mb-2 block rounded-xl border px-3 py-2 text-sm font-semibold ${
                          message.fromMe
                            ? "border-blue-400/40 bg-blue-500/20 text-blue-50"
                            : "border-slate-200 bg-slate-100 text-slate-700"
                        }`}
                      >
                        <span className="block truncate">{message.fileName || "Download file"}</span>
                        {message.fileSize ? <span className="text-xs opacity-80">{formatBytes(message.fileSize)}</span> : null}
                      </a>
                    )}
                    {message.type !== "text" && !message.fileUrl && (
                      <p className="mb-1 text-xs font-semibold opacity-80">
                        {message.type === "image" ? "Image" : "File"}: {message.fileName}
                      </p>
                    )}
                    <p className="text-sm md:text-base">{message.text}</p>
                    <p className={`mt-1 text-right text-xs ${message.fromMe ? "text-blue-100" : "text-slate-500"}`}>{message.time}</p>
                  </div>
                ))}
              </div>

              <footer className="z-10 border-t border-slate-200 bg-white p-3 md:p-4">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-full p-1 text-slate-600 hover:bg-slate-200"
                    aria-label="Attach file"
                  >
                    <Paperclip size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="rounded-full p-1 text-slate-600 hover:bg-slate-200"
                    aria-label="Attach image"
                  >
                    <ImagePlus size={16} />
                  </button>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => attach(e, "file")} />
                  <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => attach(e, "image")} />
                  <input
                    type="text"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && send()}
                    placeholder="Type your message..."
                    className="w-full bg-transparent text-sm text-slate-900 outline-none md:text-base"
                  />
                  <button type="button" onClick={send} className="rounded-full bg-cyan-600 p-2 text-white">
                    <SendHorizontal size={16} />
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <div className="hidden h-full items-center justify-center text-slate-500 lg:flex">
              Select a conversation to start chatting
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
