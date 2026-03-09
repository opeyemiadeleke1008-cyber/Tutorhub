import React from 'react'
import { Clock3, Mail, MapPin, Phone, Send } from 'lucide-react'
import PageLayout from '../layouts/PageLayout'

export default function ContactPage() {
  return (
    <PageLayout>
      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-xl shadow-cyan-50 md:p-8">
            <h1 className="text-4xl font-black text-slate-900">Contact Us</h1>
            <p className="mt-3 text-slate-600">
              Need support with tutor bookings, account access, or lesson management? Send us a
              message and our team will respond quickly.
            </p>

            <form className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
                />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
              />
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-700"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </article>

          <article className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl md:p-8">
            <h2 className="text-2xl font-black">Support Details</h2>
            <ul className="mt-5 space-y-4 text-slate-200">
              <li>
                <p className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                  <Mail size={14} />
                  Email
                </p>
                <p className="pl-6">support@tutorhub.com</p>
              </li>
              <li>
                <p className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                  <Phone size={14} />
                  Phone
                </p>
                <p className="pl-6">+234 800 123 4567</p>
              </li>
              <li>
                <p className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                  <MapPin size={14} />
                  Office
                </p>
                <p className="pl-6">12 Learning Avenue, Ikeja, Lagos</p>
              </li>
              <li>
                <p className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                  <Clock3 size={14} />
                  Hours
                </p>
                <p className="pl-6">Monday - Saturday, 8:00 AM - 6:00 PM</p>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </PageLayout>
  )
}
