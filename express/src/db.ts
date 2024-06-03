import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export async function connectToDatabase() {
  const opts = {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Keep tryings for 45s
    family: 4, // Use IPv4, skip trying IPv6
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  };
  try {
    await mongoose.connect('mongodb+srv://admin:TPbdbGHrTzte1QM2@cluster0.flxw2nh.mongodb.net/', opts);
    let db =  mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("MongoDB connected!");
    });
    console.log(db.collections)
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
