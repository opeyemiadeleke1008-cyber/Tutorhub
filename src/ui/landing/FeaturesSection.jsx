import React from 'react'

const features = [
  {
    title: 'Smart Matching',
    description: 'Get matched with tutors based on your goals, level, and preferred lesson style.',
  },
  {
    title: 'Flexible Scheduling',
    description: 'Choose weekday, weekend, or evening sessions that fit your routine.',
  },
  {
    title: 'Progress Tracking',
    description: 'Follow milestones and monitor improvements lesson by lesson.',
  },
  {
    title: 'Safe Payments',
    description: 'Book confidently with secure checkout and transparent pricing.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="px-4 pb-16 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl font-black text-slate-900 md:text-4xl">Platform Features</h2>
        <p className="mt-2 text-slate-600">Everything you need for better learning outcomes.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-lg shadow-cyan-50 transition-transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-extrabold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
