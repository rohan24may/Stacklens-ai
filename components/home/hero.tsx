"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import WrapButton from "../ui/wrap-button";


export default function Hero() {
  return (
    <><section className="relative flex flex-col items-center justify-center text-center  pt-40 ">
      <BackgroundBeams />
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
    </section><WrapButton className="mt-6" href="/dashboard">
  Analyze Repository
</WrapButton>
</>
  );
}