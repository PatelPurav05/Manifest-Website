"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"
import { Sparkles } from "@/components/ui/sparkles"
import { FloatingElements } from "@/components/ui/floating-elements"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 overflow-hidden">
      <FloatingElements />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <FadeIn delay={0.1}>
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative inline-block"
            >
              <h1 className="text-5xl sm:text-7xl font-medium text-slate-12 tracking-tight">Manifest at UCI</h1>
              <Sparkles className="absolute inset-0" count={5} speed="medium" />
            </motion.div>

            <FadeIn delay={0.3}>
              <p className="text-xl sm:text-2xl text-slate-11 max-w-3xl mx-auto leading-relaxed">
                The premiere entrepreneurship organization at UC Irvine — a selective, high-energy community of student
                builders.
              </p>
            </FadeIn>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} direction="up" distance={30}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <motion.a
              href="#join"
              className="px-8 py-4 bg-slate-12 text-slate-1 rounded-full font-medium text-lg hover:bg-slate-11 transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-slate-11 to-slate-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Join the Community</span>
            </motion.a>

            <motion.a
              href="#about"
              className="px-8 py-4 border border-slate-8 text-slate-12 rounded-full font-medium text-lg hover:bg-slate-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
