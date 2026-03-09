import React from "react";
import AdminShell from "../ui/AdminShell";
import {
  approveTutor,
  getTutors,
  setTutorAccountStatus,
  setTutorRating,
  setTutorVerification,
} from "../lib/appStore";

export default function AdminTutors() {
  const tutors = getTutors();

  const refresh = () => window.location.reload();

  return (
    <AdminShell>
      <section className="rounded-3xl border border-violet-100 bg-white p-5 shadow-xl shadow-violet-100 md:p-8">
        <h1 className="text-3xl font-black text-slate-900">All Tutors</h1>
        <p className="mt-2 text-slate-600">Review pending profiles and manage tutor accounts.</p>

        <div className="mt-6 space-y-4">
          {tutors.map((tutor) => (
            <article key={tutor.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-black text-slate-900">{tutor.fullName}</p>
                  <p className="text-sm text-slate-600">{tutor.email}</p>
                  <p className="text-xs font-semibold text-slate-600">
                    Subject: {tutor.publicProfile?.subject || "Not set yet"}
                  </p>
                  <p className="text-xs font-semibold text-violet-700">
                    Approval: {tutor.approvalStatus} • Account: {tutor.accountStatus}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tutor.approvalStatus === "pending" && (
                    <button
                      type="button"
                      onClick={() => {
                        approveTutor(tutor.id);
                        refresh();
                      }}
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white"
                    >
                      Accept Profile
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setTutorAccountStatus(
                        tutor.id,
                        tutor.accountStatus === "restricted" ? "active" : "restricted"
                      );
                      refresh();
                    }}
                    className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white"
                  >
                    {tutor.accountStatus === "restricted" ? "Unrestrict" : "Restrict"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTutorAccountStatus(tutor.id, "disabled");
                      refresh();
                    }}
                    className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white"
                  >
                    Disable
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTutorVerification(tutor.id, !tutor.verified);
                      refresh();
                    }}
                    className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
                  >
                    {tutor.verified ? "Unverify" : "Verify"}
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Set Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setTutorRating(tutor.id, star);
                      refresh();
                    }}
                    className={`rounded-md px-2 py-1 text-xs font-bold ${
                      Number(tutor.rating) >= star
                        ? "bg-amber-400 text-slate-900"
                        : "bg-white text-slate-600"
                    }`}
                  >
                    {star}★
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
