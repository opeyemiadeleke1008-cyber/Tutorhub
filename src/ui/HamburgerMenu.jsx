import React from 'react'
import { Link } from 'react-router-dom'
import { LogIn, Menu, X } from 'lucide-react'

export default function HamburgerMenu({ isOpen, onToggle, onClose, navLinks }) {
  return (
    <div className="relative md:hidden">
      <button
        type="button"
        className="rounded-full border border-cyan-200 px-2 py-3 text-cyan-700 md:hidden"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {isOpen ? <X size={18} strokeWidth={3} /> : <div className='flex flex-col gap-1'><span className='h-0.5 w-6 rounded-full bg-gray-800'></span><span className='h-0.5 w-4 rounded-full bg-gray-800'></span><span className='h-0.5 w-5 rounded-full bg-gray-800'></span></div>}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-cyan-100 bg-white p-3 shadow-xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="rounded-lg px-3 py-2 font-semibold text-slate-700 transition-colors hover:bg-cyan-50 hover:text-cyan-700"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/signin"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-center text-sm font-bold text-white"
              onClick={onClose}
            >
              <LogIn size={16} />
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
