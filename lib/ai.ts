export function analyzeRepository(repoData: any) {
  const deps = {
    ...repoData.dependencies,
    ...repoData.devDependencies,
  };

  // 🔥 TECH STACK DETECTION
  const techStack: string[] = [];

  const checks = [
    ["next", "Next.js"],
    ["react", "React"],
    ["vue", "Vue"],
    ["angular", "Angular"],
    ["express", "Express"],
    ["fastify", "Fastify"],
    ["tailwindcss", "Tailwind CSS"],
    ["bootstrap", "Bootstrap"],
    ["prisma", "Prisma"],
    ["mongoose", "MongoDB"],
    ["mongodb", "MongoDB"],
    ["pg", "PostgreSQL"],
    ["mysql", "MySQL"],
  ];

  checks.forEach(([key, name]) => {
    if (deps[key]) techStack.push(name as string);
  });

  if (!techStack.length && repoData.languages?.length) {
    techStack.push(...repoData.languages);
  }

  // 🔥 ARCHITECTURE DETECTION
  let architecture = "Monolithic";

  if (repoData.files?.some((f: string) => f.startsWith("app/"))) {
    architecture = "Next.js App Router";
  } else if (repoData.files?.some((f: string) => f.startsWith("pages/"))) {
    architecture = "Next.js Pages Router";
  } else if (repoData.files?.some((f: string) => f.includes("routes"))) {
    architecture = "API / Backend Architecture";
  } else if (repoData.files?.some((f: string) => f.includes("services"))) {
    architecture = "Service-based Architecture";
  }

  // 🔥 KEY MODULES
  const keyModules =
    repoData.files
      ?.filter((f: string) =>
        ["app/", "pages/", "components/", "lib/", "api/", "src/"].some((p) =>
          f.startsWith(p)
        )
      )
      .slice(0, 12) || [];

  // 🔥 PROJECT TYPE
  let projectType = "General Application";

  if (techStack.includes("Next.js") || techStack.includes("React")) {
    projectType = "Frontend / Fullstack Web App";
  } else if (techStack.includes("Express")) {
    projectType = "Backend API Server";
  }

  // 🔥 COMPLEXITY
  const complexity =
    keyModules.length > 10
      ? "High"
      : keyModules.length > 5
      ? "Medium"
      : "Low";

  // 🔥 SCORE SYSTEM (NEW 🔥)
  const score = {
    structure: Math.min(100, keyModules.length * 10),
    modernity: techStack.includes("Next.js") ? 90 : 60,
    scalability: complexity === "High" ? 85 : complexity === "Medium" ? 70 : 50,
  };

  // 🔥 CLEAN JSON (for UI later)
  const structured = {
    projectType,
    techStack,
    architecture,
    complexity,
    keyModules,
    score,
  };

  // 🔥 PREMIUM TEXT OUTPUT
  const summary = `
🚀 PROJECT OVERVIEW
This is a **${projectType}** built with **${
    techStack.join(", ") || "multiple technologies"
  }**.

🏗️ ARCHITECTURE
The project follows **${architecture}**, indicating a ${
    architecture.includes("Next")
      ? "modern fullstack design"
      : "structured modular system"
  }.

🧩 CORE MODULES
${keyModules.slice(0, 6).map((m: string) => `• ${m}`).join("\n")}

⚙️ COMPLEXITY
This project has a **${complexity} complexity level**, suggesting ${
    complexity === "High"
      ? "a scalable production-ready system"
      : complexity === "Medium"
      ? "moderate modularity"
      : "a simple structure"
  }.

📊 QUALITY SCORE
• Structure: ${score.structure}/100  
• Modernity: ${score.modernity}/100  
• Scalability: ${score.scalability}/100  

💡 INSIGHT
${
  techStack.includes("Next.js")
    ? "Optimized for performance, SSR, and scalability."
    : techStack.includes("Express")
    ? "Focused on backend API logic and data handling."
    : "General-purpose project with flexible architecture."
}
`;

  return {
    ...structured,
    summary,
  };
}

// 🔥 SMART CHAT RESPONDER
export function answerQuestion(question: string, ctx: any) {
  const q = question.toLowerCase();

  if (q.includes("tech")) {
    return `⚙️ Tech Stack:\n${ctx.techStack.join(", ")}`;
  }

  if (q.includes("architecture")) {
    return `🏗️ Architecture:\n${ctx.architecture}`;
  }

  if (q.includes("modules") || q.includes("structure")) {
    return `🧩 Key Modules:\n${ctx.keyModules.join(", ")}`;
  }

  if (q.includes("complexity")) {
    return `⚙️ Complexity: ${ctx.complexity}`;
  }

  if (q.includes("score")) {
    return `📊 Scores:
Structure: ${ctx.score.structure}
Modernity: ${ctx.score.modernity}
Scalability: ${ctx.score.scalability}`;
  }

  if (q.includes("type")) {
    return `📦 Project Type: ${ctx.projectType}`;
  }

  if (q.includes("summary") || q.includes("about")) {
    return ctx.summary;
  }

  return `🤖 You can ask about:
• Tech stack
• Architecture
• Structure
• Complexity
• Scores`;
}