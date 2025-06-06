const express = require("express");
const { listGames, listGamesByUser, listGamesByVisibilty, listGameById, createGame, updateGame, deleteGameById } = require("../controllers/termoController");

const router = express.Router();

router.get("/", listGames);
router.get("/page", listGamesByVisibilty);
router.get("/page/:userId", listGamesByUser);
router.get("/:id", listGameById);
router.post("/", createGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGameById);

module.exports = router;