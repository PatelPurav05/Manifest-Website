"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

export function TestimonialsSection() {
  const quotes = [
    {
      name: "J. Park",
      role: "Founder, Citrus AI",
      quote:
        "Manifest gave us tight feedback loops and investor intros that changed our trajectory. Zero fluff, all signal.",
      img: "/founder-portrait.png",
    },
    {
      name: "L. Nguyen",
      role: "PM, Anteater Labs",
      quote:
        "The builder hours culture pushed us to ship weekly. The momentum you get here is rare on campus.",
      img: "/student-profile.png",
    },
    {
      name: "A. Cohen",
      role: "Investor, Alumni",
      quote:
        "Strong talent density and a bias to build. This is where I look for the next generation of founders.",
      img: "/mentor-portrait.png",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-5 bg-slate-2">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-4 mb-14">
            <h2 className="text-4xl sm:text-5xl font-medium text-slate-12 tracking-tight">What People Say</h2>
            <p className="text-slate-11 text-lg">External perspective on the community’s momentum.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              className="rounded-2xl border border-slate-6 bg-slate-1 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={q.img || "/placeholder.svg"}
                  alt={`${q.name} headshot`}
                  className="w-10 h-10 rounded-full object-cover bg-slate-3"
                />
                <div>
                  <div className="text-slate-12 font-medium">{q.name}</div>
                  <div className="text-slate-10 text-sm">{q.role}</div>
                </div>
              </div>
              <blockquote className="text-slate-11">{'“'}{q.quote}{'”'}</blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
