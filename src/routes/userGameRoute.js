const express = require("express");
const {requireAuth } = require("@clerk/express");
const { updateUserGame } = require("../controllers/userGameController");

const router = express.Router();
router.put("/:id", requireAuth(), updateUserGame);

module.exports = router;