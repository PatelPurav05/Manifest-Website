"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

export function ShowcaseSection() {
  const startups = [
    {
      name: "Citrus AI",
      badge: "Seed",
      stat: "10k+ MAU",
      img: "/ai-dashboard-screenshot.png",
    },
    {
      name: "Anteater Labs",
      badge: "Bootstrapped",
      stat: "$15k MRR",
      img: "/saas-analytics-screenshot.png",
    },
    {
      name: "ZotChain",
      badge: "Fellowship",
      stat: "5 enterprise pilots",
      img: "/blockchain-enterprise-dashboard.png",
    },
  ]

  return (
    <section id="startups" className="py-16 md:py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-4 mb-14">
            <h2 className="text-4xl sm:text-5xl font-medium text-slate-12 tracking-tight">Startups & Projects</h2>
            <p className="text-slate-11 text-lg">Wins from the community—built at UCI, launched to the world.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {startups.map((s, i) => (
            <motion.div
              key={s.name}
              className={`group overflow-hidden rounded-2xl border border-slate-6 bg-slate-1 ${i >= 2 ? "hidden md:block" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={s.img || "/placeholder.svg"}
                  alt={`${s.name} product`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 text-xs rounded-full bg-slate-12 text-slate-1">
                  {s.badge}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-slate-12 group-hover:text-slate-11">{s.name}</h3>
                  <span className="text-sm text-slate-10">{s.stat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
