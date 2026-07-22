const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the Trainer's name"],
      unique: true,
      trim: true,
      maxLength: [50, "Name cannot be more than 50 characters"],
    },
    age: {
      type: Number,
      required: true,
    },
    badges: {
      type: Number,
      required: [true, "You either do or do not have badges"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxLength: [500, "Decription cannot be more than 500 characters"],
    },
    pokemon: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pokemon",
      },
    ],
    totalPokemon: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Trainer", trainerSchema);
