export default function HowItWorks() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-3xl font-semibold mb-16">
          How StackLens Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="font-semibold mb-2">1. Paste a Repository</h3>
            <p className="text-gray-400 text-sm">
              Enter any public GitHub repository URL.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. AI Analyzes the Code</h3>
            <p className="text-gray-400 text-sm">
              StackLens reads the project structure and important files.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Get Structured Insights</h3>
            <p className="text-gray-400 text-sm">
              Receive clear explanations of architecture and system design.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}