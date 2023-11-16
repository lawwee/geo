const express = require("express");
const connectDB = require("./config/database");

const app = express();

const port = 5000;

connectDB();

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`)
})