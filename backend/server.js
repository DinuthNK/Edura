import express from 'express'
import cors from "cors";
import 'dotenv/config'
import connectDB from "./configs/mongodb.js";



//initalize express
const app = express()

// Connect to MongoDB
await connectDB()

// Middlewares
app.use(cors())

// Routes
app.get('/', (req, res) => res.send("API Working"));


//port
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`server running on port ${PORT}`);
});
