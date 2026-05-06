// At the top of the file
// Temporarily disable Firebase for build
if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.log("Firebase config missing - skipping initialization");
  // You can return a dummy response or throw a clear error
}
import { db } from "@/lib/firebase"; // Your firebase config
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      name: body.name,
      code: body.code,
      userId: body.userId,
      createdAt: new Date()
    });
    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
