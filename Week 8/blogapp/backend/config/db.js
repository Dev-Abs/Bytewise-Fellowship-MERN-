const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = async () => {
    try{
        // const conn = await mongoose.connect(process.env.MONGO_URI);
        const conn = await mongoose.connect('mongodb+srv://abdullahubaid257foru:eCXXtqwatH9OrwU8@blogapp.5t3ffwy.mongodb.net/blogapp?retryWrites=true&w=majority&appName=Blogapp');
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        console.log('Mongo uri:', process.env.MONGO_URI);
        process.exit(1);
    }
}

module.exports = connectDB;