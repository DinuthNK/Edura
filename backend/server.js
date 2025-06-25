import express from 'express';
import cors from 'cors';
import connectDB from '../configs/mongodb.js';
import 'dotenv/config'; 
import clerkRoutes from '../routes/clerkRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API Working"));
app.use('/api', clerkRoutes);

// Start the server after DB connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
};

startServer();
