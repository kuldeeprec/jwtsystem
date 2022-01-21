const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homecontroller");
router.get("/", homeController.home);
router.use("/api", require("./api"));
module.exports = router;
