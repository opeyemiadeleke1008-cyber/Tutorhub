import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function UserProtectedRoute() {
  const location = useLocation();
  const storedProfile = localStorage.getItem("tutorhubUserProfile");
  const profile = storedProfile ? JSON.parse(storedProfile) : null;

  const isAuthenticatedUser = Boolean(profile?.email) && profile?.role === "User";

  if (!isAuthenticatedUser) {
    return <Navigate to="/usersignin" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
