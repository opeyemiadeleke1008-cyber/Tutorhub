import React, { useMemo, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { ADMIN_EMAIL, adminSignIn, createAdminAccount, getAdminAccount, isAdminSignedIn } from "../lib/appStore";
import AuthLayout from "../ui/AuthLayout";
import AuthSkeleton from "../ui/AuthSkeleton";
import PageReveal from "../ui/PageReveal";

const authImage =
  "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=1000&auto=format&fit=crop&q=60";

export default function AdminSignIn() {
  const navigate = useNavigate();
  const account = getAdminAccount();
  const isFirstTimeSetup = !account;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const heading = useMemo(
    () => (isFirstTimeSetup ? "Admin First-Time Setup" : "Admin Sign In"),
    [isFirstTimeSetup]
  );

  if (isAdminSignedIn()) {
    return <Navigate to="/admindashboard" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (email !== ADMIN_EMAIL) {
      setError("Invalid admin credentials.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (isFirstTimeSetup) {
      if (!confirmPassword) {
        setError("Please confirm password.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      createAdminAccount(password);
      const result = adminSignIn(email, password);
      if (result.ok) navigate("/admindashboard");
      return;
    }

    const result = adminSignIn(email, password);
    if (!result.ok) {
      setError("Invalid admin credentials.");
      return;
    }
    navigate("/admindashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100 py-10 md:py-14">
      <PageReveal loader={<AuthSkeleton />}>
        <AuthLayout imageUrl={authImage}>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">{heading}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {isFirstTimeSetup ? "Create admin password for first-time access." : "Sign in as admin."}
          </p>

          <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3">
              <Mail size={16} className="text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter admin email"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3">
              <Lock size={16} className="text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={isFirstTimeSetup ? "Set admin password" : "Enter password"}
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
            {isFirstTimeSetup && (
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
              {isFirstTimeSetup ? "Create Admin Password" : "Sign In as Admin"}
            </button>
          </form>
        </AuthLayout>
      </PageReveal>
    </div>
  );
}
