"use client"

import { Search, Plus } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

export default function Navbar() {
  return (
    <div className="h-16 border-b border-[#1a1a1a] bg-black/60 backdrop-blur-xl flex items-center justify-between px-8">

      {/* Search */}

      <div className="flex items-center gap-3 bg-[#111]/60 border border-[#1a1a1a] rounded-lg px-3 py-2 w-80">

        <Search size={16} className="text-zinc-400" />

        <input
          placeholder="Search projects..."
          className="bg-transparent outline-none text-sm flex-1"
        />

      </div>

      {/* Actions */}

      <div className="flex items-center gap-5">

        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-sm font-medium hover:opacity-90 transition">
          <Plus size={16} />
          New Project
        </button>

        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-9 h-9"
            }
          }}
          afterSignOutUrl="/"
        />

      </div>

    </div>
  )
}