"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

export function PastSpeakersSection() {
  const speakers = [
    {
      name: "Alice Nguyen",
      title: "Founder, Citrus AI",
      img: "/alice-founder-headshot.png",
      logo: "/citrus-ai-logo.png",
    },
    {
      name: "David Kim",
      title: "Partner, Seed Fund",
      img: "/vc-headshot-david.png",
      logo: "/placeholder-5reoj.png",
    },
    {
      name: "Maria Lopez",
      title: "Head of Product, Unicorn Co",
      img: "/product-leader-maria.png",
      logo: "/unicorn-co-logo.png",
    },
    {
      name: "Jason Park",
      title: "CTO, DevTools Inc.",
      img: "/cto-headshot-jason.png",
      logo: "/devtools-inc-logo.png",
    },
  ]

  return (
    <section id="speakers" className="py-16 md:py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-4xl md:text-5xl font-medium text-slate-12 tracking-tight">Past Speakers</h2>
            <p className="text-slate-11 text-base md:text-lg">Founders, operators, and investors who’ve joined us.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {speakers.map((s, i) => (
            <motion.div
              key={s.name}
              className="rounded-2xl border border-slate-6 bg-slate-1 p-4 md:p-5 text-center"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <img
                src={s.img || "/placeholder.svg"}
                alt={`${s.name} headshot`}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto mb-3 bg-slate-3"
              />
              <div className="text-slate-12 font-medium text-sm md:text-base">{s.name}</div>
              <div className="text-slate-10 text-xs md:text-sm">{s.title}</div>
              <img
                src={s.logo || "/placeholder.svg"}
                alt={`${s.name} company logo`}
                className="h-5 object-contain mx-auto mt-3 opacity-80"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
