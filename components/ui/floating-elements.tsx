"use client"

import { motion } from "framer-motion"
import type React from "react"

export const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      <motion.div
        className="absolute w-32 h-32 bg-slate-9/10 rounded-full blur-xl"
        style={{ top: "10%", left: "10%" }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-slate-8/10 rounded-full blur-lg"
        style={{ top: "20%", right: "15%" }}
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-40 h-40 bg-slate-7/5 rounded-full blur-2xl"
        style={{ bottom: "15%", left: "20%" }}
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      <motion.div
        className="absolute w-28 h-28 bg-slate-6/8 rounded-full blur-xl"
        style={{ bottom: "25%", right: "25%" }}
        animate={{
          y: [0, 20, 0],
          x: [0, -12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  )
}
