import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import UserHeader from "../ui/UserHeader";
import UserNavbar from "../ui/UserNavbar";
import MessageWorkspace from "../ui/MessageWorkspace";
import {
  createBooking,
  ensureConversation,
  getBookingById,
  getConversationsForUser,
  getCurrentUser,
  getPublicTutors,
  sendMessage,
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

export default function UserMessages() {
  const user = getCurrentUser();
  const tutors = getPublicTutors();
  const tutorById = Object.fromEntries(tutors.map((t) => [t.id, t]));
  const location = useLocation();
  const initialTutorId = new URLSearchParams(location.search).get("tutorId");
  const [refresh, setRefresh] = useState(0);
  const [bookingTarget, setBookingTarget] = useState(null);
  const [bookingForm, setBookingForm] = useState({ date: "", time: "", note: "" });

  if (initialTutorId && tutorById[initialTutorId]) {
    ensureConversation({ userId: user.id, tutorId: initialTutorId });
  }

  const conversations = useMemo(() => {
    const list = getConversationsForUser(user.id);
    return list
      .map((conv) => {
        const tutor = tutorById[conv.tutorId];
        if (!tutor) return null;
        const lastMessage = conv.messages[conv.messages.length - 1];
        const booking = conv.bookingId ? getBookingById(conv.bookingId) : null;
        return {
          id: conv.id,
          tutorId: conv.tutorId,
          name: tutor.fullName,
          avatar: tutor.publicProfile?.picture,
          subject: tutor.publicProfile?.subject || "Tutor",
          preview: lastMessage ? lastMessage.text : "Start a conversation",
          time: lastMessage ? formatTime(lastMessage.sentAt) : "",
          bookingStatus: booking?.status || "",
          messages: conv.messages.map((m) => ({
            id: m.id,
            text: m.text,
            fromMe: m.senderRole === "user",
            time: formatTime(m.sentAt),
            type: m.type,
            fileName: m.fileName,
            fileUrl: m.fileUrl,
            mimeType: m.mimeType,
            fileSize: m.fileSize,
          })),
        };
      })
      .filter(Boolean);
  }, [refresh, user.id, tutorById]);

  const onSendMessage = (conversationId, text) => {
    sendMessage({ conversationId, senderRole: "user", text, type: "text" });
    setRefresh((v) => v + 1);
  };

  const onSendFile = async (conversationId, file, type) => {
    const fileUrl = await toDataUrl(file);
    sendMessage({
      conversationId,
      senderRole: "user",
      text: type === "image" ? "Sent an image" : "Sent a file",
      type,
      fileName: file.name,
      fileUrl,
      mimeType: file.type || "",
      fileSize: file.size || 0,
    });
    setRefresh((v) => v + 1);
  };

  const onBook = (conversation) => {
    setBookingTarget(conversation);
    setBookingForm({ date: "", time: "", note: "" });
  };

  const submitBooking = (event) => {
    event.preventDefault();
    if (!bookingTarget || !bookingForm.date || !bookingForm.time) return;
    createBooking({
      conversationId: bookingTarget.id,
      userId: user.id,
      tutorId: bookingTarget.tutorId,
      subject: bookingTarget.subject,
      date: bookingForm.date,
      time: bookingForm.time,
      note: bookingForm.note,
    });
    sendMessage({
      conversationId: bookingTarget.id,
      senderRole: "user",
      text: `Booking request: ${bookingForm.date} at ${bookingForm.time}`,
      type: "text",
    });
    setBookingTarget(null);
    setRefresh((v) => v + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 pb-24 sm:pb-8">
      <UserHeader />
      <UserNavbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-5 md:px-6 lg:px-8">
        <MessageWorkspace
          pageTitle="Messages"
          role="user"
          conversations={conversations}
          onSendMessage={onSendMessage}
          onSendFile={onSendFile}
          onBook={onBook}
        />
      </main>

      {bookingTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <h2 className="text-xl font-black text-slate-900">Book Tutor</h2>
            <p className="mt-1 text-sm text-slate-600">{bookingTarget.name} - {bookingTarget.subject}</p>
            <form className="mt-4 space-y-3" onSubmit={submitBooking}>
              <input
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm((p) => ({ ...p, date: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                type="time"
                value={bookingForm.time}
                onChange={(e) => setBookingForm((p) => ({ ...p, time: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <textarea
                rows="3"
                value={bookingForm.note}
                onChange={(e) => setBookingForm((p) => ({ ...p, note: e.target.value }))}
                placeholder="Optional note"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setBookingTarget(null)} className="rounded-lg border px-3 py-2 text-sm font-bold">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-cyan-600 px-3 py-2 text-sm font-bold text-white">
                  Submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
