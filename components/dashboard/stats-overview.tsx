"use client"

import { Folder, Github, Sparkles, Cpu } from "lucide-react"

const stats = [
  {
    label: "Projects",
    value: 0,
    icon: Folder
  },
  {
    label: "Repos Analyzed",
    value: 0,
    icon: Github
  },
  {
    label: "Architectures",
    value: 0,
    icon: Sparkles
  },
  {
    label: "AI Runs",
    value: 0,
    icon: Cpu
  }
]

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((stat, i) => {
        const Icon = stat.icon

        return (
          <div
            key={i}
            className="border border-[#1a1a1a] rounded-xl p-6 bg-[#0e0e0e] transition-all duration-200 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10"
          >

            <div className="flex items-center justify-between mb-4">

              <span className="text-sm text-zinc-400">
                {stat.label}
              </span>

              <Icon size={18} className="text-purple-400" />

            </div>

            <p className="text-3xl font-semibold tracking-tight">
              {stat.value}
            </p>

          </div>
        )
      })}

    </div>
  )
}