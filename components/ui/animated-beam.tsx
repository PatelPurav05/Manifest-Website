"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React, { useRef } from "react"

export interface AnimatedBeamProps {
  className?: string
  containerRef: React.RefObject<HTMLElement>
  fromRef: React.RefObject<HTMLElement>
  toRef: React.RefObject<HTMLElement>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = React.useId()
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      className={cn("absolute inset-0", className)}
    >
      <defs>
        <linearGradient id={`${id}-gradient`} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        ref={pathRef}
        d="M 10,50 Q 50,10 90,50"
        stroke={`url(#${id}-gradient)`}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        fill="none"
        initial={{
          strokeDasharray: "0 100",
        }}
        animate={{
          strokeDasharray: ["0 100", "100 0", "0 100"],
        }}
        transition={{
          duration,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </svg>
  )
}
