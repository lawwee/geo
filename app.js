// Import the MongoDB database configuration setting
require("./database.config");

// Import model
const Place = require("./place.model");

// Variable for stopping infinite execution of samplePlaces
let sampleDataInitialized = false;

// Array of sample data to be stored in database
const places = [
    {
      name: "Pizza Hut",
      placeType: "Restaurant",
      location: {
        city: "Lagos",
        coordinates: [3.3958, 6.4531]
      }
    },
    {
      name: "Lagoon Hospital",
      placeType: "Hospital",
      location: {
        city: "Lagos",
        coordinates: [3.4215, 6.4413]
      }
    },
    {
      name: "Bodyline Fitness",
      placeType: "Gym",
      location: {
        city: "Lagos",
        coordinates: [3.4156, 6.4326]
      }
    },
    {
      name: "University of Lagos",
      placeType: "School",
      location: {
        city: "Lagos",
        coordinates: [3.4064, 6.5196]
      }
    },
    {
      name: "Ikeja City Mall",
      placeType: "Mall",
      location: {
        city: "Lagos",
        coordinates: [3.3569, 6.6018]
      }
    }
  ];

// Function to stop infinite execution on sample places
const initializeSampleData = async () => {
    try {
        await Place.deleteMany();
        await Place.create(places);
        console.log('sample data initialized');
        sampleDataInitialized = true;
    } catch (error) {
        console.error('Error initializing sample data: ', error.message);
    }
}

if (!sampleDataInitialized) {
    initializeSampleData();
}

async function discover() {
    try {
        // Mongoose query for finding all places within 10000 metres of point
        const query = {
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [3.4, 6.5]
                    },
                    $maxDistance: 10000
                }
            }
        }

        const nearbyPlaces = await Place.find(query);
        console.log("Here are the places close to you: ", nearbyPlaces);
    } catch (error) {
        console.error("error discovering nearby places", error.message);
    }
}

async function rediscover() {
    try {
        // Mongoose query for finding all places within a 5 kilometer radius of point
        const query = {
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [3.4, 6.5],
                        5 / 6378.1
                    ]
                }
            }
        }

        const nearbyPlaces = await Place.find(query);
        console.log("Here are the places within a 5 kilometer radius: ", nearbyPlaces);
    } catch (error) {
        console.error("error discovering nearby places", error.message);
    }
}

discover()
rediscover()


// Use "npm start" to run the code