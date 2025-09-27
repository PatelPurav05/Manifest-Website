"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"
import { Sparkles } from "@/components/ui/sparkles"
import { FloatingElements } from "@/components/ui/floating-elements"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { useRef } from "react"
import { Trophy, DollarSign, Users, Lightbulb, Rocket, Star, Zap, Target } from 'lucide-react'

export function ElevateSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const feature1Ref = useRef<HTMLDivElement>(null)
  const feature2Ref = useRef<HTMLDivElement>(null)
  const feature3Ref = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  const benefits = [
    "Weekly mentorship with founders and operators",
    "Tight product loops: build → demo → feedback",
    "Investor readiness: story, metrics, and pitch",
    "Access to tools, credits, and expert workshops",
  ]

  const rewards = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "$50,000",
      subtitle: "Cash Prizes",
      description: "Distributed across top performing teams",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "$25,000",
      subtitle: "Anthropic Credits",
      description: "AI development resources and API access",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "$15,000",
      subtitle: "Sponsor Credits",
      description: "AWS, Vercel, Stripe, and more platform credits",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Demo Day",
      subtitle: "Investor Showcase",
      description: "Present to 100+ investors and industry leaders",
      gradient: "from-green-400 to-emerald-500",
    },
  ]

  const timeline = [
    {
      phase: "Fall (Weeks 1–10)",
      title: "Foundation & Build",
      duration: "Stage −1 → 0 (Idea → MVP)",
      description: "Form teams, validate the problem, and build the first MVP.",
      milestones: [
        "Finalize team and idea",
        "Validate customer problem",
        "Scope and begin MVP",
        "Weekly builder cadence",
      ],
    },
    {
      phase: "Winter",
      title: "Launch",
      duration: "Stage 0 → 1 (MVP → Market)",
      description: "Ship MVP, run pilots, and focus on early traction.",
      milestones: [
        "Ship MVP",
        "Conduct pilots with users",
        "Iterate from feedback",
        "Establish early growth loops",
      ],
    },
    {
      phase: "Spring",
      title: "Scale & Showcase",
      duration: "Stage 1+ (Scale, Demo, Pitch)",
      description: "Scale what works, compete, and present at Demo Day.",
      milestones: [
        "Build and launch updates",
        "Compete in SZ NVC & Beall-Butterworth",
        "Investor readiness",
        "Demo Day presentation",
      ],
    },
  ]

  return (
    <section id="elevate" className="py-20 md:py-32 px-5 bg-slate-2 relative overflow-hidden">
      <FloatingElements />

      {/* Enhanced background decorations */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div ref={containerRef} className="max-w-7xl mx-auto space-y-24 relative z-10">
        {/* Hero Section */}
        <FadeIn>
          <div className="text-center space-y-8 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-12 text-slate-1 text-xs">
              <Rocket className="w-4 h-4" /> Flagship Incubator
            </div>
            <motion.h2
              className="text-5xl sm:text-7xl font-medium text-slate-12 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Elevate
            </motion.h2>
            <motion.p
              className="text-slate-11 text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              A selective, 12-month path for teams to go from concept to traction—with mentorship, resources, and a
              culture of shipping.
            </motion.p>
          </div>
        </FadeIn>

        {/* Benefits Grid */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="rounded-2xl border border-slate-6 bg-slate-1 p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <h3 className="text-xl font-medium text-slate-12 mb-4">What You Get</h3>
              <ul className="space-y-3 text-slate-11">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-slate-8" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-slate-6 bg-slate-1 p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <h3 className="text-xl font-medium text-slate-12 mb-4">Milestones</h3>
              <ol className="space-y-3 text-slate-11 list-decimal list-inside">
                <li>Foundation: scope, early user discovery, MVP plan</li>
                <li>Build: MVP, ship cadence, quantitative feedback</li>
                <li>Traction: active users, growth loops, refinements</li>
                <li>Launch: pitch, story, and investor readiness</li>
              </ol>
            </motion.div>
          </div>
        </FadeIn>

        {/* Applications & Weekly Schedule */}
        <FadeIn delay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="rounded-2xl border border-slate-6 bg-slate-1 p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <h3 className="text-xl font-medium text-slate-12 mb-4">Application Process</h3>
              <ul className="space-y-3 text-slate-11">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-slate-8" />
                  <span><strong>Round 1 — Applications</strong> (Open Week 1, Due Week 3)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-slate-8" />
                  <span><strong>Round 2 — Interviews</strong> (Week 4)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-slate-8" />
                  <span><strong>Team Formation</strong> (Week 5): Tech Lead, Design Lead, Market Lead, Sales Lead</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-slate-8" />
                  <span><strong>Idea Finalization</strong> (By Week 7)</span>
                </li>
              </ul>
              <p className="text-sm text-slate-10 mt-4">Once per year. Limited seats. Selective and community-first.</p>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-slate-6 bg-slate-1 p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <h3 className="text-xl font-medium text-slate-12 mb-4">Weekly Schedule</h3>
              <ul className="space-y-3 text-slate-11">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-slate-8" />
                  <span><strong>Tuesdays, 7–9 PM — Builder Hours</strong>: Team work time, office hours, hands-on workshops by consensus.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-slate-8" />
                  <span><strong>Wednesdays — Workshops/Guest Speakers</strong>: Founders and investors, mandatory attendance.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </FadeIn>


        {/* Program Timeline */}
        <FadeIn delay={0.7}>
          <div className="space-y-12">
            <h3 className="text-3xl font-medium text-slate-12 text-center">12-Month Journey to Success</h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {timeline.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Connection line */}
                  {index < timeline.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-slate-8 to-slate-6"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                    />
                  )}

                  <motion.div
                    className="bg-slate-1 rounded-2xl p-8 border border-slate-6 hover:border-slate-8 transition-all duration-300 relative overflow-hidden"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-slate-12 to-slate-10 rounded-xl flex items-center justify-center mb-6 text-slate-1 font-bold"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {index + 1}
                    </motion.div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xl font-medium text-slate-12 mb-1">{phase.title}</h4>
                        <p className="text-sm text-slate-10 font-medium">{phase.duration}</p>
                      </div>

                      <p className="text-slate-11 leading-relaxed">{phase.description}</p>

                      <ul className="space-y-2">
                        {phase.milestones.map((milestone, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center gap-2 text-sm text-slate-10"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-1.5 h-1.5 bg-slate-8 rounded-full" />
                            {milestone}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <motion.div className="absolute inset-0 bg-gradient-to-br from-slate-12/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Call to Action */}
        <FadeIn delay={0.9}>
          <motion.div
            className="text-center space-y-8 bg-gradient-to-br from-slate-1 to-slate-2 rounded-3xl p-12 border border-slate-6 relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* <Sparkles className="absolute inset-0" count={12} speed="slow" /> */}

            <div className="space-y-4 relative z-10">
              <h3 className="text-3xl font-medium text-slate-12">Ready to Build the Next Big Thing?</h3>
              <p className="text-xl text-slate-11 max-w-2xl mx-auto">
                Applications are <strong>highly selective</strong>. We're looking for the most ambitious builders ready
                to commit a full year to creating something extraordinary.
              </p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* <motion.a
                href="/apply"
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Apply for Elevate 2025
                </span>
              </motion.a> */}

              <motion.a
                href="https://www.notion.so/Manifest-Manifesto-21bb5ad6175e80edae51dd5383ef12d7?source=copy_link#230b5ad6175e8075acdde03484c6218b"
                className="px-8 py-4 border border-slate-8 text-slate-12 rounded-full font-medium text-lg hover:bg-slate-3 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}
