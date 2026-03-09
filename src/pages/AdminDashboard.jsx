import React from "react";
import AdminShell from "../ui/AdminShell";
import { getReports, getTutors } from "../lib/appStore";

export default function AdminDashboard() {
  const tutors = getTutors();
  const reports = getReports();
  const pending = tutors.filter((t) => t.approvalStatus === "pending").length;
  const active = tutors.filter((t) => t.accountStatus === "active").length;

  return (
    <AdminShell>
      <section className="rounded-3xl border border-violet-100 bg-white p-5 shadow-xl shadow-violet-100 md:p-8">
        <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">Manage tutors, reports, and platform operations.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl bg-violet-50 p-4">
            <p className="text-3xl font-black text-violet-700">{tutors.length}</p>
            <p className="text-sm font-semibold text-slate-600">Total Tutors</p>
          </article>
          <article className="rounded-2xl bg-amber-50 p-4">
            <p className="text-3xl font-black text-amber-700">{pending}</p>
            <p className="text-sm font-semibold text-slate-600">Pending Approvals</p>
          </article>
          <article className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-3xl font-black text-emerald-700">{active}</p>
            <p className="text-sm font-semibold text-slate-600">Active Tutors</p>
          </article>
          <article className="rounded-2xl bg-rose-50 p-4">
            <p className="text-3xl font-black text-rose-700">{reports.length}</p>
            <p className="text-sm font-semibold text-slate-600">Reports</p>
          </article>
        </div>
      </section>
    </AdminShell>
  );
}
