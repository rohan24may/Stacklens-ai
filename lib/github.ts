import { Buffer } from "buffer";

const GITHUB_API = "https://api.github.com";

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};

function parseRepoUrl(repoUrl: string) {
  const parts = repoUrl.replace("https://github.com/", "").split("/");
  return {
    owner: parts[0],
    repo: parts[1],
  };
}

export async function getRepoData(repoUrl: string) {
  const { owner, repo } = parseRepoUrl(repoUrl);

  // 1️⃣ Repo metadata
  const repoRes = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
    headers,
  });
  const repoData = await repoRes.json();

  // 2️⃣ Languages
  const langRes = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/languages`,
    { headers }
  );
  const languages = await langRes.json();

  // 3️⃣ File tree
  const treeRes = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${repoData.default_branch}?recursive=1`,
    { headers }
  );
  const treeData = await treeRes.json();

  const files =
    treeData.tree
      ?.filter((item: any) => item.type === "blob")
      .map((item: any) => item.path) || [];

  // 4️⃣ package.json
  let packageJson: any = null;

  try {
    const pkgRes = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/package.json`,
      { headers }
    );

    if (pkgRes.ok) {
      const pkgData = await pkgRes.json();
      const decoded = Buffer.from(pkgData.content, "base64").toString("utf-8");
      packageJson = JSON.parse(decoded);
    }
  } catch {
    packageJson = null;
  }

  return {
    owner,
    repo,
    description: repoData.description,
    defaultBranch: repoData.default_branch,
    languages: Object.keys(languages),
    files,
    dependencies: packageJson?.dependencies || {},
    devDependencies: packageJson?.devDependencies || {},
  };
}