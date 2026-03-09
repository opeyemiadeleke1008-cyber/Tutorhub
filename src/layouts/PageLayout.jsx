import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-orange-50 text-slate-800">
      <Header />
      <main className="pt-28 md:pt-32">{children}</main>
      <Footer />
    </div>
  )
}
