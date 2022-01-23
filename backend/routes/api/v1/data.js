const express = require("express");

const router = express.Router();
const passport = require("passport");
const dataApi = require("../../../controllers/api/v1/data");
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  dataApi.index
);
router.post("/create", dataApi.create);
module.exports = router;
