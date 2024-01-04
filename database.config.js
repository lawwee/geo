// Import mongoose
const mongoose = require("mongoose");

// Define the connection string
// The name geo here is going to be the name of my database,
// you can change it into something else.
const connectionString = "mongodb://localhost:27017/geo";

// Connect to the database
mongoose.connect(connectionString);

// Initialize the db
const db = mongoose.connection

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to the database"));