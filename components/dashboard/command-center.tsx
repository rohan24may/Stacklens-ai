"use client"

import { motion } from "framer-motion"

export default function CommandCenter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-2xl opacity-40"
    >
      <h2 className="text-xl font-semibold mb-4">
        AI Command Center
      </h2>

      <div className="flex items-center gap-3 border border-[#1a1a1a] rounded-xl p-4 bg-[#050505]">

        <input
          placeholder="Paste a GitHub repo or describe an architecture..."
          className="bg-transparent flex-1 outline-none text-sm"
        />

        <button className="px-4 py-2 bg-purple-600 rounded-lg text-sm">
          Run
        </button>

      </div>
    </motion.div>
  )
}