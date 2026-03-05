"use client";

import { motion } from "framer-motion";
import { Brain, GitBranch, FileCode, Layers } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card"
import { BackgroundBeams } from "../ui/background-beams";

export default function Preview() {
  return (
    <section className="py-32 px-6">
      <BackgroundBeams  />

      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-20">
          What StackLens Understands
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">

          {/* BIG CARD */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="md:col-span-2 row-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-blue-500/20 blur-3xl" />

            <Brain size={40} className="text-blue-400 mb-6 relative z-10"/>

            <h3 className="text-2xl font-semibold mb-3 relative z-10">
              AI Repository Analysis
            </h3>

            <p className="text-gray-400 max-w-md relative z-10">
              StackLens scans your entire GitHub repository and explains
              architecture, structure, and system design instantly.
            </p>

            {/* floating dots animation */}
            <motion.div
              animate={{ y: [-10, 10] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              className="absolute bottom-6 right-6 text-xs text-blue-400 opacity-60"
            >
              analyzing...
            </motion.div>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 group relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-blue-500/20 blur-2xl" />

            <GitBranch className="text-blue-400 mb-4 relative z-10" size={28}/>

            <h3 className="text-lg font-semibold mb-2 relative z-10">
              Architecture Mapping
            </h3>

            <p className="text-gray-400 text-sm relative z-10">
              Visualize how modules and services connect across the project.
            </p>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 group relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-indigo-500/20 blur-2xl" />

            <Layers className="text-indigo-400 mb-4 relative z-10" size={28}/>

<MagicCard className="group border border-white/10 bg-white/5 p-6 rounded-2xl">
  <h3 className="text-lg font-semibold mb-2">Tech Stack Detection</h3>
  <p className="text-gray-400 text-sm">
    Automatically detects frameworks and libraries used in a project.
  </p>
</MagicCard>
          </motion.div>

        </div>

      </div>

    </section>
    
  );
}