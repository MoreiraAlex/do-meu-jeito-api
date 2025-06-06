const express = require("express");
const { listGames, listGamesPagination, listGameById, createGame, updateGame } = require("../controllers/termoController");

const router = express.Router();

router.get("/", listGames);
router.get("/pagination", listGamesPagination);
router.get("/:id", listGameById);
router.post("/", createGame);
router.put("/:id", updateGame);
// router.delete("/:id", deleteGameById);

module.exports = router;