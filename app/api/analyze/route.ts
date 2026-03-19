import { NextRequest, NextResponse } from "next/server";
import { getRepoData } from "@/lib/github";
import { analyzeRepository } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { repoUrl } = await req.json();

    const repoData = await getRepoData(repoUrl);
    const analysis = await analyzeRepository(repoData);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Something went wrong",
    });
  }
}