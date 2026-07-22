const Pokemon = require("../models/Pokemon");
const Trainer = require("../models/Trainer");

const getAllPokemon = async (req, res) => {
  try {
    let queryObj = { ...req.query };

    const excludedFields = ["select", "sort", "page", "limit"];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Pokemon.find(JSON.parse(queryStr));

    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");

      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 2;

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    query = query.populate("trainer");

    const pokemon = await query;

    console.log("====================");
    console.log("Query Params:", req.query);
    console.log("Filtered Object", JSON.parse(queryStr));
    console.log("====================");
    res.status(200).json({
      success: true,
      data: pokemon,
      count: pokemon.length,
      page: page,
      method: req.method,
      message: "Pokemon GET route requested",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Something failed, please try again.",
    });
  }
};

const createPokemon = async (req, res) => {
  try {
    console.log(req.body);
    const pokemon = await Pokemon.create(req.body);

    await Trainer.findByIdAndUpdate(req.body.trainer, { $push: { pokemon: pokemon._id } }, { new: true });

    res.status(201).json({
      data: pokemon,
      success: true,
      method: req.method,
      message: "Pokemon route POST request made and data pushed.",
    });
  } catch (error) {
    console.log(error);

    if (error === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Creation failed, please verify information and try again.",
      });
    }

    res.status(
      (500).json({
        success: false,
        message: "An internal error occured",
        error: error,
      }),
    );
  }
};

const getAllPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonID = await Pokemon.findById(id).populate("trainer");
    res.status(200).json({
      id,
      data: pokemonID,
      success: true,
      method: req.method,
      message: "Pokemon route request made with ID.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Could not find this Pokemon's ID. Veryify information and try again.",
      method: req.method,
    });
  }
};

const updatePokemon = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemonUpdate = await Pokemon.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      id,
      data: pokemonUpdate,
      success: true,
      method: req.method,
      message: "Pokemon route put request made with ID. Pokemon updated",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Could not update this Pokemon. Try again.",
    });
  }
};

const deletePokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const deletePokemon = await Pokemon.findByIdAndDelete(id);
    res.status(200).json({
      id,
      data: deletePokemon,
      success: true,
      method: req.method,
      message: "Pokemon route delete request made with ID.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Could not delete the Pokemon. Please try again.",
    });
  }
};

module.exports = { getAllPokemon, createPokemon, getAllPokemonById, updatePokemon, deletePokemon };
