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
