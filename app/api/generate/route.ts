import { NextRequest, NextResponse } from 'next/server';

// Safe Firebase config - only initialize when needed
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-key-for-build",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... add other config keys if you have them
};

// Only initialize if API key is valid (skip during build if missing)
let app;
if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.log("⚠️ Firebase API key missing - skipping initialization during build");
  // Don't throw error during build
} 
// TEMPORARY FIX: Skip during build if no Firebase keys
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  export const dynamic = 'force-dynamic';
  export async function GET() {
    return new Response("API disabled during build", { status: 200 });
  }
  export async function POST() {
    return new Response("API disabled during build", { status: 200 });
  }
}
// Rest of your existing code...
export async function POST(request: NextRequest) {
  try {
    // Your existing logic here
    return NextResponse.json({ message: "API working" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
