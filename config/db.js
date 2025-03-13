const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
