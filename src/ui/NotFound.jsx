import React from 'react'

export default function NotFound() {
  return (
      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-red-50">
          <h1 className="text-5xl font-black text-slate-900">404</h1>
          <p className="mt-2 text-lg font-bold text-red-500">Page Not Found</p>
          <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
        </div>
      </section>
  )
}
