export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center px-6">
      
      <h1 className="text-5xl font-semibold tracking-tight text-center">
        StackLens<span className="text-purple-500">.</span>
      </h1>

      <p className="mt-6 text-neutral-400 text-lg text-center max-w-xl">
        Understand any codebase in minutes with AI.
        Paste a GitHub repo. Get architecture breakdowns instantly.
      </p>

      <div className="mt-10 flex gap-4">
        <a
          href="/auth"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
        >
          Get Started
        </a>

        <a
          href="#"
          className="px-6 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-800 transition"
        >
          Learn More
        </a>
      </div>
    </main>
  );
}