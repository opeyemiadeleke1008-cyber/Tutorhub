import React, { useState } from "react";
import TutorShell from "../ui/TutorShell";
import { getCurrentTutor, submitReport } from "../lib/appStore";

export default function TutorReport() {
  const tutor = getCurrentTutor();
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!message) return;
    submitReport({
      fromRole: "Tutor",
      fromName: tutor?.fullName || "Tutor",
      type: "website",
      message,
    });
    setMessage("");
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  return (
    <TutorShell>
      <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
        <h1 className="text-3xl font-black text-slate-900">Tutor Report</h1>
        <p className="mt-2 text-slate-600">Send issues/feedback to admin.</p>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <textarea
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the issue"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white">
            Submit Report
          </button>
          {done && <p className="text-sm font-semibold text-emerald-600">Report sent to admin.</p>}
        </form>
      </section>
    </TutorShell>
  );
}
