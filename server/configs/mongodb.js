import mongoose from "mongoose";


// connect tothe mongoDB db

const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=> console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/cluster0`)
}

export default connectDB