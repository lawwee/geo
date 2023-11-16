const express = require("express");
const connectDB = require("./config/database");

const app = express();

const landmark_routes = require("./routes/landmark");

const port = 5000;

connectDB();

app.use("/app", landmark_routes);

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`)
})