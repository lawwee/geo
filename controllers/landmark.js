// Import model schema
const Landmark = require("../models/landmark");

// Function to allow discovery of landmarks around them+
exports.discover = async (req, res) => {
    try {
        // Extract the long and lat from the query
        const { long, lat } = req.query;
        
        // Ensure both values are present
        if (!long || !lat) {
            return res.status(400).json({
                message: 'Longitude and Latitude are required parameters'
            })
        }

        // Mongoose query for finding all landmarks within 10000 metres of point
        const query = {
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(long), parseFloat(lat)]
                    },
                    $maxDistance: 10000
                }
            }
        }

        const nearbyPlaces = await Landmark.find(query);

        // Return json object of message and result of query
        res.json({
            message: "Retreieved successfully",
            nearbyPlaces
        })
    } catch (error) {
        console.error("error discovering nearby places", error.message);
        res.status(500).json({
            error: "Internal Server error"
        })
    }
}

