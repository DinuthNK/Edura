import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log('Attempting to connect with URI:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on('connected', () => console.log('Database Connected Successfully'));
    mongoose.connection.on('error', (error) => console.error('MongoDB Connection Error:', error));
  } catch (error) {
    console.error('MongoDB Connection Error during setup:', error);
  }
};

export default connectDB;