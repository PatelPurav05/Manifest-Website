"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

export function ShowcaseSection() {
  const startups = [
    {
      name: "Leprendo",
      badge: "Seed",
      stat: "250K+ in Grants",
      img: "/leprendo.jpg",
    },
    {
      name: "OOTify",
      badge: "Seed",
      stat: "Backed by Nex Cubed, IBOS Venture, Titan Angels, & more",
      img: "/ootify.png",
    },
    {
      name: "Clayzo",
      badge: "Pre-Seed",
      stat: "Backed by Afore Capital",
      img: "/logo-no-bg.png",
      imageFit: "contain",
      imageShellClassName: "bg-[#f5ebe0]",
    },
    {
      name: "Magma",
      badge: "Series A",
      stat: "Backed by General Catalyst, Titan Capital, Accion Venture Lab, Capria Ventures, & more",
      img: "/magma.jpg",
    },
  ]

  return (
    <section id="startups" className="py-16 md:py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-4 mb-14">
            <h2 className="text-4xl sm:text-5xl font-medium text-slate-12 tracking-tight">Startups</h2>
            <p className="text-slate-11 text-lg">Wins from the community—built at UCI, launched to the world.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
          {startups.map((s, i) => (
            <motion.div
              key={s.name}
              className={`group overflow-hidden rounded-2xl border border-slate-6 bg-slate-1`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className={`relative aspect-[5/4] overflow-hidden ${s.imageShellClassName || ""}`}>
                <motion.img
                  src={s.img || "/placeholder.svg"}
                  alt={`${s.name} product`}
                  className={`w-full h-full ${s.imageFit === "contain" ? "object-contain p-8 sm:p-10" : "object-cover"}`}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 text-xs rounded-full bg-slate-12 text-slate-1">
                  {s.badge}
                </div>
              </div>
              <div className="p-7 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3">
                  <h3 className="text-xl font-medium text-slate-12 group-hover:text-slate-11">{s.name}</h3>
                  <span className="text-sm md:text-base text-slate-10 md:text-right leading-snug break-words">{s.stat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
