

function buildReasoning(ctx: any) {
  return `
### 🧠 How I’m Thinking
- This is a ${ctx.projectType || "project"}
- Built with ${(ctx.techStack || []).slice(0, 3).join(", ")}
- Uses ${ctx.architecture || "unknown architecture"}

### 🔍 What I’m Looking At
- Project structure (key modules)
- Tech stack and dependencies
- DevOps & testing setup
`;
}

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
  const fileMap = files.slice(0, 100);

  // 🔥 FINAL STRUCTURE
  return {
    projectType,
    techStack,
    architecture,
    complexity,
    keyModules,
    score,
    insights,
    fileMap,
  };
}
export function answerQuestion(question: string, ctx: any, history: any[] = []) {
  try {
    const q = (question || "").toLowerCase();

    if (!ctx) {
      return "⚠️ No analysis context available.";
    }

    // SAFE DEFAULTS
    const insights = ctx.insights || {};
    const score = ctx.score || {};
    const keyModules = ctx.keyModules || [];
    const techStack = ctx.techStack || [];

const isRepoQuestion =
  [
    "repo", "project", "code", "file", "auth", "api",
    "tech", "architecture", "improve", "issue",
    "performance", "flow", "system", "how", "explain"
  ].some(word => q.includes(word));

if (!isRepoQuestion) {
  return `## 🤖 Not Related to Repo

I’m designed to analyze this repository.

Try asking:
- How is authentication handled?
- What can be improved?
- Any issues in this project?
- Where is the backend logic?
`;
}

    // 🔐 AUTH
if (q.includes("auth") || q.includes("authentication") || q.includes("login")) {
  const hasAppRouter = ctx.architecture?.includes("App Router");

  const candidates = ctx.keyModules || [];

return `## 🔐 Authentication Placement

${buildReasoning(ctx)}

### 📍 Recommendation

${
  ctx.architecture?.includes("App Router")
    ? "- Use `/app/api/auth`\n- Protect routes using middleware.ts"
    : "- Use backend layer like `/lib/auth`"
}

### 💡 Final Take
Authentication should be handled at API level, not UI.
`;
}

    // 🚀 IMPROVEMENTS
    if (q.includes("improve")) {
      const suggestions = [];

      if (!insights.hasTests) suggestions.push("Add testing");
      if (!insights.hasDocker) suggestions.push("Add Docker");
      if (!insights.hasCI) suggestions.push("Add CI/CD");

      if (!suggestions.length) suggestions.push("Already well-structured");

      return `## 🚀 Improvements\n\n${suggestions.map((s) => `- ${s}`).join("\n")}`;
    }

    // ⚠️ ISSUES
    if (q.includes("issue") || q.includes("problem")) {
      const issues = [];

      if (!insights.hasTests) issues.push("No testing setup");
      if (!insights.hasCI) issues.push("No CI/CD");
      if (!insights.hasEnv) issues.push("Missing env config");

      if (!issues.length) issues.push("No major issues");

      return `## ⚠️ Issues\n\n${issues.map((i) => `- ${i}`).join("\n")}`;
    }

    // ⚙️ TECH
    if (q.includes("tech")) {
      return `## ⚙️ Tech Stack\n\n${techStack.map((t: string) => `- ${t}`).join("\n")}`;
    }

    // 🏗️ ARCH
    if (q.includes("architecture")) {
      return `## 🏗️ Architecture\n\n${ctx.architecture || "Unknown"}`;
    }

    // 📂 FILES
if (q.includes("where") || q.includes("file") || q.includes("location")) {
  const fileMap = ctx.fileMap || [];

  const matched = fileMap.filter((f: string) =>
    q.split(" ").some((word) => f.toLowerCase().includes(word))
  );

  return `## 📂 File Discovery

### 🔍 Matching Files:
${
  matched.length
    ? matched.slice(0, 8).map((f: string) => `- ${f}`).join("\n")
    : "- No exact match found"
}

### 💡 Tip
Try asking:
- Where is authentication?
- Where is API logic?
`;
}

    // ⚙️ COMPLEXITY
    if (q.includes("complexity")) {
      return `## ⚙️ Complexity\n\n${ctx.complexity || "Unknown"}`;
    }
if (q.includes("review") || q.includes("feedback") || q.includes("analyze deeply")) {
  const issues = [];
  const improvements = [];

  if (!ctx.insights?.hasTests) {
    issues.push("No testing setup — risky for production");
    improvements.push("Add unit/integration tests (Jest/Vitest)");
  }

  if (!ctx.insights?.hasCI) {
    issues.push("No CI/CD pipeline");
    improvements.push("Set up GitHub Actions for automation");
  }

  if (!ctx.insights?.hasEnv) {
    issues.push("Missing environment configuration");
    improvements.push("Add `.env.example` for clarity");
  }

  if (ctx.score?.structure < 70) {
    issues.push("Project structure can become hard to scale");
    improvements.push("Refactor into modular folders");
  }

  return `## 🧠 Senior Code Review

### 🔍 Key Observations
- Project Type: ${ctx.projectType}
- Architecture: ${ctx.architecture}
- Complexity: ${ctx.complexity}

---

### ⚠️ Issues
${issues.length ? issues.map((i) => `- ${i}`).join("\n") : "- No critical issues detected"}

---

### 🚀 Improvements
${improvements.length ? improvements.map((i) => `- ${i}`).join("\n") : "- Already well structured"}

---

### 💡 Senior Insight
This project is ${
    ctx.complexity === "High"
      ? "approaching production-grade but needs polishing"
      : "a solid foundation but needs improvements to scale"
  }.

Focus on:
- maintainability
- testing
- deployment pipeline
`;
}
if (q.includes("explain") || q.includes("code") || q.includes("flow")) {
  const files = ctx.filesContent || [];

  if (!files.length) {
    return "⚠️ No file content available.";
  }

  const selectedFiles = files.slice(0, Math.min(2, files.length));

  return `## 🧠 Multi-File Code Analysis

${buildReasoning(ctx)}

### 📂 Files Considered:
${selectedFiles.map((f: any) => `- ${f.path}`).join("\n")}

---

### 🔍 Code Snippets:
${selectedFiles
  .map(
    (f: any) => `
📄 ${f.path}
\`\`\`
${f.content.slice(0, 300)}
\`\`\`
`
  )
  .join("\n")}

---

### 🔗 How Things Connect

- These files likely represent different layers of the app  
- One handles ${
    selectedFiles[0]?.path.includes("api")
      ? "API/backend logic"
      : "UI or routing"
  }  
- Another contributes to ${
    selectedFiles[1]?.path.includes("lib")
      ? "core logic/services"
      : "application flow"
  }

---

### 💡 Senior Dev Insight

- Follow data flow: UI → API → logic → response  
- Keep logic separated from UI  
- Ensure modules are reusable  

👉 This project shows a ${
    ctx.architecture?.includes("App Router")
      ? "modern fullstack pattern"
      : "modular architecture"
  }`;
}
if (
  !q.includes("auth") && 
  (
    q.includes("database") ||
    q.includes("api") ||
    q.includes("backend")
  )
) {
  const fileMap = ctx.fileMap || [];

  const related = fileMap.filter((f: string) =>
    ["auth", "api", "db", "user"].some((k) =>
      f.toLowerCase().includes(k)
    )
  );

  return `## 🧠 Feature Insight

### 🔍 Related Files:
${
  related.length
    ? related.slice(0, 6).map((f: string) => `- ${f}`).join("\n")
    : "- No direct match found"
}

### 💡 Understanding
This feature is likely handled in API/backend layers.

### 🚀 Suggestion
Keep logic centralized and avoid duplication.
`;
}
if (q.includes("flow") || q.includes("how it works") || q.includes("system")) {
  const keyModules = ctx.keyModules || [];

  return `## 🔗 System Flow

${buildReasoning(ctx)}

### 📂 Key Modules:
${keyModules.slice(0, 6).map((f: string) => `- ${f}`).join("\n")}

---

### 🔄 Flow Explanation

1. User interacts with UI (pages/app)
2. Request goes to API/backend
3. Logic handled in services/lib
4. Data returned to frontend

---

### 💡 Senior Insight

- This follows ${
    ctx.architecture || "a modular architecture"
  }
- Clear separation of concerns is important
- Keep business logic out of UI

👉 Think in terms of **data flow, not files**
`;
}
   
// 🤖 FALLBACK (SMART + HUMAN)
return `## 🤖 Thought Process

${buildReasoning(ctx)}

### 💡 Interpretation
Your question is a bit broad.

Try asking:
- Where is authentication handled?
- What can be improved?
- Any issues in this repo?
`;
} catch (err) { console.error("ANSWER ERROR:", err); return "⚠️ Failed to process question"; } }


