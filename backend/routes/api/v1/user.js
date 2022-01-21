const express = require("express");

const router = express.Router();
const usersApi = require("../../../controllers/api/v1/user");

router.post("/create-session", usersApi.createSession);
router.post("/create", usersApi.create);
// router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);
module.exports = router;
