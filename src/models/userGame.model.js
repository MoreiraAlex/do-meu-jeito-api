const mongoose = require('mongoose');

const userGamesSchema = new mongoose.Schema({
    userId: {type: String, required: true,},
    gameId: {type: String,required: true,},
    game: {type: String,},
    completed: {type: Boolean,},
    attempts: {type: [String]},
}, { timestamps: true });


module.exports = mongoose.model('UserGames', userGamesSchema);