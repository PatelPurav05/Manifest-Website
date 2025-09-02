"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/fade-in"

export function MetricsSection() {
  const metrics = [
    { value: "$25M+", label: "Revenue by Manifest Startups" },
    { value: "50+", label: "Community Members" },
    { value: "$10M+", label: "Raised by Alumni" },
    { value: "$120k+", label: "Competition Prize Money" },
  ]

  return (
    <section className="py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                className="text-center rounded-2xl border border-slate-6 bg-slate-1 p-6"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="text-3xl font-bold text-slate-12">{m.value}</div>
                <div className="text-slate-10 text-sm mt-1">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
