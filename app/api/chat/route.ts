import { NextRequest, NextResponse } from "next/server";
import { answerQuestion } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const question = body.question || "";
    const context = body.context || {};
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const history = messages.slice(-5);

    const answer = answerQuestion(question, context, history);

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("API ERROR:", err);

    return NextResponse.json({
      answer: "⚠️ Something went wrong. Try again.",
    });
  }
}