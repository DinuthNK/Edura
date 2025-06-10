import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/edura`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => console.log('Database Connected'));
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;