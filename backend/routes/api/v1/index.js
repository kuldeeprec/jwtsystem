const express = require("express");

const router = express.Router();
// const homeController = require("../../../controllers/api/v1/homecontroller");
const homeController = require("../../../controllers/api/v1/Blackdata");

// router.use("/posts", require("./posts"));
router.get("/", homeController.region);
router.use("/user", require("./user"));

module.exports = router;
