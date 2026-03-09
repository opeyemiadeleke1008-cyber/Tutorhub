import React, { useState } from "react";
import UserHeader from "../ui/UserHeader";
import UserNavbar from "../ui/UserNavbar";
import MessageFloat from "../ui/MessageFloat";
import { getCurrentUser, getPublicTutors, submitReport } from "../lib/appStore";

export default function UserReport() {
  const user = getCurrentUser();
  const tutors = getPublicTutors();
  const [type, setType] = useState("website");
  const [targetTutorId, setTargetTutorId] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!message) return;
    submitReport({
      fromRole: "User",
      fromName: user.fullName,
      type,
      targetTutorId: type === "tutor" ? targetTutorId : null,
      message,
    });
    setMessage("");
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 pb-24 sm:pb-8">
      <UserHeader />
      <UserNavbar />
      <MessageFloat />
      <main className="mx-auto w-full max-w-4xl px-4 py-5 md:px-6 lg:px-8">
        <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
          <h1 className="text-3xl font-black text-slate-900">Send Report</h1>
          <form className="mt-5 space-y-3" onSubmit={onSubmit}>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="website">Website Issue</option>
              <option value="tutor">Report Tutor</option>
            </select>

            {type === "tutor" && (
              <select
                value={targetTutorId}
                onChange={(event) => setTargetTutorId(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">Select Tutor</option>
                {tutors.map((tutor) => (
                  <option key={tutor.id} value={tutor.id}>{tutor.fullName}</option>
                ))}
              </select>
            )}

            <textarea
              rows="5"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your report"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
            <button type="submit" className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white">
              Submit Report
            </button>
            {done && <p className="text-sm font-semibold text-emerald-600">Report submitted.</p>}
          </form>
        </section>
      </main>
    </div>
  );
}
