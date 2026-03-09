import React from "react";
import AdminShell from "../ui/AdminShell";
import { closeReport, getReports, getTutors } from "../lib/appStore";

export default function AdminReports() {
  const reports = getReports();
  const tutors = getTutors();
  const tutorById = Object.fromEntries(tutors.map((t) => [t.id, t]));

  return (
    <AdminShell>
      <section className="rounded-3xl border border-violet-100 bg-white p-5 shadow-xl shadow-violet-100 md:p-8">
        <h1 className="text-3xl font-black text-slate-900">Reports</h1>
        <p className="mt-2 text-slate-600">User and tutor submitted reports.</p>

        <div className="mt-6 space-y-3">
          {reports.length === 0 && <p className="text-sm text-slate-600">No reports yet.</p>}
          {reports.map((report) => (
            <article key={report.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-black text-slate-900">
                  {report.fromRole} • {report.type}
                </p>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-bold ${
                    report.status === "open" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">From: {report.fromName}</p>
              {report.targetTutorId && (
                <p className="mt-1 text-xs text-slate-500">
                  Tutor: {tutorById[report.targetTutorId]?.fullName || "Unknown"}
                </p>
              )}
              <p className="mt-2 text-sm text-slate-700">{report.message}</p>
              {report.status === "open" && (
                <button
                  type="button"
                  onClick={() => {
                    closeReport(report.id);
                    window.location.reload();
                  }}
                  className="mt-3 rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white"
                >
                  Mark as Resolved
                </button>
              )}
            </article>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
