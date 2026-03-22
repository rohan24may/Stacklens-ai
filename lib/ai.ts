export function analyzeRepository(repoData: any) {
  const deps = {
    ...repoData.dependencies,
    ...repoData.devDependencies,
  };

  const files: string[] = repoData.files || [];

  // 🔥 TECH STACK DETECTION (EXPANDED)
  const techStack: string[] = [];

  const checks = [
    ["next", "Next.js"],
    ["react", "React"],
    ["vue", "Vue"],
    ["angular", "Angular"],
    ["svelte", "Svelte"],
    ["express", "Express"],
    ["fastify", "Fastify"],
    ["nestjs", "NestJS"],
    ["django", "Django"],
    ["flask", "Flask"],
    ["spring", "Spring Boot"],
    ["tailwindcss", "Tailwind CSS"],
    ["bootstrap", "Bootstrap"],
    ["sass", "SASS"],
    ["prisma", "Prisma"],
    ["mongoose", "MongoDB"],
    ["mongodb", "MongoDB"],
    ["pg", "PostgreSQL"],
    ["mysql", "MySQL"],
    ["redis", "Redis"],
    ["firebase", "Firebase"],
    ["supabase", "Supabase"],
    ["docker", "Docker"],
    ["kubernetes", "Kubernetes"],
    ["jest", "Jest"],
    ["vitest", "Vitest"],
    ["cypress", "Cypress"],
  ];

  checks.forEach(([key, name]) => {
    if (deps[key]) techStack.push(name as string);
  });

  if (!techStack.length && repoData.languages?.length) {
    techStack.push(...repoData.languages);
  }

  // 🔥 ARCHITECTURE DETECTION (SMARTER)
  let architecture = "Monolithic";

  if (files.some((f) => f.startsWith("apps/") || f.startsWith("packages/"))) {
    architecture = "Monorepo (Turborepo / Nx style)";
  } else if (files.some((f) => f.startsWith("app/"))) {
    architecture = "Next.js App Router";
  } else if (files.some((f) => f.startsWith("pages/"))) {
    architecture = "Next.js Pages Router";
  } else if (files.some((f) => f.includes("microservices"))) {
    architecture = "Microservices Architecture";
  } else if (files.some((f) => f.includes("services"))) {
    architecture = "Service-based Architecture";
  } else if (files.some((f) => f.includes("routes"))) {
    architecture = "Backend API Architecture";
  }

  // 🔥 FILE INSIGHTS
  const hasDocker = files.includes("Dockerfile");
  const hasCI = files.some((f) => f.includes(".github/workflows"));
  const hasEnv = files.includes(".env") || files.includes(".env.example");
  const hasTests = files.some((f) =>
    f.includes("test") || f.includes("__tests__")
  );

  // 🔥 KEY MODULES (SMART GROUPING)
  const keyModules =
    files
      ?.filter((f) =>
        ["app/", "pages/", "components/", "lib/", "api/", "src/", "services/"].some((p) =>
          f.startsWith(p)
        )
      )
      .slice(0, 15) || [];

  // 🔥 PROJECT TYPE (BETTER LOGIC)
  let projectType = "General Application";

  if (techStack.includes("Next.js")) {
    projectType = "Fullstack Web Application";
  } else if (techStack.includes("React")) {
    projectType = "Frontend Web Application";
  } else if (
    techStack.includes("Express") ||
    techStack.includes("NestJS")
  ) {
    projectType = "Backend API Server";
  } else if (files.some((f) => f.endsWith(".ipynb"))) {
    projectType = "Machine Learning / Data Science Project";
  }

  // 🔥 COMPLEXITY (MORE FACTORS)
  let complexity = "Low";

  const scoreFactor =
    keyModules.length +
    techStack.length +
    (hasTests ? 3 : 0) +
    (hasDocker ? 2 : 0);

  if (scoreFactor > 20) complexity = "High";
  else if (scoreFactor > 10) complexity = "Medium";

  // 🔥 QUALITY SCORE (ADVANCED)
  const score = {
    structure: Math.min(100, keyModules.length * 7),
    modernity: techStack.includes("Next.js") || techStack.includes("NestJS") ? 90 : 60,
    scalability:
      complexity === "High" ? 90 : complexity === "Medium" ? 75 : 55,
    maintainability: hasTests ? 85 : 60,
    devops: hasDocker || hasCI ? 80 : 40,
  };

  // 🔥 EXTRA INSIGHTS
  const insights = {
    hasDocker,
    hasCI,
    hasEnv,
    hasTests,
  };

  // 🔥 FINAL STRUCTURE
  return {
    projectType,
    techStack,
    architecture,
    complexity,
    keyModules,
    score,
    insights,
  };
}
export function answerQuestion(question: string, ctx: any) {
  const q = question.toLowerCase();

  if (q.includes("tech")) {
    return `⚙️ Tech Stack:\n${ctx.techStack.join(", ")}`;
  }

  if (q.includes("architecture")) {
    return `🏗️ Architecture:\n${ctx.architecture}`;
  }

  if (q.includes("modules") || q.includes("structure")) {
    return `🧩 Key Modules:\n${ctx.keyModules.join("\n")}`;
  }

  if (q.includes("complexity")) {
    return `⚙️ Complexity: ${ctx.complexity}`;
  }

  if (q.includes("score")) {
    return `📊 Scores:
Structure: ${ctx.score.structure}
Modernity: ${ctx.score.modernity}
Scalability: ${ctx.score.scalability}
Maintainability: ${ctx.score.maintainability}
DevOps: ${ctx.score.devops}`;
  }

  if (q.includes("docker")) {
    return ctx.insights.hasDocker
      ? "🐳 Docker is used in this project."
      : "❌ No Docker setup found.";
  }

  if (q.includes("test")) {
    return ctx.insights.hasTests
      ? "✅ Testing setup detected."
      : "❌ No tests found.";
  }

  return `🤖 Ask about:
• Tech stack
• Architecture
• Modules
• Complexity
• Scores
• Docker / CI / Tests`;
}