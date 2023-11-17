// Import the express package
const express = require("express");

// Import the MongoDB database configuration setting
const connectDB = require("./config/database");

// Create an instance of the express application
const app = express();

// Import route and model
const landmark_routes = require("./routes/landmark");
const Landmark = require("./models/landmark");

const port = 5000;

// Initialize Dataabse configuration
connectDB();

// Variable for stopping infinite execution of samplePlaces
let sampleDataInitialized = false;

// Array of sample data to be stored in database
const samplePlaces = [
    {
        name: "Item 7",
        landmarkType: "Restaurant",
        location: {
            type: "Point",
            coordinates: [8.475390409191485, 4.595045733485099],
            city: "Ilorin",
            state: "Kwara"
        }
    },
    {
        name: "Central Clinic",
        landmarkType: "Hospital",
        location: {
            type: "Point",
            coordinates: [8.472370261847576, 4.592029040612362],
            city: "Ikeja",
            state: "Lagos"
        }
    },
    {
        name: "Buffer Gym",
        landmarkType: "Gym",
        location: {
            type: "Point",
            coordinates: [8.473716595521099, 4.595597567547186],
            city: "Ibadan",
            state: "Oyo"
        }
    }
]

// Function to stop infinite execution on sample places
const initializeSampleData = async () => {
    try {
        await Landmark.deleteMany();
        await Landmark.create(samplePlaces);
        console.log('sample data initialized');
        sampleDataInitialized = true;
    } catch (error) {
        console.error('Error initializing sample data: ', error.message);
    }
}

if (!sampleDataInitialized) {
    initializeSampleData();
}

// Mount the middleware
app.use("/app", landmark_routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is now running on port ${port}`)
})