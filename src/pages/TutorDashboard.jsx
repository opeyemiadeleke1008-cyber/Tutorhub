import React, { useEffect, useState } from "react";
import { BadgeCheck, Camera, Clock3, Edit3, Send } from "lucide-react";
import TutorShell from "../ui/TutorShell";
import { getCurrentTutor, submitTutorPublicProfile } from "../lib/appStore";

const emptyForm = { firstName: "", lastName: "", subject: "", picture: "", bio: "" };

export default function TutorDashboard() {
  const tutor = getCurrentTutor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tutor?.publicProfile) setFormData({ ...emptyForm, ...tutor.publicProfile });
  }, [tutor]);

  if (!tutor) {
    return (
      <TutorShell>
        <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
          <p className="text-sm text-slate-600">Tutor session not found.</p>
        </section>
      </TutorShell>
    );
  }

  const isPublic = tutor.approvalStatus === "active" || tutor.approvalStatus === "approved";
  const status = isPublic ? "public" : tutor.approvalStatus;

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData((prev) => ({ ...prev, picture: reader.result }));
    reader.readAsDataURL(file);
  };

  const submitProfile = (event) => {
    event.preventDefault();
    setError("");
    if (!formData.firstName || !formData.lastName || !formData.subject || !formData.picture) {
      setError("All fields are required and profile picture is compulsory.");
      return;
    }
    submitTutorPublicProfile(tutor.id, formData);
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <TutorShell>
      <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
        {(!tutor.publicProfile || tutor.approvalStatus === "none") ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h1 className="text-3xl font-black text-slate-900">No Public Profile Yet</h1>
            <p className="mt-2 text-sm text-slate-600">Set up your tutor profile to submit it to admin.</p>
            <button type="button" onClick={() => setIsModalOpen(true)} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white">
              <Send size={16} /> Set Profile
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900">Tutor Public Profile</h1>
                <p className="mt-1 text-sm text-slate-600">Your profile information and review status.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${status === "public" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {status === "public" ? <BadgeCheck size={14} /> : <Clock3 size={14} />}
                  {status === "public" ? "Public" : "Pending"}
                </span>
                <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white">
                  <Edit3 size={14} /> Edit
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[170px_1fr]">
              <img src={tutor.publicProfile?.picture} alt="Tutor" className="h-40 w-40 rounded-2xl object-cover ring-4 ring-white" />
              <div className="space-y-2 text-sm text-slate-600">
                <p><span className="font-bold text-slate-900">First Name:</span> {tutor.publicProfile?.firstName}</p>
                <p><span className="font-bold text-slate-900">Last Name:</span> {tutor.publicProfile?.lastName}</p>
                <p><span className="font-bold text-slate-900">Subject:</span> {tutor.publicProfile?.subject}</p>
                <p><span className="font-bold text-slate-900">Admin Review:</span> {status === "public" ? "Approved and visible to students." : "Submitted to admin. Waiting for approval."}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-2xl shadow-cyan-900/10">
            <div className="border-b border-slate-100 bg-gradient-to-r from-cyan-50 via-sky-50 to-white px-6 py-5">
              <h2 className="text-2xl font-black text-slate-900">Set Tutor Profile</h2>
              <p className="mt-1 text-sm text-slate-600">
                Fill your profile details and submit for admin review.
              </p>
            </div>

            <form className="space-y-5 px-6 py-6" onSubmit={submitProfile}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:bg-white"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:bg-white"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:bg-white"
              />

              <label className="group flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-cyan-300 bg-cyan-50/60 px-4 py-4 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100/70">
                <Camera size={16} />
                {formData.picture ? "Picture Selected" : "Upload Profile Picture (Required)"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>

              {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">{error}</p>}

              <div className="flex flex-wrap justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-700"
                >
                  Submit to Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </TutorShell>
  );
}
