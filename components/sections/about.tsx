"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

export function AboutSection() {
  const features = [
    {
      title: "Fireside Chats",
      description: "Regular sessions with top-tier founders and investors",
      emoji: "🔥",
    },
    {
      title: "Builder Hours",
      description: "Weekly gatherings to code, collaborate, and launch",
      emoji: "⚡",
    },
    {
      title: "Expert Workshops",
      description: "Hands-on learning from industry professionals",
      emoji: "🎯",
    },
    {
      title: "Real Impact",
      description: "Building meaningful projects, not just theory",
      emoji: "🚀",
    },
  ]

  return (
    <section id="about" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-medium text-slate-12 tracking-tight">
                We're not just a club; we're a{" "}
                <motion.span
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="bg-gradient-to-r from-slate-12 to-slate-10 bg-clip-text text-transparent">home</span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-slate-12"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </motion.span>{" "}
                for builders.
              </h2>
              <p className="text-lg text-slate-11 leading-relaxed">
                Our community runs on momentum: we host regular fireside chats with top-tier founders and investors,
                hands-on workshops led by experts, and weekly builder hours where students gather to code, collaborate,
                and launch.
              </p>
              <p className="text-lg text-slate-11 leading-relaxed">
                Manifest is where real things get built — not in theory, but in practice.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={`space-y-4 ${index % 2 === 1 ? "pt-8" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-slate-2 rounded-2xl p-6 border border-slate-6 hover:border-slate-8 transition-all duration-300 group cursor-pointer"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="text-2xl mb-3"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.emoji}
                    </motion.div>
                    <h3 className="text-2xl font-medium text-slate-12 mb-2 group-hover:text-slate-11 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-11 group-hover:text-slate-10 transition-colors">{feature.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
