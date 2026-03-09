import React, { useState } from "react";
import AdminShell from "../ui/AdminShell";
import { ADMIN_EMAIL, createAdminAccount, getAdminAccount } from "../lib/appStore";

export default function AdminSettings() {
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const account = getAdminAccount();

  const onSave = () => {
    if (!password) return;
    createAdminAccount(password);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <AdminShell>
      <section className="rounded-3xl border border-violet-100 bg-white p-5 shadow-xl shadow-violet-100 md:p-8">
        <h1 className="text-3xl font-black text-slate-900">Admin Settings</h1>
        <p className="mt-2 text-slate-600">Manage admin security settings.</p>

        <div className="mt-6 max-w-md space-y-3">
          <p className="text-sm text-slate-600">
            Admin email: <span className="font-bold">{ADMIN_EMAIL}</span>
          </p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Set new admin password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
          />
          <button
            type="button"
            onClick={onSave}
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white"
          >
            Update Password
          </button>
          {saved && <p className="text-xs font-semibold text-emerald-600">Password updated.</p>}
          {!account && <p className="text-xs text-amber-600">No admin account configured yet.</p>}
        </div>
      </section>
    </AdminShell>
  );
}
