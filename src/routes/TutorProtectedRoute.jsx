import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentTutor } from "../lib/appStore";

export default function TutorProtectedRoute() {
  const location = useLocation();
  const tutor = getCurrentTutor();
  const isAuthenticatedTutor = Boolean(tutor?.email) && tutor?.role === "Tutor";

  if (!isAuthenticatedTutor) {
    return <Navigate to="/tutorsignin" replace state={{ from: location.pathname }} />;
  }
  if (tutor.accountStatus === "disabled") {
    return <Navigate to="/tutorsignin" replace />;
  }

  return <Outlet />;
}
