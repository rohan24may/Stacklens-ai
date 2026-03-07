"use client"

import { useState, useRef } from "react"
import { Sparkles } from "lucide-react"

const examples = [
  "Build a SaaS project management tool",
  "Create a real-time chat application",
  "Design a blogging platform",
  "Build an AI documentation assistant"
]

const stacks = [
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "Go",
  "PostgreSQL",
  "MongoDB",
  "Supabase"
]

export default function ArchitectPage() {

  const [idea, setIdea] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleExampleClick = (example: string) => {
    setIdea(example)

    textareaRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })

    textareaRef.current?.focus()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-2xl font-semibold">
              Architect a New Project
        </h1>

        <p className="text-sm text-zinc-400 mt-1">
          Describe your idea and StackLens will generate a full system architecture.
        </p>
      </div>

      {/* Project Idea Input */}

      <div className="border border-[#1a1a1a] rounded-xl p-6 bg-[#0e0e0e]">

        <label className="text-sm text-zinc-400 block mb-2">
          Project Idea
        </label>

        <textarea
          ref={textareaRef}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe the project you want to build..."
          className="w-full h-28 bg-black/40 border border-[#1a1a1a] rounded-lg p-4 text-sm outline-none focus:border-purple-500 resize-none"
        />

      </div>

      {/* Stack Preferences */}

      <div className="border border-[#1a1a1a] rounded-xl p-6 bg-[#0e0e0e]">

        <h2 className="text-sm font-medium mb-4">
          Preferred Technologies
        </h2>

        <div className="flex flex-wrap gap-3">

          {stacks.map((stack, i) => (
            <button
              key={i}
              className="px-3 py-1.5 text-xs rounded-lg border border-[#1a1a1a] bg-black/40 hover:border-purple-500 hover:text-white transition"
            >
              {stack}
            </button>
          ))}

        </div>

      </div>

      {/* Example Prompts */}

      <div>

        <h2 className="text-sm text-zinc-400 mb-3">
          Example Ideas
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {examples.map((example, i) => (
            <button
              key={i}
              onClick={() => handleExampleClick(example)}
              className="text-left border border-[#1a1a1a] rounded-lg p-4 bg-[#0e0e0e] hover:border-purple-500 transition text-sm"
            >
              {example}
            </button>
          ))}

        </div>

      </div>

{/* Generate Button */}

<button className="mt-6 flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-sm font-medium hover:opacity-90 transition">

  <Sparkles size={16} />

  Generate Architecture

</button>

    </div>
  )
}