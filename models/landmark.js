const mongoose = require("mongoose");

const landmarkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    landmarkType: {
        type: String,
        enum: ["Restaurant", "Hospital", "Gym", "School", "Mall"],
        required: true
    },
    location: {
        // The type field signifies the type of GeoJSON object.
        type: {
            type: String,
            // The "Point" type indicates that it the object represents a point with longitude[long] and latitude[lat] 
            default: "Point"
        },
        city: {
            type: String, 
            required: true
        },
        state: {
            type: String,
            required: true
        },
        // The coordinates is an array that stores the long and lat of each point
        coordinates: {
            type: [Number],
            // Indicate what GeoJSON index type it is. 2dsphere mean 2-dimensional sphere
            index: '2dsphere'
        }
    }
});

// Create the index and tie it to the location field
landmarkSchema.index({ location: '2dsphere' });

// Export model schema
module.exports = mongoose.model("Landmark", landmarkSchema);