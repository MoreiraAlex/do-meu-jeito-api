const Game = require("../models/termo.model");

const listGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar jogos", error });
    }
};


const listGamesPagination = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    try {
        const games = await Game.find().skip(skip).limit(limit);
        const total = await Game.countDocuments();

        res.status(200).json({
            data: games,
            total,
            limit,
            skip
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar jogos", error });
    }
};


const listGameById = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findById(id);

        if (!game) {
           return res.status(404).json({ message: "Jogo não encontrado." });
        }

        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar jogo", error });
    }
};

module.exports = { listGames, listGamesPagination, listGameById };