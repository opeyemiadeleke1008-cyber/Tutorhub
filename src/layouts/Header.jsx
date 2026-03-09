import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HamburgerMenu from '../ui/HamburgerMenu'

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Newsletter', to: '/newsletter' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open)

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[min(94%,1120px)] -translate-x-1/2">
      <div className="rounded-2xl border border-cyan-100 bg-white/95 px-4 py-3 shadow-xl shadow-cyan-100 backdrop-blur-sm md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-cyan-700"
            onClick={closeMobileMenu}
          >
            TutorHub
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-semibold text-slate-700 transition-colors hover:text-cyan-700"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/signin"
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-orange-600"
            >
              Sign In
            </Link>
          </nav>

          <HamburgerMenu
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
            onClose={closeMobileMenu}
            navLinks={navLinks}
          />
        </div>
      </div>
    </header>
  )
}
