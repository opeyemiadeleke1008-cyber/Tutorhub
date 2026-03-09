import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function RoleSignInForm({ role, redirectTo }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const isSignUp = activeTab === 'signup'
  const storageKey =
    role === 'Tutor'
      ? 'tutorhubTutorProfile'
      : role === 'Admin'
      ? 'tutorhubAdminProfile'
      : 'tutorhubUserProfile'

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!email || !password || (isSignUp && !fullName)) {
      setError('Please fill all required fields.')
      return
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const existingProfile = JSON.parse(localStorage.getItem(storageKey) || '{}')
    const existingTutorPublicProfile =
      role === 'Tutor'
        ? JSON.parse(localStorage.getItem('tutorhubTutorPublicProfile') || 'null')
        : null
    const profile = {
      ...existingProfile,
      fullName: isSignUp ? fullName : existingProfile.fullName || email.split('@')[0],
      email,
      role,
      ...(role === 'Tutor' && existingTutorPublicProfile
        ? { publicProfile: existingTutorPublicProfile }
        : {}),
    }

    localStorage.setItem(storageKey, JSON.stringify(profile))

    if (redirectTo) {
      navigate(redirectTo)
    }
  }

  return (
    <>
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
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        {isSignUp ? 'Create your account' : 'Sign in'} as {role}.
      </p>

      <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3">
            <UserRound size={16} className="text-slate-500" />
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full bg-transparent text-sm outline-none"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>
        )}

        <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3">
          <Mail size={16} className="text-slate-500" />
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full bg-transparent text-sm outline-none"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3">
          <Lock size={16} className="text-slate-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            className="w-full bg-transparent text-sm outline-none"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="text-slate-500"
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>

        {isSignUp && (
          <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3">
            <Lock size={16} className="text-slate-500" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              className="w-full bg-transparent text-sm outline-none"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              className="text-slate-500"
            >
              {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" className="accent-orange-500" />
            Remember me
          </label>
          <button type="button" className="font-semibold text-orange-500">
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-slate-800 px-5 py-3 text-base font-bold text-white transition-colors hover:bg-slate-900"
        >
          {isSignUp ? 'Create Account' : 'Sign In'} as {role}
        </button>
        {error && <p className="text-center text-sm font-semibold text-red-500">{error}</p>}
      </form>
    </>
  )
}
