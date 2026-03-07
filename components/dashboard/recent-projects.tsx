"use client"

import { FolderGit2 } from "lucide-react"

export default function RecentProjects({ projects = [] }: any) {
  return (
    <div className="col-span-2 border border-[#1a1a1a] rounded-xl p-6 bg-[#0e0e0e]">

      <h2 className="text-lg font-semibold mb-6">
        Recent Projects
      </h2>

      {projects.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-12 text-center">

          <FolderGit2 className="text-zinc-500 mb-3" size={28} />

          <p className="text-sm text-zinc-400">
            No projects yet
          </p>

          <p className="text-xs text-zinc-500 mt-1">
            Analyze a repository or generate an architecture
          </p>

        </div>

      ) : (

        <div className="space-y-3">
          {projects.map((project: any) => (
            <div key={project.id}>
              {project.name}
            </div>
          ))}
        </div>

      )}

    </div>
  )
}