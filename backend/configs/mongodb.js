import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/edura`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected to 'edura' database");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit the app if DB fails to connect
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB Disconnected");
  });
};

export default connectDB;
