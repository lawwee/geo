const app = require("express");

// Create an instance of Router
const router = app.Router();

// Import landmark controller
const landmarkController = require("../controllers/landmark");

// API route for finding all nearby landmarks
router.post("/landmark", landmarkController.discover);

// Export router
module.exports = router;