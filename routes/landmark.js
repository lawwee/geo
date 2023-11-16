const app = require("express");
const router = app.Router();

const landmarkController = require("../controllers/landmark");

router.post("/landmark", landmarkController.discover);

module.exports = router;