import { NextRequest, NextResponse } from "next/server";
import { getRepoData } from "@/lib/github";
import { analyzeRepository } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { repoUrl } = await req.json();

    const repoData = await getRepoData(repoUrl);
    console.log("REPO DATA FILES:", repoData.files?.slice(0, 20));
    const analysis = await analyzeRepository(repoData);

    // 🔥 Extract owner & repo from URL
const parts = repoUrl.replace("https://github.com/", "").split("/");
const owner = parts[0];
const repo = parts[1];

    // 🔥 Pick important files
const importantFiles = (repoData.files || [])
  .filter((f: string) =>
    (
  f.endsWith(".ts") ||
  f.endsWith(".tsx") ||
  f.endsWith(".js") ||
  f.endsWith(".py") ||
  f.endsWith(".java") ||
  f.endsWith(".cpp")
) &&
    !f.includes("node_modules") &&
    !f.includes(".next")
  )
  .slice(0, 5);
  console.log("IMPORTANT FILES:", importantFiles);

    const filesContent: any[] = [];

    // 🔥 SINGLE CLEAN LOOP
    const branch = repoData.default_branch || "main";

for (const file of importantFiles) {
  try {
    console.log("USING BRANCH:", branch);
let res = await fetch(
  `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`
);

if (!res.ok) {
  res = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/main/${file}`
  );
}

if (!res.ok) {
  res = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/master/${file}`
  );
}

console.log("FETCH:", file, res.status);

if (!res.ok) continue;

    const text = await res.text();

    filesContent.push({
      path: file,
      content: text.slice(0, 2000),
    });
  } catch (err) {
    console.error("FILE FETCH ERROR:", err);
  }
}
    console.log("FILES CONTENT:", filesContent);

    return NextResponse.json({
      success: true,
      data: {
        ...analysis,
        filesContent,
      },
    });

  } catch (error) {
    console.error("ANALYZE ERROR:", error);

    return NextResponse.json({
      success: false,
      error: "Something went wrong",
    });
  }
}