"use client";

import { useState } from "react";

export default function Sidebar({
  projects,
  onSelect,
  onDelete,
  onNew,
  onRename,
}: any) {
  return (
    <div className="w-64 border-r border-[#1a1a1a] p-4 text-white">
      {/* NEW CHAT */}
      <button
        onClick={onNew}
        className="w-full mb-4 p-2 bg-[#1a1a1a] rounded-md text-sm hover:bg-[#222]"
      >
        + New Chat
      </button>

      <p className="text-xs text-zinc-400 mb-3">PROJECTS</p>

      {projects.length === 0 && (
        <p className="text-xs text-zinc-500">No projects yet</p>
      )}

      {projects.map((p: any) => (
        <ProjectItem
          key={p.id}
          project={p}
          onSelect={onSelect}
          onDelete={onDelete}
          onRename={onRename}
        />
      ))}
    </div>
  );
}

function ProjectItem({ project, onSelect, onDelete, onRename }: any) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.repo_name);

  return (
    <div className="relative group p-2 text-sm bg-[#111] rounded-md mb-2 hover:bg-[#1a1a1a]">
      
      {/* NAME / EDIT */}
      {!editing ? (
        <div onClick={() => onSelect(project)} className="cursor-pointer">
          {project.repo_name}
        </div>
      ) : (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => {
            onRename(project.id, name);
            setEditing(false);
          }}
          className="bg-transparent outline-none w-full text-white"
          autoFocus
        />
      )}

      {/* 3 DOTS */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
      >
        ⋯
      </button>

      {/* MENU */}
      {open && (
        <div className="absolute right-2 top-8 bg-[#1a1a1a] border border-[#333] rounded-md text-xs z-50">
          
          <div
            onClick={() => {
              setEditing(true);
              setOpen(false);
            }}
            className="px-3 py-2 hover:bg-[#222] cursor-pointer"
          >
            Rename
          </div>

          <div
            onClick={() => {
              onDelete(project.id);
              setOpen(false);
            }}
            className="px-3 py-2 hover:bg-[#222] cursor-pointer text-red-400"
          >
            Delete
          </div>

        </div>
      )}
    </div>
  );
}