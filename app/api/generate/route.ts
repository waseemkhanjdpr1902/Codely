// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering - prevents static generation
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Lazy load Firebase only when needed (never during build)
let auth: any = null;
let db: any = null;

async function getFirebase() {
  if (typeof window !== 'undefined') return null; // Never on client
  
  if (!auth) {
    try {
      // Dynamic import - only runs when function is called, not during build
      const { auth: firebaseAuth, db: firebaseDb } = await import('@/lib/firebase');
      auth = firebaseAuth;
      db = firebaseDb;
    } catch (error) {
      console.log('Firebase not available during build');
    }
  }
  return { auth, db };
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'API is working'
  });
}

// Main execution endpoint
export async function POST(request: NextRequest) {
  try {
    const { code, language = 'javascript' } = await request.json();
    
    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }
    
    // Execute code using Piston API (no Firebase needed)
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: language === 'python' ? 'python' : 'javascript',
        version: '*',
        files: [{ content: code }],
        stdin: ''
      })
    });
    
    const data = await response.json();
    const output = data.run?.output || data.message || 'No output';
    
    // Optional: Save to Firebase if authenticated (will be skipped during build)
    try {
      const { auth: fbAuth } = await getFirebase();
      if (fbAuth?.currentUser) {
        // User is logged in, save their code
        // This won't run during build because no user exists
      }
    } catch (e) {
      // Silently fail - Firebase might not be available
    }
    
    return NextResponse.json({ output, success: true });
    
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Execution failed',
      output: `Error: ${error.message}`
    }, { status: 500 });
  }
}
