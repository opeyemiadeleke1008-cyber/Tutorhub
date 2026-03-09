import React from "react";
import AdminAside from "./AdminAside";

export default function AdminShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-sky-50 pb-24 lg:pb-6">
      <main className="mx-auto flex w-full max-w-7xl gap-4 px-4 py-4 md:px-6 lg:px-8">
        <AdminAside />
        <section className="w-full">{children}</section>
      </main>
    </div>
  );
}
