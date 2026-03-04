"use client";

import { useState } from "react";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RepoInput() {
  const [repoUrl, setRepoUrl] = useState("");
  const router = useRouter();

  const handleAnalyze = () => {
    if (!repoUrl) return;

    // later this will trigger server action
    router.push("/analyze");
  };

  return (
    <div className="mt-16 w-full max-w-3xl mx-auto">

      <div className="flex items-center gap-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-4 py-3">

        <Github className="text-gray-400" size={20} />

        <input
          type="text"
          placeholder="Paste GitHub repository URL..."
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
        />

        <button
          onClick={handleAnalyze}
          className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
        >
          Analyze
        </button>

      </div>

      <p className="text-gray-500 text-sm mt-4 text-center">
        Example: https://github.com/vercel/next.js
      </p>

    </div>
  );
}