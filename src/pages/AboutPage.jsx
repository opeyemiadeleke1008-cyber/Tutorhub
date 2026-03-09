import React from 'react'
import PageLayout from '../layouts/PageLayout'

export default function AboutPage() {
  return (
    <PageLayout>
      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-3xl border border-cyan-100 bg-white p-7 shadow-xl shadow-cyan-50 md:p-10">
            <p className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
              About TutorHub
            </p>
            <h1 className="mt-5 text-4xl font-black text-slate-900 md:text-5xl">
              Building a learning community where every student can thrive
            </h1>

            <div className="mt-8 space-y-5 text-slate-600">
              <p>
                TutorHub started with one clear goal: make quality education easier to access for
                every learner. We saw that many students and parents struggle to find trustworthy
                tutors, compare teaching styles, and manage lesson schedules that fit daily life.
                At the same time, many great tutors needed a better way to reach serious learners.
                TutorHub was built to connect both sides in one focused, safe, and easy-to-use
                educational hub.
              </p>
              <p>
                Our platform supports both online and home lessons, because learning is not one
                size fits all. Some learners perform better in virtual sessions with digital tools,
                while others gain confidence in face-to-face coaching at home. TutorHub allows
                families and students to choose what works best for them, with transparent profiles,
                clear pricing, and flexible booking options.
              </p>
              <p>
                We care deeply about quality. Every tutor profile is reviewed to maintain teaching
                standards and trust. Students can read reviews, track performance progress, and
                continue with tutors who match their goals. Whether a learner is preparing for
                school exams, developing professional skills, or improving confidence in core
                subjects, TutorHub is designed to make progress consistent and measurable.
              </p>
              <p>
                Beyond matching tutors and students, TutorHub is becoming a growing learning
                ecosystem. We share study resources, learning strategies, and education updates that
                help learners and tutors stay informed. Our long-term vision is to be the most
                reliable tutoring platform for families, schools, and independent learners across
                different regions.
              </p>
              <p>
                At TutorHub, we believe education can change life outcomes. That is why we continue
                building tools that make learning more accessible, tutoring more effective, and
                academic goals more achievable for everyone in our community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
