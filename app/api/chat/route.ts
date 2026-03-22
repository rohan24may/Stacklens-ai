import { NextRequest, NextResponse } from "next/server";
import { answerQuestion } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { question, context, messages } = await req.json();

  // take last few messages for memory
  const history = messages?.slice(-5) || [];

  const answer = answerQuestion(question, context, history);

  return NextResponse.json({ answer });
}