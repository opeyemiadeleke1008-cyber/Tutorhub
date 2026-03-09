import React, { useMemo, useState } from "react";
import { BadgeCheck, Camera, Mail, MapPin, Phone, Save, UserRound } from "lucide-react";
import TutorShell from "../ui/TutorShell";
import { getCurrentTutor, submitTutorPublicProfile, updateTutor } from "../lib/appStore";

const defaultAvatar =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60";

export default function TutorProfile() {
  const tutor = getCurrentTutor();
  const [profile, setProfile] = useState({
    firstName: tutor?.publicProfile?.firstName || "",
    lastName: tutor?.publicProfile?.lastName || "",
    email: tutor?.email || "",
    phone: tutor?.publicProfile?.phone || "",
    location: tutor?.publicProfile?.location || "",
    subject: tutor?.publicProfile?.subject || "",
    bio: tutor?.publicProfile?.bio || "",
    picture: tutor?.publicProfile?.picture || "",
    role: "Tutor",
  });
  const [saved, setSaved] = useState(false);

  if (!tutor) {
    return (
      <TutorShell>
        <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
          <p className="text-sm text-slate-600">Tutor session not found.</p>
        </section>
      </TutorShell>
    );
  }

  const status =
    tutor.approvalStatus === "active" || tutor.approvalStatus === "approved"
      ? "public"
      : "pending";
  const fullName = useMemo(() => `${profile.firstName} ${profile.lastName}`.trim() || "Tutor Name", [profile.firstName, profile.lastName]);
  const profileImage = useMemo(() => profile.picture || defaultAvatar, [profile.picture]);

  const handleChange = (key, value) => setProfile((prev) => ({ ...prev, [key]: value }));
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfile((prev) => ({ ...prev, picture: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const payload = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      subject: profile.subject,
      picture: profile.picture,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      bio: profile.bio,
      role: "Tutor",
    };

    updateTutor(tutor.id, { email: profile.email, fullName });
    submitTutorPublicProfile(tutor.id, payload);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <TutorShell>
      <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <img src={profileImage} alt="Tutor profile" className="h-full w-full object-cover" />
            </div>
            <label htmlFor="tutor-profile-picture" className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white hover:bg-cyan-700">
              <Camera size={16} /> Change Picture
            </label>
            <input id="tutor-profile-picture" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <h1 className="mt-5 text-center text-xl font-black text-slate-900">{fullName}</h1>
            <p className="text-center text-sm font-semibold text-cyan-700">Tutor</p>
            <p className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${status === "public" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              <BadgeCheck size={14} /> {status === "public" ? "Public" : "Pending Approval"}
            </p>
            <p className="mt-2 text-center text-xs font-bold text-slate-600">
              Verified: {tutor.verified ? "Yes" : "No"} • Rating: {Number(tutor.rating || 0).toFixed(1)}
            </p>
          </aside>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-3xl font-black text-slate-900">Profile Information</h2>
              <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
                <Save size={16} /> Save Changes
              </button>
            </div>

            {saved && <p className="mb-4 rounded-xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">Tutor profile saved and submitted to admin for review.</p>}

            <div className="grid gap-4 md:grid-cols-2">
              <label className="rounded-xl border border-slate-200 bg-white px-3 py-2"><span className="mb-1 inline-block text-xs font-bold text-slate-500">First Name</span><div className="flex items-center gap-2"><UserRound size={15} className="text-slate-400" /><input type="text" value={profile.firstName} onChange={(e) => handleChange("firstName", e.target.value)} placeholder="Enter first name" className="w-full bg-transparent text-sm outline-none" /></div></label>
              <label className="rounded-xl border border-slate-200 bg-white px-3 py-2"><span className="mb-1 inline-block text-xs font-bold text-slate-500">Last Name</span><div className="flex items-center gap-2"><UserRound size={15} className="text-slate-400" /><input type="text" value={profile.lastName} onChange={(e) => handleChange("lastName", e.target.value)} placeholder="Enter last name" className="w-full bg-transparent text-sm outline-none" /></div></label>
              <label className="rounded-xl border border-slate-200 bg-white px-3 py-2"><span className="mb-1 inline-block text-xs font-bold text-slate-500">Email</span><div className="flex items-center gap-2"><Mail size={15} className="text-slate-400" /><input type="email" value={profile.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="Enter your email" className="w-full bg-transparent text-sm outline-none" /></div></label>
              <label className="rounded-xl border border-slate-200 bg-white px-3 py-2"><span className="mb-1 inline-block text-xs font-bold text-slate-500">Phone</span><div className="flex items-center gap-2"><Phone size={15} className="text-slate-400" /><input type="text" value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="Enter phone number" className="w-full bg-transparent text-sm outline-none" /></div></label>
              <label className="rounded-xl border border-slate-200 bg-white px-3 py-2"><span className="mb-1 inline-block text-xs font-bold text-slate-500">Location</span><div className="flex items-center gap-2"><MapPin size={15} className="text-slate-400" /><input type="text" value={profile.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="Enter your location" className="w-full bg-transparent text-sm outline-none" /></div></label>
              <label className="rounded-xl border border-slate-200 bg-white px-3 py-2"><span className="mb-1 inline-block text-xs font-bold text-slate-500">Subject</span><input type="text" value={profile.subject} onChange={(e) => handleChange("subject", e.target.value)} placeholder="e.g. Mathematics" className="w-full bg-transparent text-sm outline-none" /></label>
            </div>

            <label className="mt-4 block rounded-xl border border-slate-200 bg-white px-3 py-2"><span className="mb-1 inline-block text-xs font-bold text-slate-500">Bio</span><textarea rows="4" value={profile.bio} onChange={(e) => handleChange("bio", e.target.value)} placeholder="Write a short teaching bio..." className="w-full resize-none bg-transparent text-sm outline-none" /></label>
          </section>
        </div>
      </section>
    </TutorShell>
  );
}
