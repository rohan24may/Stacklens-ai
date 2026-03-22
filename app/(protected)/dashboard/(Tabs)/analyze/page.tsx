"use client";

import { Github } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/db/supabase";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const [autoScroll, setAutoScroll] = useState(true);
  
  useEffect(() => {
  if (started) {
    inputRef.current?.focus();
  }
}, [started, projectId]);

useEffect(() => {
  if (autoScroll) {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages, autoScroll]);

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
      .maybeSingle();

if (project && project.id !== projectId) {
  loadProject(project);

    }
  };

  loadFromUrl();
}, [projectIdFromUrl, projectId]);

  // ✅ Load project
  const loadProject = async (project: any) => {
    
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
      .maybeSingle()

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
console.log("API DATA:", apiData);
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
  setProjectId(project.id);

  setProjects((prev) => {
    const exists = prev.find((p) => p.id === project.id);
    if (exists) return prev;
    return [project, ...prev];
  });
}

const result = apiData.data || apiData;
setAnalysis(result);

// save analysis
if (project?.id) {
  await supabase.from("ai_outputs").insert([
    {
      project_id: project.id,
      output_type: "analysis",
      ai_output_json: result,
    },
  ]);
}

const formattedText = `# 🚀 ${repo.split("/").pop()} – Full Repo Breakdown

🔗 ${repo}

---

## 🧠 What this project is (Core Idea)

This project is a **${result.projectType}**

### 💡 In simple terms:
- Built using: ${result.techStack.join(", ")}
- Architecture: ${result.architecture}
- Designed for ${
  result.techStack.includes("Next.js")
    ? "modern fullstack web applications"
    : "structured modular systems"
}

⚡ Basically: **AI-powered GitHub project analyzer**

---

## 🏗️ Tech Stack

### 🎨 Frontend
${result.techStack
  .filter((t: string) =>
    ["Next.js", "React", "Vue", "Angular", "Tailwind CSS"].includes(t)
  )
  .map((t: string) => `- ${t}`)
  .join("\n") || "- Not clearly detected"}

---

### ⚙️ Backend / Architecture
- ${result.architecture}

---

### 🗄️ Database
- ${result.techStack.includes("MongoDB") ? "MongoDB" : "Supabase / Unknown"}

Used for:
- storing projects
- user data
- chat history

---

## 🧩 Core Features

### 1. 🔗 Repository Input
- Accepts GitHub repo URL
- Fetches repo data

---

### 2. 🤖 AI Analysis Engine
- Reads project structure
- Generates:
  - Overview
  - Architecture
  - Tech stack
  - Module breakdown

---

### 3. 📂 Project Structure

${result.keyModules
  .slice(0, 10)
  .map((m: string) => `- ${m}`)
  .join("\n")}

---

## 🏛️ Architecture

\`\`\`
${result.keyModules.slice(0, 6).join("\n")}
\`\`\`

---

## ⚙️ Complexity Analysis

### Level: ${result.complexity}

${
  result.complexity === "High"
    ? "- Highly modular and scalable system\n- Production-ready architecture"
    : result.complexity === "Medium"
    ? "- Balanced structure\n- Moderate scalability"
    : "- Simple and easy to understand"
}

---

## 📊 Quality Score

- Structure: ${result.score.structure}
- Modernity: ${result.score.modernity}
- Scalability: ${result.score.scalability}
- Maintainability: ${result.score.maintainability}
- DevOps: ${result.score.devops}

---

## 💡 Insights

${
  result.techStack.includes("Next.js")
    ? "Modern web architecture with strong performance capabilities."
    : "Flexible system with potential for further optimization."
}

---
## 🧪 DevOps & Setup

- Docker: ${result.insights.hasDocker ? "✅ Present" : "❌ Not found"}
- CI/CD: ${result.insights.hasCI ? "✅ Configured" : "❌ Not found"}
- Environment Config: ${result.insights.hasEnv ? "✅ Present" : "❌ Missing"}
- Testing: ${result.insights.hasTests ? "✅ Tests included" : "❌ No tests"}

---

## 🧨 Final Verdict

### ⭐ Current State:
Well-structured project with ${
  result.complexity === "High" ? "strong scalability" : "good foundations"
}

### 🚀 Potential:
Can evolve into a **production-grade or portfolio-level project**
`;

await streamText(formattedText); // save message
    if (project?.id) {
      await supabase.from("project_messages").insert({
        project_id: project.id,
        role: "assistant",
       message: formattedText, 
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
  // reset state
  setProjectId(null);
  setMessages([]);
  setAnalysis(null);
  setRepo("");
  setStarted(false);

  router.push("/dashboard/analyze");

  // focus
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
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAnalyze();
    }
  }}
  placeholder="https://github.com/user/repo"
  className="flex-1 bg-black/40 border border-[#1a1a1a] rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500"
/>

<button
  onClick={handleAnalyze}
  disabled={loading}
  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all
  ${
    loading
      ? "bg-zinc-700 cursor-not-allowed opacity-60"
      : "bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
  }`}
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
        <div
  onScroll={(e) => {
    const target = e.currentTarget;
    const isAtBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 50;

    setAutoScroll(isAtBottom);
  }}
  className="max-w-3xl mx-auto mt-10 flex flex-col gap-6"
>

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-5 py-4 text-sm leading-relaxed rounded-2xl transition-all ${
  msg.role === "user"
    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg"
    : "bg-gradient-to-br from-[#0f0f0f] to-[#111] border border-[#222] shadow-[0_0_30px_rgba(0,0,0,0.3)] text-zinc-300 backdrop-blur-md"
}`}
              >
         <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: (props) => <h1 className="text-3xl font-bold my-5" {...props} />,
    h2: (props) => <h2 className="text-xl font-semibold mt-6 mb-3" {...props} />,
    h3: (props) => <h3 className="text-lg font-medium mt-4 mb-2" {...props} />,
    p: (props) => <p className="mb-3 leading-7 text-zinc-300" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />,
    li: (props) => <li className="text-zinc-300" {...props} />,
    hr: () => <hr className="my-4 border-zinc-700" />,
code: ({ node, inline, className, children, ...props }: any) => {
  if (inline) {
    return (
      <code className="bg-zinc-800 px-1 rounded" {...props}>
        {children}
      </code>
    );
  }

  return (
    <pre className="bg-black p-3 rounded mb-3 overflow-x-auto">
      <code {...props}>{children}</code>
    </pre>
  );
},
  }}
>
  {msg.content}
</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />

          {/* INPUT */}
          <div className="flex gap-3 mt-4">
            <input
            ref={inputRef}
onKeyDown={(e) => {
  if (e.key === "Enter" && !loading) {
    e.preventDefault();
    handleAnalyze();
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
