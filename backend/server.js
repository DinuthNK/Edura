import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import 'dotenv/config'; 
import clerkRoutes from './routes/clerkRoutes.js';

// Initialize express
const app = express();

// Connect to MongoDB
await connectDB(); 

// Middlewares
app.use(cors());
app.use(express.json())


// Routes
app.get('/', (req, res) => res.send("API Working"));
app.use('/clerk', clerkRoutes)

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})
