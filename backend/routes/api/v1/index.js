const express = require("express");

const router = express.Router();
// const homeController = require("../../../controllers/api/v1/homecontroller");
const homeController = require("../../../controllers/api/v1/data");

router.use("/data", require("./data"));
router.get("/", homeController.index);
router.use("/user", require("./user"));

module.exports = router;
