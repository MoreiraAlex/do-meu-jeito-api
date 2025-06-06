const express = require("express");
const { listGames } = require("../controllers/termoController");

const router = express.Router();

router.get("/", listGames);
// router.get("/:id", listGameById);
// router.post("/",createGame);
// router.put("/:id",updateGame);
// router.delete("/:id", deleteGameById);

module.exports = router;