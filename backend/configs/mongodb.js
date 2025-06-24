import mongoose from "mongoose";


// connect tothe mongoDB db
const connectDB = async () => {
    mongoose.connection.on('Connected',()=> console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/edura`)
}

export default connectDB;