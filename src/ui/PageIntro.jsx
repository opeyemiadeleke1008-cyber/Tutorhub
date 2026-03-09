import React from 'react'

export default function PageIntro({ title, description }) {
  return (
    <section className="px-4 pb-16 md:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-cyan-100 bg-white px-6 py-12 shadow-lg shadow-cyan-50 md:px-10">
        <h1 className="text-4xl font-black text-slate-900 md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-slate-600">{description}</p>
      </div>
    </section>
  )
}
