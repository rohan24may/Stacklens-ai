"use client"

import { motion } from "framer-motion"
import { Github, Sparkles, MessageSquare, Folder } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Analyze GitHub Repo",
    description: "Understand architecture, dependencies, and key files",
    icon: Github,
    href: "/dashboard/analyze"
  },
  {
    title: "Architect Project",
    description: "Generate system design, stack, and database schema",
    icon: Sparkles,
    href: "/dashboard/architect"
  },
  {
    title: "AI Code Chat",
    description: "Ask AI questions about repositories and systems",
    icon: MessageSquare,
    href: "/dashboard/chat"
  },
  {
    title: "Browse Projects",
    description: "View your previous analyses and architectures",
    icon: Folder,
    href: "/dashboard/projects"
  }
]

export default function ActionGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {actions.map((action, i) => {
        const Icon = action.icon

        return (
          <Link key={i} href={action.href}>

            <motion.div
              whileHover={{ y: -6 }}
              className="group relative border border-[#1a1a1a] rounded-xl p-6 bg-[#0e0e0e] cursor-pointer overflow-hidden transition-all duration-200 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/10"
            >

              <Icon className="mb-4 text-purple-400 relative z-10" size={22} />

              <h3 className="text-sm font-semibold relative z-10">
                {action.title}
              </h3>

              <p className="text-xs text-zinc-400 mt-1 relative z-10">
                {action.description}
              </p>

            </motion.div>

          </Link>
        )
      })}

    </div>
  )
}