import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminSignedIn } from "../lib/appStore";

export default function AdminProtectedRoute() {
  if (!isAdminSignedIn()) {
    return <Navigate to="/adminsignin" replace />;
  }
  return <Outlet />;
}
