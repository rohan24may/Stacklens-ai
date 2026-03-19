import { NextRequest, NextResponse } from "next/server";
import { answerQuestion } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { question, context } = await req.json();

  const answer = answerQuestion(question, context);

  return NextResponse.json({ answer });
}