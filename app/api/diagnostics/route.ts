import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY?.trim()),
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY?.trim()),
    groqConfigured: Boolean(process.env.GROQ_API_KEY?.trim()),
  });
}
