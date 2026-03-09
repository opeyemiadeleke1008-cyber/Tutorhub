import React from 'react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-6 md:px-8 md:pb-20">
      <div className="absolute -left-20 top-4 h-52 w-52 rounded-full bg-cyan-200/60 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-orange-200/60 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">
            Education Hub for Students and Tutors
          </p>
          <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
            Learn smarter with trusted tutors, online or at home.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            TutorHub helps learners discover qualified tutors, compare profiles, and book lessons
            that fit their goals and schedule.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/signin"
              className="rounded-full bg-cyan-600 px-7 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-cyan-700"
            >
              Start Learning
            </Link>
            <Link
              to="/about"
              className="rounded-full border-2 border-orange-400 px-7 py-3 text-sm font-bold text-orange-600 transition-transform hover:scale-105 hover:bg-orange-50"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-cyan-100">
          <h2 className="text-lg font-extrabold text-slate-900">Why TutorHub Works</h2>
          <div className="mt-5 space-y-4">
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-bold text-cyan-700">Online Lessons</h3>
              <p className="mt-1 text-sm text-slate-600">
                Join live classes from anywhere with whiteboard support and session recordings.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-bold text-cyan-700">Home Lessons</h3>
              <p className="mt-1 text-sm text-slate-600">
                Book local tutors for in-person support tailored to your pace.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h3 className="font-bold text-cyan-700">Verified Tutors</h3>
              <p className="mt-1 text-sm text-slate-600">
                Tutor profiles are screened and rated by learners and parents.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
