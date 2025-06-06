const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  game: String,
  seq: Number
});

module.exports = mongoose.model('Sequence', sequenceSchema);