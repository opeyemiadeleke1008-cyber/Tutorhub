import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { tutorSignIn, tutorSignUp } from "../lib/appStore";
import AuthLayout from "../ui/AuthLayout";
import AuthSkeleton from "../ui/AuthSkeleton";
import PageReveal from "../ui/PageReveal";

const authImage =
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1000&auto=format&fit=crop&q=60";

export default function TutorSignIn() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isSignUp = tab === "signup";

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (!email || !password || (isSignUp && !fullName)) {
      setError("Please fill all required fields.");
      return;
    }
    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (isSignUp) {
      const result = tutorSignUp({ fullName, email, password });
      if (!result.ok) {
        setError("Tutor account with this email already exists.");
        return;
      }
      navigate("/tutordashboard");
      return;
    }

    const result = tutorSignIn({ email, password });
    if (!result.ok) {
      if (result.reason === "disabled") {
        setError("Your tutor account has been disabled by admin.");
      } else {
        setError("Invalid tutor credentials.");
      }
      return;
    }
    navigate("/tutordashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100 py-10 md:py-14">
      <PageReveal loader={<AuthSkeleton />}>
        <AuthLayout imageUrl={authImage}>
          <div className="mb-5 grid grid-cols-2 rounded-full border border-slate-300 bg-white p-1">
            <button
              type="button"
              onClick={() => setTab("signin")}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                tab === "signin" ? "bg-slate-800 text-white" : "text-slate-700"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                tab === "signup" ? "bg-slate-800 text-white" : "text-slate-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            {isSignUp ? "Tutor Sign Up" : "Tutor Sign In"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {isSignUp
              ? "Create your tutor account to submit your public profile."
              : "Sign in to continue to tutor dashboard."}
          </p>

          <form className="mt-7 space-y-5" onSubmit={onSubmit}>
            {isSignUp && (
              <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3">
                <UserRound size={16} className="text-slate-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            )}
            <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3">
              <Mail size={16} className="text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email address"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3">
              <Lock size={16} className="text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            {isSignUp && (
              <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3">
                <Lock size={16} className="text-slate-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-transparent text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-slate-500"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            )}
            {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-slate-800 px-5 py-3 text-base font-bold text-white transition-colors hover:bg-slate-900"
            >
              {isSignUp ? "Create Tutor Account" : "Sign In as Tutor"}
            </button>
          </form>
        </AuthLayout>
      </PageReveal>
    </div>
  );
}
