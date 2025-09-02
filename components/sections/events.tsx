"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { FadeIn } from "@/components/ui/fade-in"

export function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const eventImages = [
    "/group_pic.JPG",
    "/IMG_3561.PNG",
    "/IMG_6036.png",
    "/IMG_7656.JPG",
    "/IMG_1708.png",
    "/IMG_2154.png",
  ]

  const eventDates = [
    "April 2025",
    "April 2025",
    "April 2025",
    "May 2025",
    "May 2025",
    "May 2025",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % eventImages.length)
    }, 3500)
    return () => clearInterval(id)
  }, [isPaused, eventImages.length])

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

        <div
          className="relative h-[320px] sm:h-[420px] lg:h-[560px] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="absolute inset-0 rounded-2xl border border-slate-6 bg-slate-1 overflow-hidden cursor-pointer"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % eventImages.length)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={eventImages[currentIndex]}
                src={eventImages[currentIndex] || "/placeholder.svg"}
                alt={`Manifest community event ${currentIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>

            <div className="absolute bottom-4 left-4 z-20">
              <span className="rounded-md bg-slate-1/80 backdrop-blur px-3 py-1.5 text-sm md:text-base border border-slate-6 text-slate-12 shadow-sm">
                {eventDates[currentIndex]}
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {eventImages.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(i)
                }}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === currentIndex ? "bg-slate-12" : "bg-slate-8/60 hover:bg-slate-9/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
