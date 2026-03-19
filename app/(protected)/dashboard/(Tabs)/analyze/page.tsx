"use client";

import { Github } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/db/supabase";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useRef } from "react";
import { useUser } from "@clerk/nextjs";

export default function AnalyzePage() {
  const [repo, setRepo] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const bottomRef = useRef<any>(null);
  const { user } = useUser();
  
  
useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  const tryParseJSON = (str: string) => {
  try {
    return JSON.parse(str);
  } catch {
    return str;
    
  }
};

useEffect(() => {
  const load = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("PROJECTS:", data); 

    setProjects(data || []);
  };

  load();
}, []);

const loadProject = async (project: any) => {
  setProjectId(project.id);
  setStarted(true);

  const { data } = await supabase
    .from("project_messages")
    .select("*")
    .eq("project_id", project.id)
    .order("created_at", { ascending: true });

setMessages(
  data.map((m: any) => ({
    role: m.role,
    content:
      m.role === "assistant"
        ? tryParseJSON(m.message)
        : m.message,
  }))
);
};
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

  // 🔹 1. Call analysis API
  const res = await fetch("/api/analyze", {
    method: "POST",
    body: JSON.stringify({ repoUrl: repo }),
  });

  const apiData: any = await res.json(); // ✅ renamed

  // 🔹 2. Create project (FIXED)
const { data: projectData, error } = await supabase
  .from("projects")
  .insert([
    {
      user_id: user?.id,
      repo_url: repo,
      repo_name: repo.split("github.com/")[1],
      status: "analyzed",
    },
  ])
  .select();
  

  const project = projectData?.[0];

  console.log("NEW PROJECT:", project);

  // 🔹 3. Update states
  if (project) {
    setProjectId(project.id);

    setProjects((prev) => {
      const exists = prev.find((p) => p.id === project.id);
      if (exists) return prev;
      return [project, ...prev];
    });
  }

  setAnalysis(apiData.data);

  // 🔹 4. Save AI output
  if (project?.id) {
    await supabase.from("ai_outputs").insert({
      project_id: project.id,
      output_type: "analysis",
      ai_output_json: apiData.data,
    });
  }

  // 🔹 5. Stream response
  setMessages([
    {
      role: "assistant",
      content: "",
    },
  ]);

  await streamText(
    `🚀 Analysis Complete\n\n${apiData.data.summary}\n\nTech Stack: ${apiData.data.techStack.join(
      ", "
    )}\n\nArchitecture: ${apiData.data.architecture}\n\nKey Modules: ${apiData.data.keyModules.join(
      ", "
    )}`
  );

  // 🔹 6. Save first message
  if (project?.id) {
    await supabase.from("project_messages").insert({
      project_id: project.id,
      role: "assistant",
      message: JSON.stringify(apiData.data),
    });
  }

  setLoading(false);
};

  /* ================= CHAT ================= */
const sendMessage = async () => {
  if (!input || !analysis || !projectId) return;

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

  // ✅ Save chat messages
await supabase.from("project_messages").insert([
  {
    project_id: projectId,
    role: "user",
    message: userMsg,
  },
  {
    project_id: projectId,
    role: "assistant",
    message: data.answer,
  },
]);

  await streamText(data.answer);
};
  return (
    <div className="flex">
<Sidebar projects={projects} onSelect={loadProject} />

       <div className="flex-1 px-6 py-10">

      {/* TOP CARD */}
<div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition">
  <div className="rounded-2xl bg-[#0b0b0b]/80 backdrop-blur-xl p-6 border border-[#1a1a1a]">

    <div className="flex items-center gap-2 mb-3">
      <Github size={18} className="text-purple-400" />
      <h2 className="text-lg font-semibold">
        Analyze GitHub Repository
      </h2>
    </div>

    <p className="text-sm text-zinc-400 mb-5">
      Paste a GitHub repository URL to analyze architecture, tech stack, and structure.
    </p>

    <div className="flex gap-3">
      <input
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        placeholder="https://github.com/user/repo"
        className="flex-1 bg-black/40 border border-[#1a1a1a] rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition"
      />

      <button
        onClick={handleAnalyze}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/20"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>

  </div>
</div>

{!started && (
  <div className="text-center mt-20 text-zinc-500">
    <p className="text-lg">Analyze any GitHub repo</p>
    <p className="text-sm mt-1">
      Get architecture, tech stack, and insights instantly
    </p>
  </div>
)}

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
                className={`max-w-[75%] px-5 py-4 text-sm leading-relaxed rounded-2xl transition-all ${
  msg.role === "user"
    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg"
    : "bg-[#0f0f0f] border border-[#1f1f1f] text-zinc-300 backdrop-blur-md whitespace-pre-line"
}`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />

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
    </div>
  );
}

function tryParseJSON(str: string) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}
