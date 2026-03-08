import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getRepoData } from "@/lib/github";
import { analyzeRepository } from "@/lib/ai";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { userId } = await auth();
  if (!userId) return notFound();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (!project || error) return notFound();

  const repoData = await getRepoData(project.repo_url);

  const analysis = await analyzeRepository(repoData);

  console.log("AI RESULT:", analysis);
return (
  <div className="min-h-screen bg-[#0b0b0b] text-white">

    <div className="max-w-6xl mx-auto px-8 py-10 space-y-10">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.repo_name}
          </h1>

          <a
            href={project.repo_url}
            target="_blank"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            {project.repo_url}
          </a>
        </div>

        <div className="flex items-center gap-3">

          <span className="px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-xs border border-yellow-500/20">
            {project.status}
          </span>

          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-sm font-medium hover:opacity-90 transition">
            Re-Analyze
          </button>

        </div>

      </div>


      {/* Repo Info */}
      <div className="border border-[#1a1a1a] rounded-xl bg-[#0e0e0e] p-6">

        <h2 className="text-lg font-medium mb-4">
          Repository Information
        </h2>

        <div className="grid grid-cols-3 gap-6 text-sm">

          <div>
            <p className="text-zinc-500">Repository</p>
            <p className="text-white mt-1">{project.repo_name}</p>
          </div>

          <div>
            <p className="text-zinc-500">Status</p>
            <p className="text-white mt-1 capitalize">{project.status}</p>
          </div>

          <div>
            <p className="text-zinc-500">Project ID</p>
            <p className="text-white mt-1">{project.id}</p>
          </div>

        </div>

      </div>


      {/* AI Analysis Section */}
      <div className="border border-[#1a1a1a] rounded-xl bg-[#0e0e0e] p-6">

        <h2 className="text-lg font-medium mb-4">
          AI Analysis
        </h2>

        <div className="text-sm text-zinc-400">
          Analysis results will appear here after the repository
          has been processed.
        </div>

        <div className="mt-6 border border-dashed border-[#1a1a1a] rounded-lg p-10 text-center text-zinc-500 text-sm">
          No analysis data available yet.
        </div>

      </div>

    </div>

  </div>
);
}