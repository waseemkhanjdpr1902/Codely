import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your Secret Key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    // 1. Parse the incoming request body
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    // 2. Request code generation from OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are Codely AI. Output ONLY code. No explanations. No markdown blocks. Return a complete, single-file HTML document including CSS and JS." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const generatedHtml = aiResponse.choices[0].message.content;

    // 3. Return the data in a clear JSON format
    return NextResponse.json({ output: generatedHtml });

  } catch (error) {
    console.error("OpenAI API Failure:", error);
    
    // Check for specific OpenAI errors (like insufficient credits)
    const errorMessage = error.message.includes("insufficient_quota") 
      ? "OpenAI API Key has no credits left. Please add $5 to your OpenAI billing."
      : "Internal Server Error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
