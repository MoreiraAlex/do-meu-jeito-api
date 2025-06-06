const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { getNextSequence } = require("../controllers/sequenceController")

const gameSchema = new mongoose.Schema({
  gameId: {type: String,required: true,unique: true,},
  theme: {type: String,required: true,},
  userId: {type: String,required: true,},
  isPublic: {type: Boolean,required: true,},
  password: {type: String,default: null,},
  completed: {type: Boolean,default: false,},
}, { timestamps: true });


gameSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.gameId = await getNextSequence('termo');
  }

  if (!this.isModified('password') || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Termo', gameSchema);