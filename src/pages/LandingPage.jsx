import React from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../layouts/PageLayout'
import HeroSection from '../ui/landing/HeroSection'
import FeaturesSection from '../ui/landing/FeaturesSection'
import FaqSection from '../ui/landing/FaqSection'
import TestimonialsSection from '../ui/landing/TestimonialsSection'
import StatsSection from '../ui/landing/StatsSection'

const testimonials = [
  {
    name: 'Amara Joseph',
    role: 'Parent',
    quote:
      'TutorHub helped us find a reliable home tutor in two days. My son now studies with more confidence.',
  },
  {
    name: 'Ibrahim Kale',
    role: 'WAEC Student',
    quote:
      'The online lessons were clear and flexible. I improved in Mathematics and English within a month.',
  },
  {
    name: 'Sandra Cole',
    role: 'Chemistry Tutor',
    quote:
      'The platform makes it easy to connect with committed students and manage my lesson calendar.',
  },
]

const stats = [
  { value: '3,500+', label: 'Active Students' },
  { value: '850+', label: 'Verified Tutors' },
  { value: '20+', label: 'Subjects Covered' },
  { value: '4.9/5', label: 'Average Rating' },
]

export default function LandingPage() {
  return (
    <PageLayout>
      <HeroSection />
      <FeaturesSection />
      <StatsSection
        title="Trusted by a growing learning community"
        subtitle="TutorHub connects learners and tutors with transparent profiles and proven outcomes."
        stats={stats}
      />
      <TestimonialsSection
        title="What Students and Parents Say"
        subtitle="Real stories from learners, guardians, and tutors using TutorHub every week."
        testimonials={testimonials}
      />

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto w-full max-w-6xl rounded-3xl bg-gradient-to-r from-cyan-600 to-orange-500 px-6 py-12 text-white md:px-10">
          <h2 className="text-3xl font-black md:text-4xl">Ready to Learn or Teach?</h2>
          <p className="mt-3 max-w-3xl text-cyan-50">
            Join TutorHub to connect with students, grow your confidence, and reach your academic
            goals with expert support.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              to="/signin"
              className="rounded-full bg-white px-6 py-3 text-sm font-black text-cyan-700 transition-transform hover:scale-105"
            >
              Sign In to Continue
            </Link>
            <Link
              to="/newsletter"
              className="rounded-full border-2 border-white px-6 py-3 text-sm font-black text-white transition-transform hover:scale-105"
            >
              Join Newsletter
            </Link>
          </div>
        </div>
      </section>

      <FaqSection />
    </PageLayout>
  )
}
