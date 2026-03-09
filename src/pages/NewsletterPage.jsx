import React from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import PageLayout from '../layouts/PageLayout'

export default function NewsletterPage() {
  return (
    <PageLayout>
      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto w-full max-w-4xl rounded-3xl border border-cyan-100 bg-white p-6 shadow-xl shadow-cyan-50 md:p-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">
            <Mail size={14} />
            TutorHub Newsletter
          </p>
          <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">Stay updated weekly</h1>
          <p className="mt-3 text-slate-600">
            Get study hacks, platform updates, tutor success stories, and free educational resources
            directly in your inbox.
          </p>

          <form className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition-colors hover:bg-orange-600"
            >
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              'Weekly learning tips',
              'New tutor spotlights',
              'Free lesson resources',
            ].map((item) => (
              <article key={item} className="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                {item}
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
