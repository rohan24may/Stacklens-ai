export async function analyzeRepository(repoData: any) {
  const deps = {
    ...repoData.dependencies,
    ...repoData.devDependencies,
  };

  const techStack: string[] = [];

  if (deps.next) techStack.push("Next.js");
  if (deps.react) techStack.push("React");
  if (deps.vue) techStack.push("Vue");
  if (deps.express) techStack.push("Express");
  if (deps.tailwindcss) techStack.push("Tailwind CSS");
  if (deps.prisma) techStack.push("Prisma");
  if (deps.mongodb) techStack.push("MongoDB");
  if (deps.pg || deps.postgres) techStack.push("PostgreSQL");

  const architecture =
    repoData.files?.some((f: string) => f.startsWith("app/"))
      ? "App Router architecture (Next.js)"
      : repoData.files?.some((f: string) => f.startsWith("pages/"))
      ? "Pages Router architecture (Next.js)"
      : "Standard Node/Frontend project structure";

  const keyModules = repoData.files
    ?.filter((f: string) =>
      ["app/", "pages/", "components/", "lib/", "src/"].some((p) =>
        f.startsWith(p)
      )
    )
    .slice(0, 10);

  return {
    techStack,
    architecture,
    keyModules,
    summary: `Repository built with ${techStack.join(", ") || "various tools"}.`,
  };
}

export function answerQuestion(question: string, ctx: any) {
  const q = question.toLowerCase();

  if (q.includes("tech")) {
    return `Tech Stack: ${ctx.techStack.join(", ")}`;
  }

  if (q.includes("architecture")) {
    return ctx.architecture;
  }

  if (q.includes("modules") || q.includes("structure")) {
    return `Key Modules: ${ctx.keyModules.join(", ")}`;
  }

  if (q.includes("summary") || q.includes("about")) {
    return ctx.summary;
  }

  return "I can answer about tech stack, architecture, or structure.";
}