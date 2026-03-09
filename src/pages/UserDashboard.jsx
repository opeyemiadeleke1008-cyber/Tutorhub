import React from "react";
import { ArrowRight, ChevronRight, Clock3, Filter, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import UserHeader from "../ui/UserHeader";
import UserNavbar from "../ui/UserNavbar";
import MessageFloat from "../ui/MessageFloat";
import { getPublicTutors } from "../lib/appStore";

export default function UserDashboard() {
  const tutors = getPublicTutors();
  const featuredTutors = tutors.slice(0, 3).map((t) => ({
    ...t,
    name: t.fullName,
    subject: t.publicProfile?.subject || "Not Set",
    image: t.publicProfile?.picture,
    mode: "Online & Home",
  }));

  const subjects = [...new Set(tutors.map((t) => t.publicProfile?.subject).filter(Boolean))].map((name) => ({
    name,
    tutors: tutors.filter((t) => t.publicProfile?.subject === name).length,
  }));

  const primaryBtn =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-cyan-200 transition-all hover:-translate-y-0.5 hover:bg-cyan-700";
  const darkBtn =
    "inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-md shadow-slate-300 transition-all hover:-translate-y-0.5 hover:bg-slate-800";
  const lightBtn =
    "inline-flex items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 pb-24 sm:pb-8">
      <UserHeader />
      <UserNavbar />
      <MessageFloat />

      <main className="mx-auto w-full max-w-7xl px-4 py-5 md:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-xs font-bold text-cyan-700">
                <Star size={14} /> Personalized Learning Dashboard
              </p>
              <h1 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                Find the right tutor by subject, style, and schedule
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Search approved tutors, compare profiles, and message them directly before booking.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                <Link to="/tutors">
                  <button className={primaryBtn}>
                    <Filter size={16} /> Search Tutors
                  </button>
                </Link>
              </div>
            </div>

            <article className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white">
              <h2 className="text-lg font-black">How Booking Works</h2>
              <p className="mt-3 text-cyan-200">Students can only book after starting tutor conversations.</p>
              <div className="mt-4 space-y-2 text-sm text-slate-200">
                <p className="flex items-center gap-2"><Clock3 size={14} /> Start by messaging your preferred tutor</p>
                <p className="flex items-center gap-2"><MapPin size={14} /> Confirm schedule and book inside Messages</p>
              </div>
              <Link to="/usermessages" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900">
                Open Messages
              </Link>
            </article>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-slate-900">Search by Subject</h2>
            <Link to="/tutors" className="inline-flex items-center gap-1 text-sm font-bold text-cyan-700">
              View all tutors <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {subjects.length === 0 && <p className="text-sm text-slate-600">No approved tutors yet.</p>}
            {subjects.map((subject) => (
              <article key={subject.name} className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-md shadow-cyan-50">
                <p className="text-base font-black text-slate-900">{subject.name}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">{subject.tutors} tutors</p>
                <Link to="/tutors" className={`mt-3 ${lightBtn}`}>Find Tutor</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Featured Tutors</h2>
            <Link to="/tutors" className="inline-flex items-center gap-1 text-sm font-bold text-cyan-700">
              Explore tutors <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredTutors.length === 0 && <p className="text-sm text-slate-600">No approved tutors yet.</p>}
            {featuredTutors.map((tutor) => (
              <article key={tutor.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-100">
                <img src={tutor.image} alt={tutor.name} className="h-40 w-full rounded-xl object-cover" />
                <h3 className="mt-3 text-lg font-black text-slate-900">{tutor.name}</h3>
                <p className="text-sm font-semibold text-cyan-700">{tutor.subject}</p>
                <p className="mt-2 text-xs text-slate-500">Rating {Number(tutor.rating || 0).toFixed(1)} | {tutor.mode}</p>
                <Link to={`/usermessages?tutorId=${tutor.id}`} className={`mt-4 w-full ${darkBtn}`}>Message Tutor</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
