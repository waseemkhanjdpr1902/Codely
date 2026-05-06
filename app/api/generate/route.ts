import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await auth.currentUser;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code, language } = await request.json();
    
    // Step 3 will add actual code execution here
    const result = await executeCode(code, language);
    
    return NextResponse.json({ output: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Execution failed' }, { status: 500 });
  }
}

async function executeCode(code: string, language: string) {
  // Placeholder - Step 3 will replace this
  return "Execution pending...";
}
