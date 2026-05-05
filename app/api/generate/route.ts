import { NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt missing" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY missing" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

    const response =
      await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              `You are Codely AI.
Return JSON only.

Format:
{
 "title":"",
 "html":"",
 "css":"",
 "js":""
}

No markdown.
No explanation.`
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

    const raw =
      response.choices?.[0]?.message?.content || "{}";

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = {
        title: "Generated App",
        html: raw,
        css: "",
        js: "",
      };
    }

    await connectDB();

    const saved = await Project.create({
      prompt,
      title: parsed.title,
      html: parsed.html,
      css: parsed.css,
      js: parsed.js,
    });

    return NextResponse.json({
      success: true,
      projectId: saved._id,
      ...parsed,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error.message ||
          "Generation failed",
      },
      {
        status: 500,
      }
    );
  }
}
