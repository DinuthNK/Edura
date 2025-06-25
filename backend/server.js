import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import 'dotenv/config'; 

// Initialize express
const app = express();

// Connect to MongoDB
await connectDB(); 

// Middlewares
app.use(cors());

// Routes
app.get('/', (req, res) => res.send("API Working"));

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})
