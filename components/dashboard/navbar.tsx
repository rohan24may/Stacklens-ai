"use client";

import { UserButton } from "@clerk/nextjs";
import { Search, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">

      {/* Search */}
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-80">
        <Search size={16} className="text-gray-400" />
        <input
          placeholder="Search projects..."
          className="bg-transparent outline-none text-sm w-full placeholder:text-gray-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm">
          <Plus size={16} />
          New Project
        </button>

        <UserButton afterSignOutUrl="/" />
      </div>

    </header>
  );
}