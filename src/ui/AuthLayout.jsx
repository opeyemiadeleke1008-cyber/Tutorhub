import React from 'react'
import { ArrowLeft, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AuthLayout({ children, imageUrl }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16">
      <div className="overflow-hidden rounded-3xl border border-amber-900/20 bg-[#f6f3ea] p-3 shadow-2xl md:p-5">
        <div className="grid gap-4 md:grid-cols-[1.05fr_1fr] lg:grid-cols-[1.15fr_1fr]">
          <aside className="relative hidden min-h-[520px] overflow-hidden rounded-2xl md:block">
            <img src={imageUrl} alt="TutorHub Sign In" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/5" />
            <div className="absolute left-5 top-5 flex items-center gap-2 text-white">
              <GraduationCap size={22} className="text-orange-400" />
              <span className="text-2xl font-black tracking-tight">TutorHub</span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="max-w-md text-sm text-white/85">
                Learn with trusted tutors online or at home. Build confidence and reach your goals
                with guided lessons tailored to your pace.
              </p>
              <p className="mt-5 text-xl font-bold">Welcome Back</p>
              <p className="text-sm text-white/80">Continue your learning journey</p>
            </div>
          </aside>

          <div className="rounded-2xl bg-[#f6f3ea] p-5 md:p-8">
            <div className="mb-4 flex justify-end">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <ArrowLeft size={16} />
                Back Home
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
