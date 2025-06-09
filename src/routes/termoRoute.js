const express = require("express");
const {requireAuth } = require("@clerk/express");
const { listGames, listGamesByUser, listGamesByVisibilty, listGameById, createGame, updateGame, deleteGameById, checkPasswordGame } = require("../controllers/termoController");

const router = express.Router();

router.get("/", listGames);
router.get("/page", listGamesByVisibilty);
router.get("/page/:userId", requireAuth(), listGamesByUser);
router.get("/:id", requireAuth(), listGameById);
router.post("/", requireAuth(), createGame);
router.put("/:id", requireAuth(), updateGame);
router.delete("/:id", requireAuth(), deleteGameById);
router.post("/check-password", checkPasswordGame);

module.exports = router;