const UserGame = require("../models/userGame.model");

const updateUserGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;
        const attempts = req.body?.attempts;
        const completed = req.body?.completed;

        const game = await UserGame.findOneAndUpdate({ gameId: id, userId },{
            attempts,
            completed: completed || false,
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



module.exports = { updateUserGame };