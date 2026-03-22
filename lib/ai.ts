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
export function answerQuestion(question: string, ctx: any, history: any[] = []) {
  const q = question.toLowerCase();

  // 🔥 MEMORY CONTEXT (last 2 messages)
  const lastContext = history
    .slice(-2)
    .map((m) => m.content)
    .join(" ");

  // 🔥 INVALID FILTER
  const invalidPatterns = ["hi", "hello", "hey", "how are you", "what's up"];

  if (invalidPatterns.some((p) => q === p || q.includes(p))) {
    return `🤖 Ask something about the repository.

Examples:
• What tech stack is used?
• How is the architecture designed?
• What can be improved?
• Any issues in this project?`;
  }

  // 🔥 IMPROVEMENTS
  if (q.includes("improve") || q.includes("improvement")) {
    const suggestions = [];

    if (!ctx.insights.hasTests)
      suggestions.push("Add testing (Jest / Vitest)");

    if (!ctx.insights.hasDocker)
      suggestions.push("Add Docker setup");

    if (!ctx.insights.hasCI)
      suggestions.push("Add CI/CD (GitHub Actions)");

    if (ctx.score.structure < 70)
      suggestions.push("Improve folder structure");

    if (!suggestions.length)
      suggestions.push("Project is already well-structured");

    return `## 🚀 Improvements

${suggestions.map((s) => `- ${s}`).join("\n")}`;
  }

  // 🔥 ISSUES
  if (q.includes("issue") || q.includes("problem")) {
    const issues = [];

    if (!ctx.insights.hasTests)
      issues.push("No testing setup");

    if (!ctx.insights.hasCI)
      issues.push("No CI/CD");

    if (!ctx.insights.hasEnv)
      issues.push("Missing env config");

    if (ctx.score.devops < 50)
      issues.push("Weak DevOps");

    if (!issues.length)
      issues.push("No major issues detected");

    return `## ⚠️ Issues

${issues.map((i) => `- ${i}`).join("\n")}`;
  }

  // 🔥 TECH STACK
  if (q.includes("tech")) {
    return `## ⚙️ Tech Stack

${ctx.techStack.map((t: string) => `- ${t}`).join("\n")}

### 💡 Insight
This is a ${
      ctx.techStack.includes("Next.js")
        ? "modern fullstack system"
        : "general project"
    }`;
  }

  // 🔥 ARCHITECTURE
  if (q.includes("architecture")) {
    return `## 🏗️ Architecture

${ctx.architecture}

### 💡 Explanation
${
  ctx.architecture.includes("Next")
    ? "Uses modern routing and fullstack rendering"
    : "Structured modular backend system"
}`;
  }

  // 🔥 FILE AWARE
  if (q.includes("where") || q.includes("file") || q.includes("location")) {
    return `## 📂 Relevant Files

${ctx.keyModules.slice(0, 8).map((f: string) => `- ${f}`).join("\n")}`;
  }

  // 🔥 COMPLEXITY
  if (q.includes("complexity")) {
    return `## ⚙️ Complexity

${ctx.complexity}

${
  ctx.complexity === "High"
    ? "Highly scalable system"
    : ctx.complexity === "Medium"
    ? "Moderate structure"
    : "Simple project"
}`;
  }

  // 🔥 SMART FALLBACK (GPT FEEL)
  return `## 🤖 Answer

Based on the repository:

- Type: ${ctx.projectType}
- Architecture: ${ctx.architecture}
- Tech: ${ctx.techStack.slice(0, 3).join(", ")}

### 💡 Interpretation
This question relates to the project structure and implementation. 
Try asking more specific questions like:

• Where is authentication handled?
• How scalable is this project?
• What can be improved?`;
}