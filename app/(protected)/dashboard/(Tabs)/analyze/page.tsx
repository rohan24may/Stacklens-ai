"use client";

import { Github } from "lucide-react";
import { useState } from "react";

export default function AnalyzePage() {
  const [repo, setRepo] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  /* ================= STREAMING ================= */
  const streamText = async (text: string) => {
    let current = "";

    for (let i = 0; i < text.length; i++) {
      current += text[i];

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: current,
        };
        return updated;
      });

      await new Promise((res) => setTimeout(res, 10));
    }
  };

  /* ================= ANALYZE ================= */
const handleAnalyze = async () => {
  if (!repo) return;

  setStarted(true);
  setLoading(true);

  setMessages([
    {
      role: "assistant",
      content: "Analyzing repository...",
    },
  ]);

  const res = await fetch("/api/analyze", {
    method: "POST",
    body: JSON.stringify({ repoUrl: repo }),
  });

  const data: any = await res.json();
  
  setAnalysis(data.data);

  setMessages([
    {
      role: "assistant",
      content: "",
    },
  ]);

  await streamText(
    `🚀 Analysis Complete\n\n${data.data.summary}\n\nTech Stack: ${data.data.techStack.join(
      ", "
    )}\n\nArchitecture: ${data.data.architecture}\n\nKey Modules: ${data.data.keyModules.join(
      ", "
    )}`
  );

  setLoading(false);
};

  /* ================= CHAT ================= */
const sendMessage = async () => {
  if (!input || !analysis) return;

  const userMsg = input;

  setMessages((prev) => [
    ...prev,
    { role: "user", content: userMsg },
    { role: "assistant", content: "" },
  ]);

  setInput("");

  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      question: userMsg,
      context: analysis,
    }),
  });

  const data: any = await res.json();

  await streamText(data.answer);
};
  return (
    <div className="px-6 py-10">

      {/* TOP CARD */}
      <div className="max-w-3xl mx-auto border border-[#1a1a1a] rounded-2xl bg-[#0e0e0e] p-6">

        <div className="flex items-center gap-2 mb-2">
          <Github size={18} className="text-purple-400" />
          <h2 className="text-lg font-semibold">
            Analyze GitHub Repository
          </h2>
        </div>

        <p className="text-sm text-zinc-400 mb-4">
          Paste a GitHub repository URL to analyze architecture, tech stack, and structure.
        </p>

        <div className="flex gap-3">
          <input
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="https://github.com/user/repo"
            className="flex-1 bg-black/40 border border-[#1a1a1a] rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500"
          />

          <button
            onClick={handleAnalyze}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-sm font-medium hover:opacity-90 transition"
          >
            Analyze
          </button>
        </div>

      </div>

      {/* CHAT */}
      {started && (
        <div className="max-w-3xl mx-auto mt-10 flex flex-col gap-6">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-5 py-4 text-sm leading-relaxed rounded-2xl ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                    : "bg-[#111111] border border-[#1a1a1a] text-zinc-300 whitespace-pre-line"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* INPUT */}
          <div className="flex gap-3 mt-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this repository..."
              className="flex-1 bg-black/40 border border-[#1a1a1a] rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500"
            />

            <button
              onClick={sendMessage}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-sm font-medium hover:opacity-90 transition"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  );
}