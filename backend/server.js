import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// Connect to MongoDB
await connectDB();

// Allow CORS
app.use(cors());

// Clerk webhook route - use express.raw() to get raw buffer
app.post(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// All other routes use express.json()
app.use(express.json());

app.get("/", (req, res) => res.send("✅ API is working"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
