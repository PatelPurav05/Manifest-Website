"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

const faqs = [
  {
    q: "Who should apply?",
    a: "Ambitious builders—engineers, designers, and founders who want to ship, iterate, and grow with a high-density community.",
  },
  {
    q: "Do I need an idea already?",
    a: "No. Many members join to find cofounders and explore domains. What matters is your bias toward building.",
  },
  {
    q: "What’s the weekly commitment?",
    a: "2–5 hours. Builder hours, workshops, and optional firesides. During crunch, teams often do more.",
  },
  {
    q: "Is it open to all majors?",
    a: "Yes. We value interdisciplinary teams—CS, design, business, science, and more.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-4xl sm:text-5xl font-medium text-slate-12 tracking-tight">FAQ</h2>
            <p className="text-slate-11">Quick answers to the most common questions.</p>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <motion.details
              key={item.q}
              className="group rounded-xl border border-slate-6 bg-slate-1 p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-12 font-medium">{item.q}</h3>
                  <span className="text-slate-10 text-sm group-open:hidden">Show</span>
                  <span className="text-slate-10 text-sm hidden group-open:inline">Hide</span>
                </div>
              </summary>
              <div className="mt-3 text-slate-11">{item.a}</div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}
