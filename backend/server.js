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
app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);



// ✅ Other routes
app.get("/", (req, res) => res.send("API Working"));


// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
