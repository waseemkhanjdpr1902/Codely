import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt missing" },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response =
      await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              `Return JSON:
{
"title":"",
"html":"",
"css":"",
"js":""
}`
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const raw =
      response.choices?.[0]?.message?.content || "{}";

    const parsed = JSON.parse(raw);

    return NextResponse.json({
      success: true,
      ...parsed,
    });

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
