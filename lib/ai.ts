export function analyzeRepository(repoData: any) {
  const deps = {
    ...repoData.dependencies,
    ...repoData.devDependencies,
  };

  let techStack: string[] = [];

  // deps detection
  if (deps.next) techStack.push("Next.js");
  if (deps.react) techStack.push("React");
  if (deps.vue) techStack.push("Vue");
  if (deps.express) techStack.push("Express");
  if (deps.tailwindcss) techStack.push("Tailwind CSS");
  if (deps.prisma) techStack.push("Prisma");

  // fallback → languages
  if (techStack.length === 0 && repoData.languages?.length) {
    techStack = repoData.languages;
  }

  // architecture
  let architecture = "Standard project structure";

  if (repoData.files?.some((f: string) => f.startsWith("app/"))) {
    architecture = "Next.js App Router";
  } else if (repoData.files?.some((f: string) => f.startsWith("pages/"))) {
    architecture = "Next.js Pages Router";
  } else if (repoData.files?.some((f: string) => f.includes("routes"))) {
    architecture = "Backend (Express-like)";
  }

  // smarter modules
  const keyModules = repoData.files
    ?.filter((f: string) =>
      ["app/", "pages/", "components/", "lib/", "api/"].some((p) =>
        f.startsWith(p)
      )
    )
    .slice(0, 8);

  // better summary
  const summary = `
This repository uses ${techStack.join(", ") || "multiple technologies"}.

Architecture follows: ${architecture}.

Main areas include: ${keyModules.slice(0, 3).join(", ")}.
`;

  return {
    techStack: techStack.length ? techStack : ["Not detected"],
    architecture,
    keyModules,
    summary,
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