"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Layers,
  GitBranch,
  FileCode,
  FolderTree,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Repository Analysis",
    desc: "StackLens scans the entire repository and explains the architecture and system design.",
  },
  {
    icon: Layers,
    title: "Tech Stack Detection",
    desc: "Automatically identifies frameworks, libraries and tools used in the project.",
  },
  {
    icon: GitBranch,
    title: "Architecture Breakdown",
    desc: "Understand how different modules and services interact inside the project.",
  },
  {
    icon: FileCode,
    title: "Key File Discovery",
    desc: "Find the most important files so you know where to start exploring the codebase.",
  },
  {
    icon: FolderTree,
    title: "Folder Structure Overview",
    desc: "Visualize the project structure to navigate complex repositories faster.",
  },
  {
    icon: Sparkles,
    title: "AI Code Explanations",
    desc: "Complex code is simplified with AI explanations to help developers learn faster.",
  },
];

export default function Features() {
  return (
    <section className="relative py-32 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold">
            Key Capabilities of StackLens
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Powerful AI tools designed to help developers understand any
            GitHub repository faster.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 relative overflow-hidden"
              >
                {/* glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-blue-500/20 blur-2xl" />

                <Icon
                  size={32}
                  className="text-blue-400 mb-4 relative z-10"
                />

                <h3 className="text-lg font-semibold mb-2 relative z-10">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm relative z-10">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}