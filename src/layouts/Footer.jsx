import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, GraduationCap, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'

export default function Footer() {
  const socialIcons = [
    { label: 'Facebook', icon: Facebook },
    { label: 'Twitter', icon: Twitter },
    { label: 'LinkedIn', icon: Linkedin },
    { label: 'Instagram', icon: Instagram },
  ]

  return (
    <footer className="mt-6 border-t border-cyan-100 bg-slate-50 px-4 py-12 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 text-2xl font-black text-cyan-700">
              <GraduationCap size={24} className="text-orange-500" />
              TutorHub
            </p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-600">
              Empowering learners with expert tutors for online and home lessons, practical skills,
              and stronger academic confidence.
            </p>
            <div className="mt-5 flex gap-3">
              {socialIcons.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-orange-500 shadow-sm"
                >
                  <Icon size={16} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-800">Quick Links</h3>
            <nav className="mt-4 flex flex-col gap-3 text-slate-600">
              <Link to="/about" className="hover:text-cyan-700">
                About
              </Link>
              <Link to="/newsletter" className="hover:text-cyan-700">
                Newsletter
              </Link>
              <Link to="/contact" className="hover:text-cyan-700">
                Support
              </Link>
              <Link to="/signin" className="hover:text-cyan-700">
                Sign In
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-800">Popular Subjects</h3>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>Mathematics</li>
              <li>Web Development</li>
              <li>Data Science</li>
              <li>English Language</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-800">Contact</h3>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 text-orange-500" />
                <span>hello@tutorhub.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 text-orange-500" />
                <span>+234 800 123 4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-orange-500" />
                <span>12 Learning Avenue, Ikeja, Lagos</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 TutorHub. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
