import React, { useMemo, useState } from "react";
import { BadgeCheck, Filter, Heart, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import UserHeader from "../ui/UserHeader";
import UserNavbar from "../ui/UserNavbar";
import MessageFloat from "../ui/MessageFloat";
import { getPublicTutors, toggleLikeTutor, getLikedTutorIds } from "../lib/appStore";

export default function Tutors() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [openFilter, setOpenFilter] = useState("subjects");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [ratingMode, setRatingMode] = useState("");

  const tutors = getPublicTutors();
  const subjectList = [...new Set(tutors.map((t) => t.publicProfile?.subject).filter(Boolean))];
  const likedIds = getLikedTutorIds();

  const filteredTutors = useMemo(() => {
    let list = tutors.map((tutor) => ({
      ...tutor,
      name: tutor.fullName,
      subject: tutor.publicProfile?.subject || "Not Set",
      image: tutor.publicProfile?.picture,
      lessons: tutor.lessons || 0,
      mode: "Online & Home",
    }));

    if (showFilters && selectedSubject) {
      list = list.filter((tutor) => tutor.subject === selectedSubject);
    }

    if (showFilters && ratingMode) {
      list = list.sort((a, b) => {
        if (a.verified !== b.verified) return b.verified - a.verified;
        return (b.rating || 0) - (a.rating || 0);
      });
      if (ratingMode === "4plus") list = list.filter((t) => Number(t.rating || 0) >= 4);
    }

    return list;
  }, [tutors, selectedSubject, ratingMode, showFilters]);

  const closeFilter = () => {
    setShowFilters(false);
    setOpenFilter("subjects");
    setSelectedSubject("");
    setRatingMode("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 pb-24 sm:pb-8">
      <UserHeader />
      <UserNavbar />
      <MessageFloat />

      <main className="mx-auto w-full max-w-7xl px-4 py-5 md:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-black text-slate-900">Find Tutors</h1>
              <p className="mt-1 text-sm text-slate-600">
                Approved tutors only. Filter by subject and ratings.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white"
            >
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {showFilters && (
            <div className="mt-5 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-black text-slate-900">Filter Tutors</h2>
                <button
                  type="button"
                  onClick={closeFilter}
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs font-bold text-slate-700"
                >
                  <X size={14} />
                  Close Filter
                </button>
              </div>

              <div className="space-y-3">
                <article className="rounded-xl bg-white p-3">
                  <button
                    type="button"
                    onClick={() => setOpenFilter((prev) => (prev === "subjects" ? "" : "subjects"))}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="text-sm font-bold text-slate-800">Subjects</span>
                    <span className="text-sm font-black text-cyan-700">{openFilter === "subjects" ? "-" : "+"}</span>
                  </button>

                  {openFilter === "subjects" && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {subjectList.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => setSelectedSubject(subject)}
                          className={`rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                            selectedSubject === subject
                              ? "border-cyan-600 bg-cyan-600 text-white"
                              : "border-cyan-200 bg-white text-cyan-700 hover:bg-cyan-100"
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  )}
                </article>

                <article className="rounded-xl bg-white p-3">
                  <button
                    type="button"
                    onClick={() => setOpenFilter((prev) => (prev === "ratings" ? "" : "ratings"))}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="text-sm font-bold text-slate-800">Ratings</span>
                    <span className="text-sm font-black text-cyan-700">{openFilter === "ratings" ? "-" : "+"}</span>
                  </button>

                  {openFilter === "ratings" && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setRatingMode("top")}
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${
                          ratingMode === "top"
                            ? "border-slate-800 bg-slate-800 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        5? & Verified First
                      </button>
                      <button
                        type="button"
                        onClick={() => setRatingMode("4plus")}
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${
                          ratingMode === "4plus"
                            ? "border-slate-800 bg-slate-800 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        4? and Above
                      </button>
                    </div>
                  )}
                </article>
              </div>
            </div>
          )}
        </section>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTutors.length === 0 && (
            <p className="text-sm font-semibold text-slate-600">No approved tutors found yet.</p>
          )}
          {filteredTutors.map((tutor) => {
            const liked = likedIds.includes(tutor.id);
            return (
              <article
                key={tutor.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-100"
              >
                <img src={tutor.image} alt={tutor.name} className="h-44 w-full rounded-xl object-cover" />
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{tutor.name}</h3>
                    <p className="text-sm font-semibold text-cyan-700">{tutor.subject}</p>
                  </div>
                  {tutor.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                      <BadgeCheck size={12} />
                      Verified
                    </span>
                  )}
                </div>

                <p className="mt-2 inline-flex items-center gap-1 text-sm text-slate-600">
                  <Star size={14} className="fill-amber-300 text-amber-400" />
                  {Number(tutor.rating || 0).toFixed(1)} • {tutor.mode}
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/usermessages?tutorId=${tutor.id}`}
                    className="flex-1 rounded-full bg-slate-900 px-4 py-2 text-center text-sm font-bold text-white"
                  >
                    Message Tutor
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      toggleLikeTutor(tutor.id);
                      setRefreshKey((v) => v + 1);
                    }}
                    className={`rounded-full px-3 py-2 text-sm font-bold ${
                      liked ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Heart size={16} className={liked ? "fill-rose-500" : ""} />
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
