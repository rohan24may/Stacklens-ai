"use client"

import { Folder } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const projects: any[] = [] // later from database

  return (
    <div className="max-w-6xl mx-auto space-y-12">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-sm text-zinc-400">
          View and manage your repository analyses and generated architectures.
        </p>
      </div>

      {/* Search */}
      <input
        placeholder="Search projects..."
        className="w-full bg-black/40 border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500"
      />

      {/* Empty State */}
      {projects.length === 0 ? (

        <div className="border border-[#1a1a1a] rounded-xl bg-[#0e0e0e] py-20 px-8 flex flex-col items-center text-center gap-6">

          {/* Icon */}
          <div className="p-5 rounded-xl bg-black/40 border border-[#1a1a1a]">
            <Folder size={34} className="text-zinc-400" />
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white">
              No projects yet
            </h2>

            <p className="text-sm text-zinc-500 max-w-md">
              Start by analyzing a GitHub repository or generating a new system
              architecture with StackLens.
            </p>
          </div>

{/* Buttons */}
<div className="flex gap-5 mt-4">

  <Link
    href="/dashboard/analyze"
    className="w-48 text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-base font-semibold hover:opacity-90 transition shadow-lg shadow-purple-500/10"
  >
    Analyze Repository
  </Link>

  <Link
    href="/dashboard/architect"
    className="w-48 text-center py-3 rounded-xl border border-[#1a1a1a] bg-black/40 text-base font-medium hover:border-purple-500 hover:bg-black/60 transition"
  >
    Architect Project
  </Link>

</div>

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="border border-[#1a1a1a] rounded-xl p-6 bg-[#0e0e0e] hover:border-purple-500 transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Folder size={18} className="text-purple-400" />
                <h2 className="font-medium">{project.name}</h2>
              </div>
            </div>
          ))}
        </div>

      )}

    </div>
  )
}