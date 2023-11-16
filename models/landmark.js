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
        type: {
            type: String,
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
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
});

landmarkSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Landmark", landmarkSchema);