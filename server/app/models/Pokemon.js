const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema(
  {
    nickName: {
      type: String,
      trim: true,
      maxLength: [50, "No Pokemon's nickname is over 50 characters"],
    },
    species: {
      type: String,
      trim: true,
      maxLength: [50, "No species name is over 50 characters."],
      required: true,
    },
    type: {
      type: String,
      required: [true, "Every Pokemon has a typing!"],
      trim: true,
    },
    level: {
      type: Number,
      required: [true, "Every Pokemon has a level!"],
      min: 1,
      max: 100,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pokemon", pokemonSchema);
