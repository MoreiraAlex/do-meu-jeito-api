
const listGames = async (req, res) => {
  try {
    const games = [
        {
            id: 1,
            themme: 'djfkd'
        },
        {
            id: 2,
            themme: 'sdsdsddjfkd'
        },
    ]

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar jogos", error });
  }
};


module.exports = { listGames };