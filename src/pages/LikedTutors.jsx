import React from "react";
import { Link } from "react-router-dom";
import UserHeader from "../ui/UserHeader";
import UserNavbar from "../ui/UserNavbar";
import MessageFloat from "../ui/MessageFloat";
import { getLikedTutors } from "../lib/appStore";

export default function LikedTutors() {
  const tutors = getLikedTutors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 pb-24 sm:pb-8">
      <UserHeader />
      <UserNavbar />
      <MessageFloat />
      <main className="mx-auto w-full max-w-6xl px-4 py-5 md:px-6 lg:px-8">
        <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
          <h1 className="text-3xl font-black text-slate-900">Liked Tutors</h1>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.length === 0 && <p className="text-sm text-slate-600">No liked tutors yet.</p>}
            {tutors.map((tutor) => (
              <article key={tutor.id} className="rounded-2xl border border-slate-200 p-4">
                <img src={tutor.publicProfile?.picture} alt={tutor.fullName} className="h-40 w-full rounded-xl object-cover" />
                <p className="mt-2 text-lg font-black text-slate-900">{tutor.fullName}</p>
                <p className="text-sm text-cyan-700">{tutor.publicProfile?.subject}</p>
                <Link
                  to={`/usermessages?tutorId=${tutor.id}`}
                  className="mt-3 inline-flex rounded-full bg-slate-900 px-3 py-2 text-xs font-bold text-white"
                >
                  Message Tutor
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
