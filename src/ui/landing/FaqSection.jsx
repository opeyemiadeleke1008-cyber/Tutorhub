import React, { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

const faqs = [
  {
    question: 'Can I book both online and home lessons?',
    answer:
      'Yes. You can select your preferred lesson format when searching tutors and booking sessions.',
  },
  {
    question: 'How are tutors verified?',
    answer:
      'Each tutor profile is reviewed for teaching experience, subject expertise, and student feedback.',
  },
  {
    question: 'Do I need a subscription to use TutorHub?',
    answer: 'No subscription is required. You can book lessons based on your preferred budget and schedule.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="px-4 pb-20 md:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-3xl bg-slate-900 px-6 py-10 text-white md:px-10">
        <h2 className="text-3xl font-black md:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <article key={faq.question} className="rounded-xl bg-white/10 p-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <span className="text-base font-bold">{faq.question}</span>
                  <span className="relative inline-flex h-6 w-6 items-center justify-center">
                    <Plus
                      size={18}
                      className={`absolute transition-all duration-300 ${
                        isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                      }`}
                    />
                    <Minus
                      size={18}
                      className={`absolute transition-all duration-300 ${
                        isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                      }`}
                    />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="mt-3 text-sm text-slate-200">{faq.answer}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
