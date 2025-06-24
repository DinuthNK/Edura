import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("✅ Database Connected"));
  mongoose.connection.on("error", (err) => console.error("❌ MongoDB connection error:", err));

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
