"use client";

import { useState } from "react";
import { createProject } from "@/actions/project.action";

export default function AnalyzePage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!repoUrl) return;

    setLoading(true);
    try {
      await createProject(repoUrl);
      setRepoUrl("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-semibold">
          Analyze Repository
        </h1>

        <input
          type="text"
          placeholder="https://github.com/user/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full bg-[#111113] border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
    </div>
  );
}