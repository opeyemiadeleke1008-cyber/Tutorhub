import React from "react";
import TutorShell from "../ui/TutorShell";
import { getBookingsForTutor, getCurrentTutor } from "../lib/appStore";

export default function TutorBookings() {
  const tutor = getCurrentTutor();
  const bookings = getBookingsForTutor(tutor?.id || "");

  return (
    <TutorShell>
      <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
        <h1 className="text-3xl font-black text-slate-900">Tutor Bookings</h1>
        <div className="mt-5 space-y-3">
          {bookings.length === 0 && <p className="text-sm text-slate-600">No bookings yet.</p>}
          {bookings.map((booking) => (
            <article key={booking.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-black text-slate-900">{booking.subject}</p>
              <p className="text-xs text-slate-500">{booking.date} • {booking.time}</p>
              <p className="mt-1 text-xs font-semibold text-slate-600">Status: {booking.status}</p>
              <p className="mt-1 text-sm text-slate-600">{booking.note || "No note"}</p>
            </article>
          ))}
        </div>
      </section>
    </TutorShell>
  );
}
