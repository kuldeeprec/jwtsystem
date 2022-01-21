const express = require("express");

const router = express.Router();
const dataApi = require("../../../controllers/api/v1/data");
router.get("/", dataApi.index);
router.post("/create", dataApi.create);

// router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);
module.exports = router;
