import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export async function connectToDatabase() {
  const opts = {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Keep tryings for 45s
    family: 4, // Use IPv4, skip trying IPv6
  };
  try {
    await mongoose.connect(process.env.MONGO_URI!, opts);
    let db =  mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("MongoDB connected!");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
