"use server";

import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createProject(repoUrl: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const repoName = repoUrl.split("/").slice(-1)[0];

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: userId,
      repo_url: repoUrl,
      repo_name: repoName,
      visibility: "public",
      status: "processing",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  redirect(`/project/${data.id}`);
}