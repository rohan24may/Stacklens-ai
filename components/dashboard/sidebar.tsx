"use client"

import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Github,
  Sparkles,
  Folder,
  BookOpen,
  Settings
} from "lucide-react"

const nav = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Analyze Repo", icon: Github },
  { name: "Architect Project", icon: Sparkles },
  { name: "Projects", icon: Folder },
  { name: "Docs", icon: BookOpen },
  { name: "Settings", icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-[#1a1a1a] bg-[#0e0e0e]/60 backdrop-blur-xl">

      <div className="p-6 text-xl font-semibold tracking-tight">
        StackLens
      </div>

      <nav className="space-y-1 px-3">

        {nav.map((item, i) => {
          const Icon = item.icon

          return (
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer transition"
            >
              <Icon size={18} />
              {item.name}
            </motion.div>
          )
        })}
      </nav>
    </aside>
  )
}