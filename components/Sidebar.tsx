"use client";

export default function Sidebar({ projects, onSelect }: any) {
  return (
    <div className="w-64 border-r border-[#1a1a1a] p-4 text-white">
      <p className="text-xs text-zinc-400 mb-3">PROJECTS</p>

      {projects.length === 0 && (
        <p className="text-xs text-zinc-500">No projects yet</p>
      )}

      {projects.map((p: any) => (
        <div
          key={p.id}
          onClick={() => onSelect(p)}
          className="p-2 text-sm bg-[#111] rounded-md mb-2 cursor-pointer hover:bg-[#1a1a1a] transition"
        >
          {p.repo_name}
        </div>
      ))}
    </div>
  );
}