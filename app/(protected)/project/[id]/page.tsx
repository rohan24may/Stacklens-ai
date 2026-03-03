import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

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

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-10">
      <h1 className="text-3xl font-semibold">{project.repo_name}</h1>
      <p className="text-neutral-400 mt-2">{project.repo_url}</p>

      <div className="mt-6">
        <span className="px-4 py-2 rounded-full bg-yellow-600/20 text-yellow-400 text-sm">
          {project.status}
        </span>
      </div>
    </div>
  );
}