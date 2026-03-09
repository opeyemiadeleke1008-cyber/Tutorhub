import React from 'react'

export default function AuthSkeleton() {
  return (
    <section className="mx-auto w-full max-w-6xl animate-pulse px-4 pb-16">
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-3 shadow-2xl backdrop-blur-sm md:p-5">
        <div className="grid gap-4 md:grid-cols-[1.05fr_1fr] lg:grid-cols-[1.15fr_1fr]">
          <div className="hidden h-[520px] rounded-2xl bg-white md:block" />
          <div className="rounded-2xl bg-white p-6">
            <div className="h-8 w-36 rounded bg-slate-100" />
            <div className="mt-3 h-4 w-64 rounded bg-slate-100" />
            <div className="mt-8 h-11 rounded-full bg-slate-100" />
            <div className="mt-5 h-11 rounded-full bg-slate-100" />
            <div className="mt-6 h-12 rounded-full bg-slate-100" />
            <div className="mt-6 h-4 rounded bg-slate-100" />
            <div className="mt-3 h-12 rounded-full bg-slate-100" />
            <div className="mt-3 h-12 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    </section>
  )
}
