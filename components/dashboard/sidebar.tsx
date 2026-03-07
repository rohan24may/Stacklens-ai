"use client"

import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Github,
  Sparkles,
  Folder,
  BookOpen,
  Settings,
} from "lucide-react"
import Image from "next/image";
import Link from "next/link"


const nav = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Analyze Repo", icon: Github, href: "/dashboard/analyze" },
  { name: "Architect Project", icon: Sparkles, href: "/dashboard/architect" },
  { name: "Projects", icon: Folder, href: "/dashboard/projects" },
  { name: "Docs", icon: BookOpen, href: "/dashboard/docs" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]
export default function Sidebar() {
  return (
<aside className="w-64 border-r border-[#1a1a1a] bg-[#0e0e0e] px-4">

  {/* Logo */}

  <Link
    href="/"
    className="flex items-center gap-3 p-3 mb-6 hover:opacity-80 transition"
  >

    <Image
      src="/logo-light.png"
      alt="StackLens"
      width={28}
      height={28}
      className="h-7 w-auto"
    />

    <span className="text-lg font-semibold tracking-tight">
      StackLens-AI
    </span>

  </Link>

<nav className="space-y-1 px-3">

  {nav.map((item, i) => {
    const Icon = item.icon

    return (
      <Link key={i} href={item.href}>

        <motion.div
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer transition"
        >
          <Icon size={18} />
          {item.name}
        </motion.div>

      </Link>
    )
  })}

</nav>
    </aside>
  )
}