"use client"

import { Github } from "lucide-react"
import Link from "next/link";

export default function RepoInput() {
  return (
    <div className="border border-[#1a1a1a] rounded-xl p-6 bg-[#0e0e0e]">

      <div className="flex items-center gap-2 mb-4">
        <Github size={18} className="text-purple-400" />
        <h2 className="text-lg font-semibold">
          Analyze GitHub Repository
        </h2>
      </div>

      <p className="text-sm text-zinc-400 mb-4">
        Paste a GitHub repository URL to analyze its architecture,
        dependencies, and folder structure.
      </p>

      <div className="flex gap-3">

        <input
          placeholder="https://github.com/user/repository"
          className="flex-1 bg-black/40 border border-[#1a1a1a] rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500"
        />

  <Link
  href={`/dashboard/analyze?repo=${encodeURIComponent(project.repo_url)}`}
  className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-sm font-medium hover:opacity-90 transition"
>
  Analyze
</Link>

      </div>

    </div>
  )
}