export default function Features() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold text-center mb-16">
          Built for Developers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <h3 className="font-semibold mb-3">Instant Codebase Understanding</h3>
            <p className="text-gray-400 text-sm">
              Understand architecture, tech stack, and folder structure in seconds.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <h3 className="font-semibold mb-3">AI Architecture Analysis</h3>
            <p className="text-gray-400 text-sm">
              StackLens explains how different parts of a project interact.
            </p>
          </div>

          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <h3 className="font-semibold mb-3">Faster Onboarding</h3>
            <p className="text-gray-400 text-sm">
              Join new projects and understand large repositories instantly.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}