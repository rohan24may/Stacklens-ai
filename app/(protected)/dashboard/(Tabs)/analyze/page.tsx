"use client";

import { Github } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/db/supabase";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AnalyzePage({ projectIdFromUrl }: any) {
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
  const inputRef = useRef<any>(null);
const router = useRouter();
  
  useEffect(() => {
  if (started) {
    inputRef.current?.focus();
  }
}, [started, projectId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: messages.length > 1 ? "smooth" : "auto"});
  }, [messages]);

  const tryParseJSON = (str: string) => {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  };

  // ✅ Load projects
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      setProjects(data || []);
    };

    load();
  }, []);

  useEffect(() => {
  if (!projectIdFromUrl) return;

  const loadFromUrl = async () => {
    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectIdFromUrl)
      .single();

    if (project) {
      loadProject(project);
    }
  };

  loadFromUrl();
}, [projectIdFromUrl]);

  // ✅ Load project
  const loadProject = async (project: any) => {
    router.push(`/dashboard/analyze/${project.id}`);
    setProjectId(project.id);
    setStarted(true);
    setTimeout(() => {
  inputRef.current?.focus();
}, 50);

    // load analysis
    const { data: aiData } = await supabase
      .from("ai_outputs")
      .select("*")
      .eq("project_id", project.id)
      .single();

    setAnalysis(aiData?.ai_output_json);

    // load messages
    const { data } = await supabase
      .from("project_messages")
      .select("*")
      .eq("project_id", project.id)
      .order("created_at", { ascending: true });

    setMessages(
      (data || []).map((m: any) => ({
        role: m.role,
        content:
          m.role === "assistant"
            ? tryParseJSON(m.message)
            : m.message,
      }))
    );
  };

  // ✅ Streaming
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

  // ✅ Analyze
  const handleAnalyze = async () => {
    if (!repo) return;

    setStarted(true);
    setLoading(true);

setMessages([
  { role: "assistant", content: "Analyzing..." },
]);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ repoUrl: repo }),
    });

    const apiData: any = await res.json();

    // create project
const { data: projectData, error } = await supabase
  .from("projects")
  .insert([
    {
      user_id: user?.id || "temp-user",
      repo_url: repo,
      repo_name: repo.split("github.com/")[1],
      status: "completed",
    },
  ])
  .select();

console.log("INSERT RESULT:", projectData, error);

    const project = projectData?.[0];

    if (project) {
      router.push(`/dashboard/analyze/${project.id}`);
      
      setProjectId(project.id);

      setProjects((prev) => {
        const exists = prev.find((p) => p.id === project.id);
        if (exists) return prev;
        return [project, ...prev];
      });
    }

    setAnalysis(apiData.data);

    // save analysis
    if (project?.id) {
      await supabase.from("ai_outputs").insert({
        project_id: project.id,
        output_type: "analysis",
        ai_output_json: apiData.data,
      });
    }

    // stream response
    setMessages([{ role: "assistant", content: "" }]);

    await streamText(
      `🚀 Analysis Complete\n\n${apiData.data.summary}\n\nTech Stack: ${apiData.data.techStack.join(
        ", "
      )}\n\nArchitecture: ${
        apiData.data.architecture
      }\n\nKey Modules: ${apiData.data.keyModules.join(", ")}`
    );

    // save message
    if (project?.id) {
      await supabase.from("project_messages").insert({
        project_id: project.id,
        role: "assistant",
        message: JSON.stringify(apiData.data),
      });
    }

    setLoading(false);
  };

  // ✅ Chat
  const sendMessage = async () => {
    if (!input.trim() || !projectId) return;

    const userMsg = input;

setMessages((prev) => [
  ...prev,
  { role: "user", content: userMsg },
  { role: "assistant", content: "Thinking..." },
]);

    setInput("");
    inputRef.current?.focus();

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        question: userMsg,
        context: analysis,
      }),
    });

    const data: any = await res.json();

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

// NEW CHAT
const startNewChat = () => {
  // reset everything instantly
  setProjectId(null);
  setMessages([]);
  setAnalysis(null);
  setRepo("");
  setStarted(false); // (no delay)

  // focus input after reset
  setTimeout(() => {
    inputRef.current?.focus();
  }, 50);
};

// DELETE
const deleteProject = async (id: string) => {
  // delete messages
  await supabase.from("project_messages").delete().eq("project_id", id);

  // delete analysis
  await supabase.from("ai_outputs").delete().eq("project_id", id);

  // delete project
  await supabase.from("projects").delete().eq("id", id);

  // update UI
  setProjects((prev) => prev.filter((p) => p.id !== id));

  if (projectId === id) {
    startNewChat();
  }
};

// RENAME
const renameProject = async (id: string, name: string) => {
  await supabase
    .from("projects")
    .update({ repo_name: name })
    .eq("id", id);

  setProjects((prev) =>
    prev.map((p) => (p.id === id ? { ...p, repo_name: name } : p))
  );
};

  return (
    <div className="flex">

<Sidebar
  projects={projects}
  onSelect={loadProject}
  onDelete={deleteProject}
  onNew={startNewChat}
  onRename={renameProject}
/>

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
                <div>
  {typeof msg.content === "object"
    ? JSON.stringify(msg.content, null, 2)
    : msg.content}
</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />

          {/* INPUT */}
          <div className="flex gap-3 mt-4">
            <input
            ref={inputRef}
            onKeyDown={(e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}}
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
