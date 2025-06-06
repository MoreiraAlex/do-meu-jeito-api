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


const createGame = async (req, res) => {
    try {
        const { theme, userId, isPublic, password } = req.body;

        const game = new Game({
        gameId: 0,
        theme,
        userId,
        isPublic,
        password,
        completed: false,
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
        const { theme, userId, isPublic } = req.body;

        const game = await Game.findByIdAndUpdate(id,{
            theme,
            userId,
            isPublic,
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
    const game = await Game.findByIdAndDelete(id);

    if (!game) {
      return res.status(404).json({ message: "Jogo não encontrado." });
    }

    res.status(200).json({ message: "Jogo removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover jogo", error });
  }
};


module.exports = { listGames, listGamesPagination, listGameById, createGame, updateGame, deleteGameById };