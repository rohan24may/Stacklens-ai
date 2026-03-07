"use client"

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "codebase", title: "Codebase Intelligence" },
  { id: "architect", title: "AI Project Architect" },
  { id: "workflow", title: "How It Works" },
  { id: "examples", title: "Examples" },
]

export default function DocsPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-8">

        {/* LEFT NAV */}
        <aside className="w-60 shrink-0 sticky top-28 h-fit" >

          <p className="text-xs text-zinc-500 uppercase mb-4 tracking-wider">
            Documentation
          </p>

          <div className="space-y-3 text-sm">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block text-zinc-400 hover:text-white transition"
              >
                {s.title}
              </a>
            ))}
          </div>

        </aside>


        {/* DOCS CONTENT */}
        <main className="flex-1 max-w-3xl space-y-16 py-10">

          <section id="intro" className="space-y-4">
            <h1 className="text-4xl font-bold">StackLens AI</h1>

            <p className="text-zinc-400 leading-relaxed">
              StackLens AI helps developers analyze existing codebases
              and generate system architectures using artificial intelligence.
            </p>
          </section>


          <section id="codebase" className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Codebase Intelligence
            </h2>

            <p className="text-zinc-400">
              Analyze any GitHub repository and extract deep insights
              about the architecture and structure.
            </p>

            <ul className="list-disc ml-6 text-zinc-400 space-y-1">
              <li>Tech stack detection</li>
              <li>Architecture overview</li>
              <li>Dependency analysis</li>
              <li>Folder structure breakdown</li>
              <li>Key files and modules</li>
            </ul>
          </section>


          <section id="architect" className="space-y-4">
            <h2 className="text-2xl font-semibold">
              AI Project Architect
            </h2>

            <p className="text-zinc-400">
              Describe your project idea and StackLens generates
              a full development architecture.
            </p>
          </section>

        </main>


        {/* RIGHT SIDE */}
        <aside className="w-56 shrink-0 sticky top-24 h-fit">

          <p className="text-sm text-zinc-500 mb-4">
            On this page
          </p>

          <div className="space-y-2 text-sm">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block text-zinc-500 hover:text-white"
              >
                {s.title}
              </a>
            ))}
          </div>

        </aside>

      </div>

    </div>
  )
}