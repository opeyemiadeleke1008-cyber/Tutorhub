import React, { useEffect, useMemo, useState } from "react";
import { Camera, Mail, MapPin, Phone, Save, UserRound, User } from "lucide-react";
import UserHeader from "../ui/UserHeader";
import UserNavbar from "../ui/UserNavbar";
import MessageFloat from "../ui/MessageFloat";

const defaultAvatar = "";

export default function UserProfile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    classLevel: "",
    learningGoal: "",
    bio: "",
    avatar: "",
    role: "User",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("tutorhubUserProfile");
    if (stored) {
      setProfile((prev) => ({ ...prev, ...JSON.parse(stored) }));
    }
  }, []);

  const profileImage = useMemo(() => profile.avatar || defaultAvatar, [profile.avatar]);

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("tutorhubUserProfile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 pb-24 sm:pb-8">
      <UserHeader />
      <UserNavbar />
      <MessageFloat />

      <main className="mx-auto w-full max-w-6xl px-4 py-5 md:px-6 lg:px-8">
        <section className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-xl shadow-cyan-100 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
              </div>

              <label
                htmlFor="profile-picture"
                className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white hover:bg-cyan-700"
              >
                <Camera size={16} />
                Change Picture
              </label>
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              <h1 className="mt-5 text-center text-xl font-black text-slate-900">
                {profile.fullName || "Your Name"}
              </h1>
              <p className="text-center text-sm font-semibold text-cyan-700">{profile.role}</p>
            </aside>

            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-3xl font-black text-slate-900">Profile Information</h2>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>

              {saved && (
                <p className="mb-4 rounded-xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">
                  Profile saved successfully.
                </p>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <label className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <span className="mb-1 inline-block text-xs font-bold text-slate-500">Full Name</span>
                  <div className="flex items-center gap-2">
                    <UserRound size={15} className="text-slate-400" />
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(event) => handleChange("fullName", event.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </label>

                <label className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <span className="mb-1 inline-block text-xs font-bold text-slate-500">Email</span>
                  <div className="flex items-center gap-2">
                    <Mail size={15} className="text-slate-400" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(event) => handleChange("email", event.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </label>

                <label className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <span className="mb-1 inline-block text-xs font-bold text-slate-500">Phone</span>
                  <div className="flex items-center gap-2">
                    <Phone size={15} className="text-slate-400" />
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(event) => handleChange("phone", event.target.value)}
                      placeholder="Enter phone number"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </label>

                <label className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <span className="mb-1 inline-block text-xs font-bold text-slate-500">Location</span>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-slate-400" />
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(event) => handleChange("location", event.target.value)}
                      placeholder="Enter your location"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </label>

                <label className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <span className="mb-1 inline-block text-xs font-bold text-slate-500">Class Level</span>
                  <input
                    type="text"
                    value={profile.classLevel}
                    onChange={(event) => handleChange("classLevel", event.target.value)}
                    placeholder="e.g. SS2, 200 Level"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </label>

                <label className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <span className="mb-1 inline-block text-xs font-bold text-slate-500">Learning Goal</span>
                  <input
                    type="text"
                    value={profile.learningGoal}
                    onChange={(event) => handleChange("learningGoal", event.target.value)}
                    placeholder="e.g. WAEC A1 in Mathematics"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </label>
              </div>

              <label className="mt-4 block rounded-xl border border-slate-200 bg-white px-3 py-2">
                <span className="mb-1 inline-block text-xs font-bold text-slate-500">Short Bio</span>
                <textarea
                  rows="4"
                  value={profile.bio}
                  onChange={(event) => handleChange("bio", event.target.value)}
                  placeholder="Tell tutors about your learning style and preferred schedule..."
                  className="w-full resize-none bg-transparent text-sm outline-none"
                />
              </label>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
