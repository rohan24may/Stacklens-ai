export default function Preview() {
  return (
    <section className="py-32 px-6">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold text-center mb-16">
          See What StackLens Generates
        </h2>

        <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md p-8 grid md:grid-cols-3 gap-8">

          <div>
            <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
            <p className="text-gray-400 text-sm">
              Next.js 16, TypeScript, Tailwind CSS, Supabase
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Architecture</h3>
            <p className="text-gray-400 text-sm">
              App Router with Server Actions, API integrations, modular
              components, and scalable folder structure.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Folder Structure</h3>
            <p className="text-gray-400 text-sm">
              app/, components/, lib/, actions/, types/
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}