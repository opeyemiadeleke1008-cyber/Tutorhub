import React from 'react'

export default function StatsSection({ title, subtitle, stats }) {
  return (
    <section className="px-4 pb-16 md:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-3xl bg-white p-6 shadow-xl shadow-cyan-50 md:p-10">
        <h2 className="text-3xl font-black text-slate-900 md:text-4xl">{title}</h2>
        <p className="mt-2 text-slate-600">{subtitle}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article key={item.label} className="rounded-2xl bg-slate-50 p-5 text-center">
              <p className="text-3xl font-black text-cyan-700">{item.value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
