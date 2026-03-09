import React from 'react'
import AuthLayout from '../ui/AuthLayout'
import AuthSkeleton from '../ui/AuthSkeleton'
import PageReveal from '../ui/PageReveal'
import RoleSignInForm from '../ui/RoleSignInForm'

const authImage =
  'https://images.unsplash.com/photo-1580894732930-0babd100d356?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHV0b3Jpbmd8ZW58MHx8MHx8fDA%3D'

export default function UserSignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100 py-10 md:py-14">
      <PageReveal loader={<AuthSkeleton />}>
        <AuthLayout imageUrl={authImage}>
          <RoleSignInForm role="User" redirectTo="/userdashboard" />
        </AuthLayout>
      </PageReveal>
    </div>
  )
}
