import express from 'express'
import cors from "cors";
import 'dotenv/config'
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";


//initalize express
const app = express();

// Connect to MongoDB
await connectDB()

// Middlewares
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("API Working"));
app.post('/clerk' , express.json(), clerkWebhooks)
app.post("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhooks);
app.use(express.json());
//port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
