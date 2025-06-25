import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import 'dotenv/config'; // This loads environment variables

// Initialize express
const app = express();

// Connect to MongoDB
await connectDB(); // Note: top-level await requires Node.js v14+ and "type": "module" in package.json

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API Working"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
