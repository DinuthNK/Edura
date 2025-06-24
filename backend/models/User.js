import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk ID
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    imageUrl: {
      type: String,
      required: true,
      match: [/^https?:\/\//, 'Must be a valid URL'],
    },
    enrolledCourse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
