const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    placeType: {
        type: String,
        enum: ["Restaurant", "Hospital", "Gym", "School", "Mall"],
        required: true
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        city: {
            type: String, 
            required: true
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
});

// Create the index and tie it to the location field
placeSchema.index({ location: '2dsphere' });

// Export model schema
module.exports = mongoose.model("Place", placeSchema);