import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import getRawBody from 'raw-body';
import clerkRoutes from './routes/clerkRoutes.js';
import connectDB from './configs/mongodb.js';

dotenv.config();

const app = express();

// Middleware for Clerk webhook (raw body)
app.use('/api/clerkWebhook', async (req, res, next) => {
  try {
    req.rawBody = await getRawBody(req);
    next();
  } catch (err) {
    console.error("❌ Failed to read raw body:", err.message);
    res.status(400).send("Invalid request body");
  }
});

// Standard middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('✅ API is working!');
});

// Routes
app.use('/api', clerkRoutes);

// Connect and start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

startServer();
