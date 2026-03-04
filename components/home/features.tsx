import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function Features() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Title */}
        <h2 className="text-3xl font-semibold text-center mb-16">
          Built for Developers
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          <SpotlightCard>
            <h3 className="text-lg font-semibold mb-2">
              Instant Codebase Understanding
            </h3>
            <p className="text-gray-400 text-sm">
              StackLens analyzes repository structure and explains architecture.
            </p>
          </SpotlightCard>

          <SpotlightCard>
            <h3 className="text-lg font-semibold mb-2">
              Tech Stack Detection
            </h3>
            <p className="text-gray-400 text-sm">
              Automatically identifies frameworks, languages, and libraries.
            </p>
          </SpotlightCard>

          <SpotlightCard>
            <h3 className="text-lg font-semibold mb-2">
              Architecture Insights
            </h3>
            <p className="text-gray-400 text-sm">
              Understand system design and how components interact.
            </p>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
}