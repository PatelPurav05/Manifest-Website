"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type React from "react"

interface SparklesProps {
  className?: string
  size?: "sm" | "md" | "lg"
  count?: number
  speed?: "slow" | "medium" | "fast"
}

export const Sparkles: React.FC<SparklesProps> = ({ className, size = "md", count = 3, speed = "medium" }) => {
  const sparkleSize = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2",
  }

  const animationSpeed = {
    slow: 3,
    medium: 2,
    fast: 1,
  }

  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={cn("absolute bg-yellow-400 rounded-full opacity-70", sparkleSize[size])}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: animationSpeed[speed],
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
