const Sequence = require("../models/sequence.model")

async function getNextSequence(game) {
  const sequence = await Sequence.findOneAndUpdate(
    { game },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequence.seq;
}

module.exports = { getNextSequence };