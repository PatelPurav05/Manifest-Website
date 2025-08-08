"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { FadeIn } from "@/components/ui/fade-in"

export function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const eventImages = [
    "/hands-on-workshop.png",
    "/fireside-chat-founder.png",
    "/weekly-builder-hours.png",
    "/demo-day-pitch.png",
    "/investor-roundtable.png",
    "/vibrant-community-gathering.png",
  ]

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <section id="events" ref={containerRef} className="py-16 md:py-24 px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-3 md:space-y-6 mb-8 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-slate-12 tracking-tight">Our Community in Action</h2>
            <p className="text-base md:text-xl text-slate-11 max-w-3xl mx-auto leading-relaxed">
              A rolling snapshot of what building together looks like.
            </p>
          </div>
        </FadeIn>

        <div className="relative h-[320px] sm:h-[420px] lg:h-[560px] overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center"
            style={{ rotate: "15deg", x, transformOrigin: "center center" }}
          >
            <div className="flex gap-6 md:gap-8 min-w-max px-10 md:px-20">
              {eventImages.map((src, index) => (
                <motion.div
                  key={index}
                  className="group relative cursor-pointer flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-64 h-44 sm:w-72 sm:h-52 lg:w-80 lg:h-60 overflow-hidden rounded-2xl bg-slate-2 border border-slate-6 shadow-xl"
                    style={{ rotate: "-15deg" }}
                  >
                    <motion.img
                      src={src || "/placeholder.svg"}
                      alt={`Manifest community event ${index + 1}`}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-slate-12/60 via-slate-12/10 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-slate-1 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-slate-1 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  )
}
