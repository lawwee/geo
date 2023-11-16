const express = require("express");
const connectDB = require("./config/database");

const app = express();

const landmark_routes = require("./routes/landmark");
const Landmark = require("./models/landmark");

const port = 5000;

connectDB();

let sampleDataInitialized = false;

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

app.use("/app", landmark_routes);

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`)
})