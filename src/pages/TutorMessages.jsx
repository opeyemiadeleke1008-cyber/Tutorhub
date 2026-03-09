import React, { useMemo, useState } from "react";
import MessageWorkspace from "../ui/MessageWorkspace";
import TutorShell from "../ui/TutorShell";
import {
  getBookingById,
  getBookingsForTutor,
  getConversationsForTutor,
  getCurrentTutor,
  getCurrentUser,
  sendMessage,
  updateBookingStatus,
} from "../lib/appStore";

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const toDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });

export default function TutorMessages() {
  const tutor = getCurrentTutor();
  const user = getCurrentUser();
  const [refresh, setRefresh] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const conversations = useMemo(() => {
    const list = getConversationsForTutor(tutor?.id || "");
    return list.map((conv) => {
      const lastMessage = conv.messages[conv.messages.length - 1];
      const booking = conv.bookingId ? getBookingById(conv.bookingId) : null;
      return {
        id: conv.id,
        name: user.fullName,
        avatar: user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60",
        subject: conv.subject || tutor?.publicProfile?.subject || "Student",
        preview: lastMessage ? lastMessage.text : "Start a conversation",
        time: lastMessage ? formatTime(lastMessage.sentAt) : "",
        bookingStatus: booking?.status || "",
        booking,
        messages: conv.messages.map((m) => ({
          id: m.id,
          text: m.text,
          fromMe: m.senderRole === "tutor",
          time: formatTime(m.sentAt),
          type: m.type,
          fileName: m.fileName,
          fileUrl: m.fileUrl,
          mimeType: m.mimeType,
          fileSize: m.fileSize,
        })),
      };
    });
  }, [refresh, tutor, user]);

  const onSendMessage = (conversationId, text) => {
    sendMessage({ conversationId, senderRole: "tutor", text, type: "text" });
    setRefresh((v) => v + 1);
  };

  const onSendFile = async (conversationId, file, type) => {
    const fileUrl = await toDataUrl(file);
    sendMessage({
      conversationId,
      senderRole: "tutor",
      text: type === "image" ? "Sent an image" : "Sent a file",
      type,
      fileName: file.name,
      fileUrl,
      mimeType: file.type || "",
      fileSize: file.size || 0,
    });
    setRefresh((v) => v + 1);
  };

  const onViewBooking = (conversation) => {
    if (!conversation.booking) return;
    setSelectedBooking(conversation.booking);
  };

  const actionBooking = (status) => {
    if (!selectedBooking) return;
    updateBookingStatus(selectedBooking.id, status);
    setSelectedBooking(null);
    setRefresh((v) => v + 1);
  };

  return (
    <TutorShell>
      <MessageWorkspace
        pageTitle="Tutor Messages"
        role="tutor"
        conversations={conversations}
        onSendMessage={onSendMessage}
        onSendFile={onSendFile}
        onViewBooking={onViewBooking}
      />

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <h2 className="text-xl font-black text-slate-900">Booking Request</h2>
            <p className="mt-1 text-sm text-slate-600">{selectedBooking.subject}</p>
            <p className="mt-2 text-sm text-slate-600">Date: {selectedBooking.date}</p>
            <p className="text-sm text-slate-600">Time: {selectedBooking.time}</p>
            <p className="text-sm text-slate-600">Status: {selectedBooking.status}</p>
            <p className="mt-2 rounded-lg bg-slate-50 p-2 text-sm text-slate-600">{selectedBooking.note || "No note"}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setSelectedBooking(null)} className="rounded-lg border px-3 py-2 text-sm font-bold">
                Close
              </button>
              {selectedBooking.status === "pending" && (
                <>
                  <button type="button" onClick={() => actionBooking("rejected")} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white">
                    Reject
                  </button>
                  <button type="button" onClick={() => actionBooking("accepted")} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white">
                    Accept
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </TutorShell>
  );
}
