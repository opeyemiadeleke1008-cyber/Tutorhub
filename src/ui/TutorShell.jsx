import React from "react";
import TutorAside from "./TutorAside";

export default function TutorShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50 pb-24 lg:pb-6">
      <main className="mx-auto flex w-full max-w-7xl gap-4 px-4 py-4 md:px-6 lg:px-8">
        <TutorAside />
        <section className="w-full">{children}</section>
      </main>
    </div>
  );
}
