const Game = require("../models/termo.model");
const bcrypt = require('bcrypt');


const listGames = async (req, res) => {
    try {
        const games = await Game.find().sort({ updatedAt: -1 })

        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar jogos", error });
    }
};


const listGameById = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findOne( { gameId: id } );

        if (!game) {
           return res.status(404).json({ message: "Jogo não encontrado." });
        }

        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar jogo", error });
    }
};


const listGamesByVisibilty = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        const { isPublic } = req.query;

        const games = await Game.find({ isPublic }).skip(skip).limit(limit).sort({ updatedAt: -1 });
        const total = await Game.countDocuments({ isPublic });

        if (!games) {
            return res.status(404).json({ message: "Jogos não encontrados." });
        }

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

const listGamesByUser = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        const { userId } = req.params;

        const games = await Game.find({ userId }).skip(skip).limit(limit).sort({ updatedAt: -1 });
        const total = await Game.countDocuments({ userId });

        if (!games) {
            return res.status(404).json({ message: "Jogos não encontrados." });
        }

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


const createGame = async (req, res) => {
    try {
        const { theme, userId, isPublic, password, word, attempts } = req.body;

        const game = new Game({
        gameId: 0,
        theme,
        userId,
        isPublic,
        password,
        completed: false,
        word,
        attempts,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        });

        await game.save();

        res.status(201).json({ message: "Jogo adicionado com sucesso!", game });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar a jogo", error });
  }
};


const updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { theme, userId, isPublic, word, attempts } = req.body;

        const game = await Game.findOneAndUpdate({ gameId: id },{
            theme,
            userId,
            isPublic,
            word,
            attempts,
            updatedAt: new Date().toISOString(),
            },
            { new: true } // Retornar a tarefa atualizada
        );

        if (!game) {
            return res.status(404).json({ message: "Jogo não encontrado." });
        }

        res.status(200).json({ message: "Jogo atualizado com sucesso!", game });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar jogo", error });
    }
};


const deleteGameById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const game = await Game.findOneAndDelete({ gameId: id });

        if (!game) {
            return res.status(404).json({ message: "Jogo não encontrado." });
        }

        res.status(200).json({ message: "Jogo removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover jogo", error });
    }
};

const checkPasswordGame = async (req, res) => {
    const { gameId, password } = req.body;

    const game = await Game.findOne({ gameId });
    if (!game || !game.password) return res.status(404).json({ error: 'Jogo não encontrado' });

    const match = await bcrypt.compare(password, game.password);
    if (!match) return res.status(401).json({ error: 'Senha incorreta' });

    res.status(200).json({ success: true });
};


module.exports = { listGames, listGameById, listGamesByUser, listGamesByVisibilty, createGame, updateGame, deleteGameById, checkPasswordGame };