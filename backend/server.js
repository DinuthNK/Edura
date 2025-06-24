import express from 'express';
import cors from "cors";
import 'dotenv/config';
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// ✅ Connect to MongoDB
await connectDB();

// ✅ CORS Middleware
app.use(cors());

// ✅ Webhook must come BEFORE express.json()
app.post("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

// ✅ Standard middleware (used for all other routes)
app.use(express.json());

// ✅ Other routes
app.get("/", (req, res) => res.send("API Working"));

// ✅ Optional test route to confirm server is live
app.get("/ping", (req, res) => res.json({ pong: true }));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
