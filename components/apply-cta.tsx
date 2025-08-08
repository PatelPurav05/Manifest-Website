"use client"

import { Rocket } from 'lucide-react'
import { motion } from "framer-motion"

export function ApplyCTA() {
  return (
    <motion.a
      href="/apply"
      className="fixed top-6 right-6 z-50 px-4 h-10 rounded-full bg-slate-12 text-slate-1 text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-slate-11 transition-colors"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label="Apply to Manifest"
    >
      <Rocket className="w-4 h-4" />
      Apply
    </motion.a>
  )
}
