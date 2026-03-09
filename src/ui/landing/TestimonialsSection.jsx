import React from 'react'
import { Quote } from 'lucide-react'

export default function TestimonialsSection({ title, subtitle, testimonials }) {
  return (
    <section className="px-4 pb-16 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl font-black text-slate-900 md:text-4xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-slate-600">{subtitle}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={`${item.name}-${item.role}`}
              className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-lg shadow-cyan-50"
            >
              <Quote size={18} className="text-orange-400" />
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.quote}</p>
              <p className="mt-5 text-base font-black text-slate-900">{item.name}</p>
              <p className="text-sm font-semibold text-cyan-700">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
