import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, UserRound, UserRoundPen } from 'lucide-react'
import AuthLayout from '../ui/AuthLayout'
import AuthSkeleton from '../ui/AuthSkeleton'
import PageReveal from '../ui/PageReveal'

const authImage =
  'https://images.unsplash.com/photo-1580894732930-0babd100d356?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHV0b3Jpbmd8ZW58MHx8MHx8fDA%3D'

export default function SignInPage() {
  const [activeTab, setActiveTab] = useState('signin')

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100 py-10 md:py-14">
      <PageReveal loader={<AuthSkeleton />}>
        <AuthLayout imageUrl={authImage}>
          <div className="mb-5 grid grid-cols-2 rounded-full border border-slate-300 bg-white p-1">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                activeTab === 'signin' ? 'bg-slate-800 text-white' : 'text-slate-700'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                activeTab === 'signup' ? 'bg-slate-800 text-white' : 'text-slate-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            {activeTab === 'signup' ? 'Sign Up' : 'Sign In'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Choose how you want to {activeTab === 'signup' ? 'register' : 'continue'}.
          </p>

          <div className="mt-10 space-y-4">
            <Link
              to="/usersignin"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-800 px-5 py-3 text-base font-bold text-white transition-colors hover:bg-slate-900"
            >
              <UserRound size={18} />
              {activeTab === 'signup' ? 'Sign Up as User' : 'Sign In as User'}
            </Link>
            <Link
              to="/tutorsignin"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-base font-bold text-slate-700 transition-colors hover:bg-slate-100"
            >
              <UserRoundPen size={18} />
              {activeTab === 'signup' ? 'Sign Up as Tutor' : 'Sign In as Tutor'}
            </Link>
            <Link
              to="/adminsignin"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-orange-300 bg-orange-100 px-5 py-3 text-base font-bold text-orange-700 transition-colors hover:bg-orange-200"
            >
              <ShieldCheck size={18} />
              {activeTab === 'signup' ? 'Sign Up as Admin' : 'Sign In as Admin'}
            </Link>
          </div>
        </AuthLayout>
      </PageReveal>
    </div>
  )
}
