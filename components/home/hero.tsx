"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] pointer-events-none"></div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
        Understand Any Codebase
        <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          in Minutes with AI
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-2xl text-gray-400 text-lg">
        StackLens analyzes GitHub repositories and explains architecture,
        tech stack, folder structure, and data flow instantly so developers
        can understand any project faster.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex items-center gap-4">

        <Link
          href="/sign-up"
          className="bg-white text-black px-6 py-3 rounded-full font-medium text-sm hover:bg-gray-200 transition"
        >
          Get Started
        </Link>

        <Link
          href="/dashboard"
          className="border border-white/10 px-6 py-3 rounded-full text-sm hover:bg-white/5 transition"
        >
          View Demo
        </Link>

      </div>

    </section>
  );
}