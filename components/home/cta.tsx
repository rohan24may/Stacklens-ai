import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-32 px-6 text-center">

      <h2 className="text-4xl font-semibold mb-6">
        Start Understanding Codebases Faster
      </h2>

      <p className="text-gray-400 mb-10">
        Analyze GitHub repositories with AI and understand projects instantly.
      </p>

      <Link
        href="/sign-up"
        className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
      >
        Get Started
      </Link>

    </section>
  );
}