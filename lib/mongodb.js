import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGO_URI);
}
