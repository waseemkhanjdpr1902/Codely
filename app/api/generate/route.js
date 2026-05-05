import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "No prompt provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is missing" },
        { status: 500 }
      );
    }

    // Initialize INSIDE the handler
    const openai = new OpenAI({
      apiKey,
    });

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are Codely AI. Output ONLY code. No explanations. No markdown blocks. Return a complete, single-file HTML document including CSS and JS.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const generatedHtml =
      aiResponse.choices?.[0]?.message?.content || "";

    return NextResponse.json({
      output: generatedHtml,
    });
  } catch (error: any) {
    console.error("OpenAI API Failure:", error);

    const msg =
      error?.message?.includes("insufficient_quota")
        ? "OpenAI API Key has no credits left."
        : error?.message || "Internal Server Error";

    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}
