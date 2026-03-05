"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function MagicCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <div
      onMouseMove={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect()
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.25), transparent 40%)`,
        }}
      />

      {children}
    </div>
  )
}