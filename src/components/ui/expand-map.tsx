"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"

interface LocationMapProps {
  location?: string
  coordinates?: string
  className?: string
}

export function LocationMap({
  location = "Rio de Janeiro, RJ",
  coordinates = "22.9068° S, 43.1729° W",
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8])
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className ?? ""}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false) }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          background: "rgba(16, 17, 26, 0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        animate={{
          width: isExpanded ? 280 : 200,
          height: isExpanded ? 220 : 110,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/20" />

        {/* Map (expanded) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute inset-0" style={{ background: "rgba(10,12,20,0.95)" }} />

              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Main roads */}
                {[35, 65].map((y, i) => (
                  <motion.line key={`h${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                    stroke="rgba(255,255,255,0.15)" strokeWidth="3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }} />
                ))}
                {[30, 70].map((x, i) => (
                  <motion.line key={`v${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                    stroke="rgba(255,255,255,0.12)" strokeWidth="2.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }} />
                ))}
                {/* Secondary streets */}
                {[20, 50, 80].map((y, i) => (
                  <motion.line key={`hs${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                    stroke="rgba(255,255,255,0.05)" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }} />
                ))}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line key={`vs${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                    stroke="rgba(255,255,255,0.05)" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }} />
                ))}
              </svg>

              {/* Buildings */}
              {[
                { t: "40%", l: "10%", w: "15%", h: "20%" },
                { t: "15%", l: "35%", w: "12%", h: "15%" },
                { t: "70%", l: "75%", w: "18%", h: "18%" },
                { t: "20%", l: "78%", w: "10%", h: "25%" },
                { t: "55%", l: "5%",  w: "8%",  h: "12%" },
              ].map((b, i) => (
                <motion.div key={i}
                  className="absolute rounded-sm"
                  style={{ top: b.t, left: b.l, width: b.w, height: b.h,
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.06)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }} />
              ))}

              {/* Pin */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  style={{ filter: "drop-shadow(0 0 10px rgba(52,211,153,0.6))" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#34D399" />
                  <circle cx="12" cy="9" r="2.5" fill="#050508" />
                </svg>
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid (collapsed) */}
        <motion.div className="absolute inset-0 opacity-[0.04]"
          animate={{ opacity: isExpanded ? 0 : 0.04 }} transition={{ duration: 0.3 }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="rj-grid" width="18" height="18" patternUnits="userSpaceOnUse">
                <path d="M 18 0 L 0 0 0 18" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rj-grid)" />
          </svg>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4">
          <div className="flex items-start justify-between">
            <motion.div animate={{ opacity: isExpanded ? 0 : 1 }} transition={{ duration: 0.3 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" x2="9" y1="3" y2="18" />
                <line x1="15" x2="15" y1="6" y2="21" />
              </svg>
            </motion.div>

            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
                Live
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <motion.h3
              className="text-white font-medium text-sm tracking-tight"
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  className="text-xs font-mono"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className="h-px"
              style={{ background: "linear-gradient(90deg, rgba(52,211,153,0.5), rgba(52,211,153,0.2), transparent)" }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        className="absolute -bottom-5 left-1/2 text-[10px] whitespace-nowrap"
        style={{ x: "-50%", color: "rgba(255,255,255,0.25)" }}
        animate={{ opacity: isHovered && !isExpanded ? 1 : 0, y: isHovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
      >
        clique para expandir
      </motion.p>
    </motion.div>
  )
}
