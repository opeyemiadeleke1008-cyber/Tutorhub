import React, { useState } from "react";
import UserHeader from "../ui/UserHeader";
import UserNavbar from "../ui/UserNavbar";
import MessageFloat from "../ui/MessageFloat";
import { getBookingsForUser, getCurrentUser, getTutors, submitReview } from "../lib/appStore";

const isElapsed = (date, time) => {
  const dt = new Date(`${date}T${time}`);
  return dt.getTime() < Date.now();
};

export default function UserBookings() {
  const user = getCurrentUser();
  const tutors = getTutors();
  const tutorById = Object.fromEntries(tutors.map((t) => [t.id, t]));
  const bookings = getBookingsForUser(user.id);
  const [reviewTarget, setReviewTarget] = useState(null);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");

  const saveReview = (event) => {
    event.preventDefault();
    if (!reviewTarget) return;
    submitReview({ bookingId: reviewTarget.id, tutorId: reviewTarget.tutorId, stars, comment });
    setReviewTarget(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 pb-24 sm:pb-8">
      <UserHeader />
      <UserNavbar />
      <MessageFloat />
      <main className="mx-auto w-full max-w-6xl px-4 py-5 md:px-6 lg:px-8">
        <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
          <h1 className="text-3xl font-black text-slate-900">My Bookings</h1>
          <div className="mt-5 space-y-3">
            {bookings.length === 0 && <p className="text-sm text-slate-600">No bookings yet.</p>}
            {bookings.map((booking) => {
              const tutor = tutorById[booking.tutorId];
              const elapsed = booking.status === "accepted" && isElapsed(booking.date, booking.time);
              return (
                <article key={booking.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-black text-slate-900">{tutor?.fullName || "Tutor"}</p>
                  <p className="text-sm text-cyan-700">{booking.subject}</p>
                  <p className="text-xs text-slate-500">{booking.date} • {booking.time}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-600">Status: {booking.status}</p>
                  {elapsed && !booking.reviewed && (
                    <button
                      type="button"
                      onClick={() => setReviewTarget(booking)}
                      className="mt-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white"
                    >
                      Review Tutor
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {reviewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <h2 className="text-xl font-black text-slate-900">Rate Tutor (1-5)</h2>
            <form className="mt-4 space-y-3" onSubmit={saveReview}>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} type="button" onClick={() => setStars(s)} className={`rounded-md px-3 py-2 text-sm font-bold ${stars >= s ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-700'}`}>
                    {s}?
                  </button>
                ))}
              </div>
              <textarea rows="3" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write review" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setReviewTarget(null)} className="rounded-lg border px-3 py-2 text-sm font-bold">Cancel</button>
                <button type="submit" className="rounded-lg bg-cyan-600 px-3 py-2 text-sm font-bold text-white">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
