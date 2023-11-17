const mongoose = require("mongoose");

// Function to connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/geo`)
        console.log('MongoDB connected');
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
        process.exit(1);
    }
}

// Export function
module.exports = connectDB;