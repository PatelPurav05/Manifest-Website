"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

export function SponsorsSection() {
  const sponsors = [
    {
      name: "Anthropic",
      logo: "A",
      confirmed: true,
    },
    {
      name: "OpenAI",
      logo: "O",
      confirmed: false,
    },
    {
      name: "Meta",
      logo: "M",
      confirmed: false,
    },
    {
      name: "Google",
      logo: "G",
      confirmed: false,
    },
    {
      name: "Microsoft",
      logo: "MS",
      confirmed: false,
    },
    {
      name: "Amazon",
      logo: "A",
      confirmed: false,
    },
    {
      name: "Apple",
      logo: "🍎",
      confirmed: false,
    },
    {
      name: "Stripe",
      logo: "S",
      confirmed: false,
    },
    {
      name: "Figma",
      logo: "F",
      confirmed: false,
    },
    {
      name: "Notion",
      logo: "N",
      confirmed: false,
    },
    {
      name: "Vercel",
      logo: "▲",
      confirmed: false,
    },
    {
      name: "Linear",
      logo: "L",
      confirmed: false,
    },
  ]

  // Duplicate sponsors for seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors]

  return (
    <section className="py-24 px-5 bg-slate-2 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute bottom-10 left-10 w-40 h-40 bg-slate-4/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
        <FadeIn>
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-medium text-slate-12 tracking-tight">
              Backed by{" "}
              <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="bg-gradient-to-r from-slate-12 to-slate-10 bg-clip-text text-transparent">
                  Industry Leaders
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-slate-12"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.span>
            </h2>
            <p className="text-xl text-slate-11 leading-relaxed">
              We're proud to partner with organizations that share our vision for student entrepreneurship.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          {/* Scrolling Sponsors Container */}
          <div className="relative overflow-hidden py-8">
            {/* Gradient overlays */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-2 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-2 to-transparent pointer-events-none z-10" />

            {/* Scrolling content */}
            <motion.div
              className="flex gap-8 min-w-max"
              animate={{
                x: [0, -50 * sponsors.length * 8], // Adjust based on sponsor count and gap
              }}
              transition={{
                duration: 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {duplicatedSponsors.map((sponsor, index) => (
                <motion.div
                  key={`${sponsor.name}-${index}`}
                  className="flex-shrink-0 group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-slate-1 rounded-2xl p-8 border border-slate-6 hover:border-slate-8 transition-all duration-300 w-48 h-32 flex flex-col items-center justify-center space-y-3 group-hover:shadow-lg">
                    <motion.div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold ${
                        sponsor.confirmed
                          ? "bg-slate-12 text-slate-1"
                          : "bg-slate-3 text-slate-11 border-2 border-dashed border-slate-6"
                      }`}
                      whileHover={{ rotate: sponsor.confirmed ? 0 : 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {sponsor.logo}
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-slate-12 group-hover:text-slate-11 transition-colors">
                        {sponsor.name}
                      </h3>
                      <p className={`text-sm ${sponsor.confirmed ? "text-slate-11" : "text-slate-9"}`}>
                        {sponsor.confirmed ? "Confirmed Partner" : "Potential Partner"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="pt-8">
            <p className="text-slate-11">
              Interested in partnering with Manifest?{" "}
              <motion.a
                href="mailto:partnerships@manifestuci.com"
                className="text-slate-12 underline hover:no-underline"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Get in touch
              </motion.a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
