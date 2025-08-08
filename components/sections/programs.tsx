"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"
import { Users, Rocket, GraduationCap } from 'lucide-react'

export function ProgramsSection() {
  const programs = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Builder Hours",
      desc: "Weekly co-working sessions to build, ship, and get feedback.",
      bullets: ["Peer reviews", "Shipping goals", "Demo time"],
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Workshops",
      desc: "Hands-on, expert-led sessions on product, AI, GTM, and more.",
      bullets: ["From 0→1 product", "PMF & GTM", "Fundraising basics"],
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Firesides",
      desc: "Chats with founders, operators, and investors—no fluff.",
      bullets: ["Founder playbooks", "Hiring & scaling", "Investor Q&A"],
    },
  ]

  return (
    <section id="programs" className="py-16 md:py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-4 mb-14">
            <h2 className="text-4xl sm:text-5xl font-medium text-slate-12 tracking-tight">What We Do</h2>
            <p className="text-slate-11 text-lg">Tight feedback loops. Real momentum. A culture of shipping.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              className="bg-slate-1 border border-slate-6 rounded-2xl p-8 group hover:border-slate-8 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-12 text-slate-1 flex items-center justify-center mb-5">
                {p.icon}
              </div>
              <h3 className="text-2xl font-medium text-slate-12 mb-2 group-hover:text-slate-11">{p.title}</h3>
              <p className="text-slate-11 mb-4">{p.desc}</p>
              <ul className="text-sm text-slate-10 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-8" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
