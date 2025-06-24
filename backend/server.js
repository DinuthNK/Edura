import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDB from './configs/mongodb.js'
import clerkWebhookRoutes from './routes/clerkWebhook.js';

// initialize express
const app = express()

//connect to db
await connectDB()

//middlewares
app.use(cors())

//route
app.use('/api/clerk', clerkWebhookRoutes);
//port
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})