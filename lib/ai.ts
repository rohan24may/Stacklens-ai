import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function analyzeRepository(repoData: any) {
  const prompt = `
You are a senior software architect.

Analyze the following GitHub repository data and explain:

1. Tech stack
2. Architecture overview
3. Key modules
4. Short summary

Repository Data:
${JSON.stringify(repoData, null, 2)}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You analyze software repositories.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  const output = response.choices[0].message.content;

  return output;
}