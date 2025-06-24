import express from 'express';
import cors from "cors";
import 'dotenv/config';
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// Connect to MongoDB
await connectDB();

// Middlewares
app.use(cors());

// Webhook: use express.raw() only for this route
app.post("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

// Use express.json() for all other routes
app.use(express.json());

// Test routes
app.get("/", (req, res) => res.send("API is working"));
app.get("/ping", (req, res) => res.json({ pong: true }));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
